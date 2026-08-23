"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Clock, CheckCircle2, Wrench, AlertCircle, Phone, MessageSquare } from "lucide-react";

const REPAIR_STAGES = [
  { id: "checked_in", label: "Checked In", desc: "Vehicle arrived at workshop" },
  { id: "inspection", label: "Inspection", desc: "Technician diagnostic in progress" },
  { id: "estimate_pending", label: "Estimate Ready", desc: "Parts & labor appraisal calculated" },
  { id: "approved", label: "Work Authorized", desc: "Customer approved estimate" },
  { id: "in_progress", label: "In Repair", desc: "Active mechanical or body repair" },
  { id: "quality_control", label: "Quality Check", desc: "Road test & inspection verification" },
  { id: "ready_for_pickup", label: "Ready for Pickup", desc: "Vehicle cleaned & ready at workshop" },
  { id: "completed", label: "Completed", desc: "Job closed & keys delivered" }
];

function TrackRepairContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("code") || "";
  const [queryCode, setQueryCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [workOrders, setWorkOrders] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [approving, setApproving] = useState(false);
  const [approvalMessage, setApprovalMessage] = useState("");

  const handleSearch = useCallback(async (codeToSearch) => {
    const term = codeToSearch || queryCode;
    if (!term.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setWorkOrders([]);
    setApprovalMessage("");

    try {
      const isPhone = /^[0-9\-\+\(\)\s]{7,}$/.test(term.trim());
      const param = isPhone ? `phone=${encodeURIComponent(term.trim())}` : `code=${encodeURIComponent(term.trim())}`;
      const res = await fetch(`/api/service/track?${param}`);
      const data = await res.json();

      if (data.success && data.workOrders?.length > 0) {
        setWorkOrders(data.workOrders);
      } else {
        setErrorMsg(data.error || "No active work order found. Please check your tracking number or phone number.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Error communicating with server. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [queryCode]);

  useEffect(() => {
    if (initialCode) {
      handleSearch(initialCode);
    }
  }, [initialCode, handleSearch]);

  const handleEstimateAction = async (trackingCode, action) => {
    setApproving(true);
    try {
      const res = await fetch("/api/service/approve-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingCode, action })
      });
      const data = await res.json();
      if (data.success) {
        setApprovalMessage(data.message);
        handleSearch(trackingCode); // Refresh status
      } else {
        alert(data.error || "Failed to update estimate approval.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    } finally {
      setApproving(false);
    }
  };

  const getStageIndex = (status) => {
    const idx = REPAIR_STAGES.findIndex(s => s.id === status);
    return idx !== -1 ? idx : 1;
  };

  return (
    <div className="space-y-12">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="p-3 bg-zinc-950 rounded-3xl border border-zinc-800 shadow-2xl flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-3.5 text-zinc-500" />
            <input
              type="text"
              value={queryCode}
              onChange={(e) => setQueryCode(e.target.value)}
              placeholder="Enter Tracking Code (e.g. TRK-8F92A) or Phone Number"
              className="w-full pl-11 pr-4 py-3 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shrink-0 cursor-pointer"
          >
            {loading ? "Searching..." : "Track Status"}
          </button>
        </form>
      </div>

      {errorMsg && (
        <div className="max-w-2xl mx-auto p-5 bg-zinc-100 border border-zinc-300 rounded-2xl text-xs text-zinc-900 font-bold flex items-center gap-3">
          <AlertCircle size={18} className="shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {approvalMessage && (
        <div className="max-w-2xl mx-auto p-5 bg-zinc-900 border border-zinc-700 rounded-2xl text-xs text-white font-bold flex items-center gap-3">
          <CheckCircle2 size={18} className="shrink-0 text-white" />
          <span>{approvalMessage}</span>
        </div>
      )}

      {/* Results View */}
      {workOrders.length > 0 && (
        <div className="space-y-8 max-w-4xl mx-auto">
          {workOrders.map((wo) => {
            const currentStageIdx = getStageIndex(wo.status);
            const isCompleted = wo.status === "ready_for_pickup" || wo.status === "completed";
            const needsApproval = (wo.status === "estimate_pending" || wo.status === "inspection") && wo.customerApprovalStatus === "pending" && wo.totalAmount > 0;

            return (
              <div key={wo.id} className="bg-[#FAFAFA] border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 animate-in fade-in duration-300">
                
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest">
                        Work Order: {wo.workOrderNumber}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white text-zinc-900 border border-zinc-300 text-[10px] font-bold uppercase tracking-wider font-mono">
                        Code: {wo.trackingCode}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-950 mt-1">
                      {wo.vehicleTitle}
                    </h2>
                    <p className="text-xs text-zinc-500 font-normal">
                      Customer: <strong className="text-zinc-900">{wo.customerName}</strong> • Department: <span className="uppercase">{wo.department}</span>
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block">Current Status</span>
                    <span className={`text-sm font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl inline-block mt-1 ${
                      isCompleted 
                        ? "bg-zinc-950 text-white" 
                        : "bg-zinc-200 text-zinc-900"
                    }`}>
                      {wo.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                {/* Progress Bar & Stages */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-zinc-600">
                    <span className="uppercase tracking-wider">Repair Progress</span>
                    <span className="text-zinc-950 font-black">{wo.progressPercentage}% Complete</span>
                  </div>

                  {/* Visual Bar */}
                  <div className="w-full h-2.5 bg-zinc-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-zinc-950 rounded-full transition-all duration-1000"
                      style={{ width: `${wo.progressPercentage}%` }}
                    />
                  </div>

                  {/* Stage Stepper Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    {REPAIR_STAGES.slice(0, 4).map((stg, i) => (
                      <div 
                        key={stg.id}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          i <= currentStageIdx
                            ? "bg-zinc-950 border-zinc-950 text-white font-bold"
                            : "bg-white border-zinc-200 text-zinc-400"
                        }`}
                      >
                        <span className="text-[10px] uppercase tracking-wider block font-bold">Step 0{i+1}</span>
                        <span className="text-xs font-black block mt-0.5">{stg.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technician & Public Status Note */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-white rounded-2xl border border-zinc-200 space-y-1">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider block text-[10px]">Service Technician</span>
                    <p className="text-zinc-900 font-bold flex items-center gap-1.5">
                      <Wrench size={14} className="text-zinc-600" /> {wo.technicianName} ({wo.bayNumber})
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-zinc-200 space-y-1">
                    <span className="text-zinc-400 font-bold uppercase tracking-wider block text-[10px]">Estimated Completion</span>
                    <p className="text-zinc-900 font-bold flex items-center gap-1.5">
                      <Clock size={14} className="text-zinc-600" /> {wo.estimatedCompletion ? new Date(wo.estimatedCompletion).toLocaleDateString() : "Updating shortly"}
                    </p>
                  </div>
                </div>

                {/* Latest Status Notes */}
                {wo.publicStatusNotes && (
                  <div className="p-5 bg-white rounded-2xl border border-zinc-200 text-xs text-zinc-900 space-y-1">
                    <strong className="font-bold uppercase tracking-wider text-[10px] text-zinc-500 block">Technician Update:</strong>
                    <p className="font-normal leading-relaxed">{wo.publicStatusNotes}</p>
                  </div>
                )}

                {/* Estimate & Approval Section */}
                {wo.totalAmount > 0 && (
                  <div className="p-6 bg-zinc-950 text-white rounded-2xl space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
                      <div>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">Itemized Estimate</span>
                        <h3 className="text-lg font-black uppercase tracking-tight text-white">Repair Cost Summary</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black text-white">
                          ${Number(wo.totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    {/* Customer Approval Controls */}
                    {needsApproval ? (
                      <div className="p-5 bg-zinc-900 rounded-xl border border-zinc-800 space-y-4">
                        <div className="space-y-1">
                          <h4 className="text-xs font-black uppercase tracking-wider text-white">Customer Authorization Required</h4>
                          <p className="text-xs text-zinc-400 font-normal">Please review and digitally authorize our technicians to proceed with this repair.</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            disabled={approving}
                            onClick={() => handleEstimateAction(wo.trackingCode, "approve")}
                            className="px-6 py-3 bg-white hover:bg-zinc-200 text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
                          >
                            <CheckCircle2 size={14} /> Approve Estimate &amp; Start Repair
                          </button>
                          <button
                            type="button"
                            disabled={approving}
                            onClick={() => handleEstimateAction(wo.trackingCode, "decline")}
                            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                          >
                            Request Callback
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-zinc-300 font-bold">
                        <CheckCircle2 size={16} className="text-white" /> Work Authorized &amp; In Progress
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* Workshop Assistance Callout */}
      <div className="max-w-2xl mx-auto p-6 bg-[#FAFAFA] border border-zinc-200 rounded-3xl text-center space-y-3">
        <h3 className="text-sm font-bold text-zinc-950 uppercase">Questions About Your Repair?</h3>
        <p className="text-xs text-zinc-500 font-normal">Contact our service manager Bobby Ali directly for real-time workshop updates.</p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <a href="tel:+19045029709" className="px-5 py-2.5 bg-zinc-950 text-white text-xs font-bold rounded-full hover:bg-zinc-800 transition-colors flex items-center gap-1.5">
            <Phone size={13} /> (904) 502-9709
          </a>
          <a href="https://wa.me/19045029709" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-white text-zinc-900 border border-zinc-300 text-xs font-bold rounded-full hover:bg-zinc-100 transition-colors flex items-center gap-1.5">
            <MessageSquare size={13} /> WhatsApp Service
          </a>
        </div>
      </div>
    </div>
  );
}

export default function TrackRepairPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 md:px-8 bg-black text-white text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest border border-white/15">
            Real-Time Vehicle Job Tracker
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
            Track Your Vehicle <br />
            <span className="text-zinc-400">Repair Progress</span>
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto font-normal">
            Enter your unique Tracking Code or phone number to check live inspection findings, repair stages, and approve estimates.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
        <Suspense fallback={<div className="text-center py-20 text-zinc-400">Loading Tracker...</div>}>
          <TrackRepairContent />
        </Suspense>
      </section>

      <Footer />
    </main>
  );
}
