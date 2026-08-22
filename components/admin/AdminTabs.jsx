"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Car,
  MessageSquare,
  FileText,
  CarFront,
  ShieldCheck,
  PenSquare,
  Settings,
  Trash2,
  Edit,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  Flame,
  Phone,
  Mail,
  Eye,
  EyeOff,
  Plus
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import SocialPostHistory from "./SocialPostHistory";
import ManualPostComposer from "./ManualPostComposer";
import TokenStatus from "./TokenStatus";
import SocialPostButton from "./SocialPostButton";

const TABS = [
  { id: "inventory", label: "Inventory", icon: Car },
  { id: "inquiries", label: "Inquiries", icon: MessageSquare },
  { id: "finance", label: "Finance Apps", icon: FileText },
  { id: "tradeins", label: "Trade-Ins", icon: CarFront },
  { id: "prequal", label: "Pre-Qualify", icon: ShieldCheck },
  { id: "compose", label: "Compose Post", icon: PenSquare },
  { id: "feed", label: "Social Logs", icon: Clock },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminTabs({ 
  vehicles: initialVehicles = [],
  contactSubmissions: initialContacts = [],
  financeApps: initialFinance = [],
  tradeIns: initialTradeIns = [],
  preQuals: initialPreQuals = []
}) {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState("inventory");

  // State for dynamic items
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [contacts, setContacts] = useState(initialContacts);
  const [finance, setFinance] = useState(initialFinance);
  const [tradeIns, setTradeIns] = useState(initialTradeIns);
  const [preQuals, setPreQuals] = useState(initialPreQuals);

  // Filters & UI States
  const [inventorySearch, setInventorySearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);
  const [revealedSsn, setRevealedSsn] = useState({});

  // 1. UPDATE VEHICLE STATUS (e.g. Sold, Available, Price Drop)
  const handleStatusChange = async (vehicleId, newStatus) => {
    setUpdatingId(vehicleId);
    try {
      const { error } = await supabase
        .from("vehicles")
        .update({ status: newStatus })
        .eq("id", vehicleId);

      if (!error) {
        setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, status: newStatus } : v));
      } else {
        alert("Error updating status: " + error.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // 2. QUICK PRICE UPDATE
  const handlePriceUpdate = async (vehicleId, currentPrice) => {
    const newPriceStr = prompt("Enter new price in USD:", currentPrice);
    if (!newPriceStr) return;
    const newPrice = parseInt(newPriceStr);
    if (isNaN(newPrice) || newPrice < 0) {
      alert("Invalid price entered");
      return;
    }

    setUpdatingId(vehicleId);
    try {
      const { error } = await supabase
        .from("vehicles")
        .update({ price: newPrice })
        .eq("id", vehicleId);

      if (!error) {
        setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, price: newPrice } : v));
      } else {
        alert("Error updating price: " + error.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // 3. DELETE VEHICLE
  const handleDeleteVehicle = async (vehicle) => {
    if (!confirm(`Are you sure you want to delete ${vehicle.year} ${vehicle.make} ${vehicle.model}?`)) {
      return;
    }

    setUpdatingId(vehicle.id);
    try {
      const { error } = await supabase
        .from("vehicles")
        .delete()
        .eq("id", vehicle.id);

      if (!error) {
        setVehicles(prev => prev.filter(v => v.id !== vehicle.id));
      } else {
        alert("Error deleting vehicle: " + error.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  // 4. UPDATE LEAD STATUS (Contact / Finance / Trade-in)
  const handleLeadStatusChange = async (table, id, newStatus, stateSetter) => {
    try {
      const { error } = await supabase
        .from(table)
        .update({ status: newStatus })
        .eq("id", id);

      if (!error) {
        stateSetter(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
      } else {
        alert("Error updating status: " + error.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 5. DELETE LEAD
  const handleDeleteLead = async (table, id, stateSetter) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (!error) {
        stateSetter(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered vehicles
  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = `${v.year} ${v.make} ${v.model} ${v.vin || ""}`
      .toLowerCase()
      .includes(inventorySearch.toLowerCase());
    
    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && (v.status || "available").toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div>
      {/* Navigation Tab Bar */}
      <div className="flex flex-wrap gap-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-1.5 mb-8">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          let count = null;
          if (tab.id === "inventory") count = vehicles.length;
          if (tab.id === "inquiries") count = contacts.length;
          if (tab.id === "finance") count = finance.length;
          if (tab.id === "tradeins") count = tradeIns.length;
          if (tab.id === "prequal") count = preQuals.length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-zinc-950 shadow-xl"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
              {count !== null && count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                  activeTab === tab.id ? "bg-zinc-900 text-white" : "bg-zinc-800 text-zinc-300"
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 1. INVENTORY MANAGEMENT TAB (FULL CRUD & SOLD TOGGLE)          */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "inventory" && (
          <div className="p-6">
            {/* Top Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-800">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    statusFilter === "all" ? "bg-white text-black" : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  All ({vehicles.length})
                </button>
                <button
                  onClick={() => setStatusFilter("available")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    statusFilter === "available" ? "bg-emerald-500 text-white" : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  Available ({vehicles.filter(v => (v.status || "available") === "available").length})
                </button>
                <button
                  onClick={() => setStatusFilter("sold")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    statusFilter === "sold" ? "bg-red-600 text-white" : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  Sold ({vehicles.filter(v => v.status === "sold").length})
                </button>
                <button
                  onClick={() => setStatusFilter("pending")}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    statusFilter === "pending" ? "bg-amber-500 text-black" : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  Pending ({vehicles.filter(v => v.status === "pending").length})
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  placeholder="Search by make, model, VIN..."
                  className="bg-zinc-950 border border-zinc-800 text-white text-xs rounded-xl pl-9 pr-4 py-2.5 w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-white"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-950/40 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    <th className="py-3.5 px-4">Vehicle &amp; Image</th>
                    <th className="py-3.5 px-4">Status / Badge</th>
                    <th className="py-3.5 px-4">Price ($)</th>
                    <th className="py-3.5 px-4">Mileage</th>
                    <th className="py-3.5 px-4">Tags</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-zinc-500 text-sm">
                        No vehicles found matching your criteria.
                      </td>
                    </tr>
                  ) : null}

                  {filteredVehicles.map((vehicle) => {
                    const status = (vehicle.status || "available").toLowerCase();
                    const isSold = status === "sold";

                    return (
                      <tr
                        key={vehicle.id}
                        className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors"
                      >
                        {/* Vehicle Photo & Title */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            {vehicle.images?.[0] ? (
                              <div className="relative w-16 h-12 overflow-hidden rounded-xl border border-zinc-700 shrink-0">
                                <Image
                                  src={vehicle.images[0]}
                                  alt="Thumbnail"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-500 text-[10px] font-bold shrink-0">
                                No Img
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-white text-sm flex items-center gap-2">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                                {isSold && (
                                  <span className="px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[9px] font-black uppercase tracking-wider">
                                    SOLD
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-zinc-500 font-mono">
                                VIN: {vehicle.vin || "Contact Dealer"}
                              </div>
                              {vehicle.slug && (
                                <div className="text-[10px] text-zinc-500 font-mono">
                                  /{vehicle.slug}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Quick Status Dropdown */}
                        <td className="py-4 px-4">
                          <select
                            value={vehicle.status || "available"}
                            onChange={(e) => handleStatusChange(vehicle.id, e.target.value)}
                            disabled={updatingId === vehicle.id}
                            className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none transition-all cursor-pointer ${
                              isSold 
                                ? "bg-red-600 text-white border-red-500 shadow-md shadow-red-950/50" 
                                : status === "pending"
                                ? "bg-amber-500 text-black border-amber-400"
                                : status === "price_drop"
                                ? "bg-emerald-600 text-white border-emerald-500"
                                : "bg-zinc-950 text-white border-zinc-800"
                            }`}
                          >
                            <option value="available">🟢 Available</option>
                            <option value="sold">🔴 Mark as SOLD</option>
                            <option value="pending">🟡 Sale Pending</option>
                            <option value="price_drop">🔥 Price Drop</option>
                            <option value="featured">⭐ Featured</option>
                          </select>
                        </td>

                        {/* Price */}
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handlePriceUpdate(vehicle.id, vehicle.price)}
                            title="Click to edit price"
                            className="font-bold text-sm text-emerald-400 hover:text-emerald-300 hover:underline flex items-center gap-1"
                          >
                            ${vehicle.price?.toLocaleString()}
                            <span className="text-[10px] text-zinc-500 font-normal">✏️</span>
                          </button>
                        </td>

                        {/* Mileage */}
                        <td className="py-4 px-4 text-xs font-mono text-zinc-300">
                          {vehicle.mileage?.toLocaleString()} mi
                        </td>

                        {/* Tags */}
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1 max-w-[160px]">
                            {vehicle.tags && vehicle.tags.length > 0 ? (
                              vehicle.tags.slice(0, 2).map((t, idx) => (
                                <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                                  {t}
                                </span>
                              ))
                            ) : (
                              <span className="text-[10px] text-zinc-600">None</span>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Live view */}
                            <Link
                              href={`/inventory/${vehicle.slug || vehicle.id}`}
                              target="_blank"
                              className="text-zinc-400 hover:text-white p-2 hover:bg-zinc-800 rounded-xl transition-colors"
                              title="View on site"
                            >
                              <ExternalLink size={15} />
                            </Link>

                            {/* Social Post */}
                            <SocialPostButton vehicleId={vehicle.id} />

                            {/* Edit */}
                            <Link
                              href={`/admin/edit/${vehicle.id}`}
                              className="text-zinc-300 hover:text-white p-2 hover:bg-zinc-800 rounded-xl transition-colors"
                              title="Edit Full Details"
                            >
                              <Edit size={15} />
                            </Link>

                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteVehicle(vehicle)}
                              disabled={updatingId === vehicle.id}
                              className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-xl transition-colors"
                              title="Delete Vehicle"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 2. CUSTOMER INQUIRIES & MESSAGES TAB                          */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "inquiries" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Customer Inquiries</h2>
                <p className="text-zinc-400 text-xs">Direct messages &amp; vehicle inquiries from your website forms.</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full">
                {contacts.length} Total Messages
              </span>
            </div>

            {contacts.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 text-sm">
                No customer inquiries received yet.
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.map((c) => (
                  <div key={c.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-bold text-white text-base">{c.name}</h3>
                        <div className="flex items-center gap-4 text-xs text-zinc-400 mt-1">
                          <span className="flex items-center gap-1"><Mail size={12} /> {c.email}</span>
                          {c.phone && <span className="flex items-center gap-1"><Phone size={12} /> {c.phone}</span>}
                          <span className="text-zinc-500">{new Date(c.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={c.status || "new"}
                          onChange={(e) => handleLeadStatusChange("contact_submissions", c.id, e.target.value, setContacts)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${
                            c.status === "contacted" 
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/30" 
                              : c.status === "resolved"
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              : "bg-zinc-800 text-white border-zinc-700"
                          }`}
                        >
                          <option value="new">🟢 New Lead</option>
                          <option value="contacted">🟡 Contacted</option>
                          <option value="resolved">✓ Resolved</option>
                        </select>

                        <button
                          onClick={() => handleDeleteLead("contact_submissions", c.id, setContacts)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="bg-zinc-900/60 rounded-xl p-4 text-xs text-zinc-300 leading-relaxed border border-zinc-800">
                      {c.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 3. FINANCE APPLICATIONS TAB                                   */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "finance" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Finance Applications</h2>
                <p className="text-zinc-400 text-xs">Full online loan &amp; credit application submissions.</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full">
                {finance.length} Applications
              </span>
            </div>

            {finance.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 text-sm">
                No finance applications submitted yet.
              </div>
            ) : (
              <div className="space-y-4">
                {finance.map((f) => (
                  <div key={f.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                      <div>
                        <h3 className="font-bold text-white text-lg">{f.first_name} {f.last_name}</h3>
                        <p className="text-xs text-zinc-400">
                          Submitted: {new Date(f.created_at).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={f.status || "pending"}
                          onChange={(e) => handleLeadStatusChange("finance_applications", f.id, e.target.value, setFinance)}
                          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white"
                        >
                          <option value="pending">🟡 Pending Review</option>
                          <option value="approved">🟢 Approved</option>
                          <option value="denied">🔴 Denied</option>
                          <option value="under_review">🔵 Under Review</option>
                        </select>

                        <button
                          onClick={() => handleDeleteLead("finance_applications", f.id, setFinance)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs">
                      <div>
                        <span className="text-zinc-500 block font-bold">Contact</span>
                        <p className="text-white font-medium">{f.phone}</p>
                        <p className="text-zinc-400">{f.email}</p>
                      </div>
                      <div>
                        <span className="text-zinc-500 block font-bold">Income &amp; Job</span>
                        <p className="text-emerald-400 font-bold">${f.monthly_income?.toLocaleString() || f.income?.toLocaleString()} / mo</p>
                        <p className="text-zinc-400">{f.job_title} at {f.employer || "N/A"}</p>
                      </div>
                      <div>
                        <span className="text-zinc-500 block font-bold">Residence</span>
                        <p className="text-zinc-300">{f.address}</p>
                        <p className="text-zinc-400">{f.city}, {f.state} {f.zip_code || f.zip}</p>
                      </div>
                      <div>
                        <span className="text-zinc-500 block font-bold">SSN (Confidential)</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono text-zinc-300 font-bold">
                            {revealedSsn[f.id] ? f.ssn : "•••-••-" + (f.ssn ? f.ssn.slice(-4) : "••••")}
                          </span>
                          <button
                            onClick={() => setRevealedSsn(prev => ({ ...prev, [f.id]: !prev[f.id] }))}
                            className="text-zinc-500 hover:text-white"
                          >
                            {revealedSsn[f.id] ? <EyeOff size={13} /> : <Eye size={13} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 4. TRADE-IN APPRAISALS TAB                                     */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "tradeins" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Trade-In Appraisals</h2>
                <p className="text-zinc-400 text-xs">Customer vehicle trade-in valuation requests.</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full">
                {tradeIns.length} Trade-Ins
              </span>
            </div>

            {tradeIns.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 text-sm">
                No trade-in appraisals requested yet.
              </div>
            ) : (
              <div className="space-y-4">
                {tradeIns.map((t) => (
                  <div key={t.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-bold text-white text-base">
                          {t.vehicle_year || ""} {t.vehicle_make || ""} {t.vehicle_model || "Trade Vehicle"}
                        </h3>
                        <p className="text-xs text-zinc-400">
                          Customer: <strong className="text-white">{t.name}</strong> • {t.phone || "No phone"} • {t.email}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={t.status || "pending"}
                          onChange={(e) => handleLeadStatusChange("trade_in_submissions", t.id, e.target.value, setTradeIns)}
                          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white"
                        >
                          <option value="pending">🟡 Pending Offer</option>
                          <option value="contacted">🔵 Contacted</option>
                          <option value="offered">🟢 Offer Sent</option>
                          <option value="closed">✓ Closed</option>
                        </select>

                        <button
                          onClick={() => handleDeleteLead("trade_in_submissions", t.id, setTradeIns)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-zinc-900 text-xs">
                      <div>
                        <span className="text-zinc-500 block font-bold">VIN</span>
                        <span className="font-mono text-zinc-300">{t.vin || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block font-bold">Mileage</span>
                        <span className="text-zinc-300 font-mono">{t.mileage?.toLocaleString()} mi</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block font-bold">Condition</span>
                        <span className="text-zinc-300 font-medium">{t.condition || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 5. PRE-QUALIFICATION LEADS TAB                                 */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "prequal" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Pre-Qualification Leads</h2>
                <p className="text-zinc-400 text-xs">Soft credit check buyer inquiries.</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full">
                {preQuals.length} Leads
              </span>
            </div>

            {preQuals.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 text-sm">
                No pre-qualification leads yet.
              </div>
            ) : (
              <div className="space-y-4">
                {preQuals.map((p) => (
                  <div key={p.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-white text-base">{p.first_name} {p.last_name}</h3>
                      <p className="text-xs text-zinc-400">
                        {p.email} • {p.phone}
                      </p>
                      <p className="text-[11px] text-zinc-500 mt-1">
                        Submitted: {new Date(p.created_at).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase block">Estimated Credit</span>
                        <span className="text-xs font-bold text-emerald-400">{p.estimated_credit_score}</span>
                      </div>

                      <select
                        value={p.status || "pending"}
                        onChange={(e) => handleLeadStatusChange("finance_pre_qualifications", p.id, e.target.value, setPreQuals)}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white"
                      >
                        <option value="pending">🟡 Pending</option>
                        <option value="contacted">🔵 Contacted</option>
                        <option value="approved">🟢 Pre-Approved</option>
                      </select>

                      <button
                        onClick={() => handleDeleteLead("finance_pre_qualifications", p.id, setPreQuals)}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 6. COMPOSE POST TAB                                            */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "compose" && (
          <div className="p-6">
            <h2 className="text-xl font-bold text-white tracking-tight mb-6">
              Compose &amp; Publish Social Post
            </h2>
            <ManualPostComposer />
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 7. SOCIAL LOGS TAB                                             */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "feed" && (
          <div className="p-6">
            <h2 className="text-xl font-bold text-white tracking-tight mb-6">
              Social Media Distribution Logs
            </h2>
            <SocialPostHistory />
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 8. SETTINGS & TOKENS TAB                                       */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "settings" && (
          <div className="p-6">
            <h2 className="text-xl font-bold text-white tracking-tight mb-6">
              API Tokens &amp; Social Integration
            </h2>
            <TokenStatus />
          </div>
        )}

      </div>
    </div>
  );
}
