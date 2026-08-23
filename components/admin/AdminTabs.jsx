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
  Clock,
  Phone,
  Mail,
  QrCode,
  Save,
  MessageCircle,
  Wrench,
  Shield,
  Plus,
  Tag
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import SocialPostHistory from "./SocialPostHistory";
import ManualPostComposer from "./ManualPostComposer";
import TokenStatus from "./TokenStatus";
import SocialPostButton from "./SocialPostButton";

const TABS = [
  { id: "inventory", label: "Inventory", icon: Car },
  { id: "service_bookings", label: "Service Appointments", icon: Wrench },
  { id: "work_orders", label: "Work Orders / Tracker", icon: Clock },
  { id: "body_shop", label: "Body Shop Estimates", icon: Shield },
  { id: "specials", label: "Specials & Coupons", icon: Tag },
  { id: "finance", label: "Financing Leads", icon: FileText },
  { id: "inquiries", label: "Inquiries", icon: MessageSquare },
  { id: "tradeins", label: "Trade-Ins", icon: CarFront },
  { id: "prequal", label: "Pre-Qualify", icon: ShieldCheck },
  { id: "compose", label: "Compose Post", icon: PenSquare },
  { id: "feed", label: "Social Logs", icon: Clock },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminTabs({ 
  vehicles: initialVehicles = [],
  contactSubmissions: initialContacts = [],
  financingLeads: initialFinancingLeads = [],
  financeApps: initialFinance = [],
  tradeIns: initialTradeIns = [],
  preQuals: initialPreQuals = [],
  serviceBookings: initialServiceBookings = [],
  bodyShopEstimates: initialBodyShopEstimates = [],
  workOrders: initialWorkOrders = [],
  serviceSpecials: initialSpecials = []
}) {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState("inventory");

  // State for dynamic items
  const [vehicles, setVehicles] = useState(initialVehicles || []);
  const [contacts, setContacts] = useState(initialContacts || []);
  const [financingLeads, setFinancingLeads] = useState(
    initialFinancingLeads && initialFinancingLeads.length > 0 ? initialFinancingLeads : (initialFinance || [])
  );
  const [tradeIns, setTradeIns] = useState(initialTradeIns || []);
  const [preQuals, setPreQuals] = useState(initialPreQuals || []);
  const [serviceBookings, setServiceBookings] = useState(initialServiceBookings || []);
  const [bodyShopEstimates, setBodyShopEstimates] = useState(initialBodyShopEstimates || []);
  const [workOrders, setWorkOrders] = useState(initialWorkOrders || []);
  const [specials, setSpecials] = useState(initialSpecials || []);

  // Filters & UI States
  const [inventorySearch, setInventorySearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [financeStatusFilter, setFinanceStatusFilter] = useState("all");
  const [financeLanguageFilter, setFinanceLanguageFilter] = useState("all");
  const [financeSearch, setFinanceSearch] = useState("");
  const [editingNotes, setEditingNotes] = useState({});
  const [showAdminQr, setShowAdminQr] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

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
      <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-1.5 mb-6 sm:mb-8 scroll-smooth overscroll-x-contain">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          let count = null;
          if (tab.id === "inventory") count = vehicles.length;
          if (tab.id === "service_bookings") count = serviceBookings.length;
          if (tab.id === "work_orders") count = workOrders.length;
          if (tab.id === "body_shop") count = bodyShopEstimates.length;
          if (tab.id === "specials") count = specials.length;
          if (tab.id === "finance") count = financingLeads.length;
          if (tab.id === "inquiries") count = contacts.length;
          if (tab.id === "tradeins") count = tradeIns.length;
          if (tab.id === "prequal") count = preQuals.length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 sm:shrink sm:flex-1 min-w-[120px] sm:min-w-[130px] flex items-center justify-center gap-2 py-2.5 sm:py-3 px-3 rounded-xl text-xs font-bold transition-all ${
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
        {/* SERVICE APPOINTMENTS TAB                                       */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "service_bookings" && (
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Wrench className="text-emerald-400" size={20} /> Service Appointments
                </h2>
                <p className="text-zinc-400 text-xs">Customer scheduled mechanical repair and maintenance bookings.</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full w-fit">
                {serviceBookings.length} Bookings
              </span>
            </div>

            {serviceBookings.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 text-sm bg-zinc-950 border border-zinc-800 rounded-2xl">
                No service bookings received yet. Online appointment submissions from /book-service will appear here.
              </div>
            ) : (
              <div className="space-y-4">
                {serviceBookings.map((b) => (
                  <div key={b.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-lg">{b.customer_name}</h3>
                          <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black uppercase font-mono">
                            {b.booking_number}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-400 text-[10px] uppercase font-bold">
                            {b.service_type.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400">
                          Scheduled: <strong className="text-white">{b.preferred_date} ({b.preferred_time})</strong> • Submitted: {new Date(b.created_at).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={async () => {
                            const trackingCode = `TRK-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
                            const workOrderNumber = `AHAQ-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
                            const { data: newWo, error } = await supabase.from("work_orders").insert([{
                              work_order_number: workOrderNumber,
                              tracking_code: trackingCode,
                              booking_id: b.id,
                              customer_name: b.customer_name,
                              customer_phone: b.customer_phone,
                              customer_email: b.customer_email,
                              vehicle_title: `${b.vehicle_year || ''} ${b.vehicle_make || ''} ${b.vehicle_model || ''}`.trim() || 'Customer Vehicle',
                              vehicle_vin: b.vehicle_vin,
                              department: b.service_type === 'body_shop' ? 'body_shop' : (b.service_type === 'window_tinting' ? 'tinting' : 'mechanical'),
                              primary_concern: b.symptoms,
                              status: 'checked_in',
                              progress_percentage: 15,
                              technician_name: 'Certified Technician',
                              bay_number: 'Bay 1',
                              public_status_notes: 'Vehicle checked in at workshop. Multi-point inspection underway.'
                            }]).select('*').single();

                            if (!error && newWo) {
                              setWorkOrders(prev => [newWo, ...prev]);
                              await supabase.from("service_bookings").update({ status: 'confirmed' }).eq("id", b.id);
                              setServiceBookings(prev => prev.map(item => item.id === b.id ? { ...item, status: 'confirmed' } : item));
                              alert(`Converted to Work Order #${workOrderNumber} (Tracking Code: ${trackingCode})!`);
                              setActiveTab("work_orders");
                            } else {
                              alert("Error creating work order: " + (error?.message || "Unknown error"));
                            }
                          }}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                        >
                          <Plus size={13} /> Convert to Work Order
                        </button>

                        <select
                          value={b.status || "pending"}
                          onChange={(e) => handleLeadStatusChange("service_bookings", b.id, e.target.value, setServiceBookings)}
                          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white"
                        >
                          <option value="pending">🟡 Pending</option>
                          <option value="confirmed">🟢 Confirmed</option>
                          <option value="in_progress">🔵 In Progress</option>
                          <option value="completed">💎 Completed</option>
                          <option value="cancelled">⚪ Cancelled</option>
                        </select>

                        <button
                          onClick={() => handleDeleteLead("service_bookings", b.id, setServiceBookings)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1">
                        <span className="text-zinc-500 font-bold uppercase block text-[10px]">Customer Contact</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">{b.customer_phone}</span>
                          <a href={`https://wa.me/${b.customer_phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold text-[10px] hover:underline flex items-center gap-0.5">
                            <MessageCircle size={12} /> WhatsApp
                          </a>
                        </div>
                        {b.customer_email && <p className="text-zinc-400">{b.customer_email}</p>}
                      </div>

                      <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1">
                        <span className="text-zinc-500 font-bold uppercase block text-[10px]">Vehicle</span>
                        <p className="text-white font-bold">{b.vehicle_year} {b.vehicle_make} {b.vehicle_model}</p>
                        {b.vehicle_mileage && <p className="text-zinc-400">{b.vehicle_mileage.toLocaleString()} miles</p>}
                      </div>

                      <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1">
                        <span className="text-zinc-500 font-bold uppercase block text-[10px]">Symptoms / Request</span>
                        <p className="text-zinc-300 leading-relaxed font-medium">{b.symptoms || "Standard service request."}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* WORK ORDERS & SHOP TRACKER TAB                                 */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "work_orders" && (
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Clock className="text-emerald-400" size={20} /> Active Work Orders &amp; Repair Tracker
                </h2>
                <p className="text-zinc-400 text-xs">Live workshop job cards. Updates reflect immediately on customer tracker (/service/track).</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full w-fit">
                {workOrders.length} Jobs
              </span>
            </div>

            {workOrders.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 text-sm bg-zinc-950 border border-zinc-800 rounded-2xl">
                No active work orders. Convert appointments from the Service Appointments tab or create a new job card.
              </div>
            ) : (
              <div className="space-y-4">
                {workOrders.map((wo) => (
                  <div key={wo.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all space-y-5">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-lg">{wo.vehicle_title}</h3>
                          <span className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-emerald-400 font-mono text-[10px] font-bold">
                            {wo.work_order_number}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                            Tracking: {wo.tracking_code}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400">
                          Customer: <strong className="text-white">{wo.customer_name}</strong> • Phone: {wo.customer_phone} • Bay: <strong>{wo.bay_number || 'Bay 1'}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={wo.status || "checked_in"}
                          onChange={async (e) => {
                            const newStatus = e.target.value;
                            const stageProgMap = {
                              checked_in: 15,
                              inspection: 30,
                              estimate_pending: 45,
                              approved: 55,
                              in_progress: 75,
                              quality_control: 90,
                              ready_for_pickup: 98,
                              completed: 100
                            };
                            const newProg = stageProgMap[newStatus] || 50;
                            const { error } = await supabase.from("work_orders").update({
                              status: newStatus,
                              progress_percentage: newProg,
                              updated_at: new Date().toISOString()
                            }).eq("id", wo.id);
                            if (!error) {
                              setWorkOrders(prev => prev.map(item => item.id === wo.id ? { ...item, status: newStatus, progress_percentage: newProg } : item));
                            }
                          }}
                          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white"
                        >
                          <option value="checked_in">🚗 Checked In</option>
                          <option value="inspection">🔍 Inspection</option>
                          <option value="estimate_pending">📋 Estimate Pending</option>
                          <option value="approved">✅ Approved</option>
                          <option value="in_progress">⚙️ In Progress</option>
                          <option value="quality_control">🧪 Quality Control</option>
                          <option value="ready_for_pickup">🎉 Ready for Pickup</option>
                          <option value="completed">💎 Completed</option>
                        </select>

                        <button
                          onClick={() => handleDeleteLead("work_orders", wo.id, setWorkOrders)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar Display */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-zinc-400">
                        <span>Current Stage: <strong className="text-white uppercase">{wo.status?.replace(/_/g, ' ')}</strong></span>
                        <span className="text-emerald-400 font-bold">{wo.progress_percentage || 15}%</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${wo.progress_percentage || 15}%` }} />
                      </div>
                    </div>

                    {/* Technician Notes & Customer View */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Public Status Update (Visible to Customer)</label>
                        <input
                          type="text"
                          defaultValue={wo.public_status_notes || ""}
                          placeholder="E.g., Brake rotors resurfaced. Ready for pickup at 4 PM."
                          onBlur={async (e) => {
                            await supabase.from("work_orders").update({ public_status_notes: e.target.value, updated_at: new Date().toISOString() }).eq("id", wo.id);
                          }}
                          className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Total Estimate Amount ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          defaultValue={wo.total_amount || ""}
                          placeholder="Total Amount in USD"
                          onBlur={async (e) => {
                            const val = parseFloat(e.target.value) || 0;
                            await supabase.from("work_orders").update({ total_amount: val, updated_at: new Date().toISOString() }).eq("id", wo.id);
                            setWorkOrders(prev => prev.map(item => item.id === wo.id ? { ...item, total_amount: val } : item));
                          }}
                          className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* BODY SHOP ESTIMATES TAB                                        */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "body_shop" && (
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Shield className="text-amber-400" size={20} /> Body Shop &amp; Collision Estimates
                </h2>
                <p className="text-zinc-400 text-xs">Customer accident damage photo appraisals and collision quote requests.</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full w-fit">
                {bodyShopEstimates.length} Estimates
              </span>
            </div>

            {bodyShopEstimates.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 text-sm bg-zinc-950 border border-zinc-800 rounded-2xl">
                No body shop estimates received yet. Submissions from /body-shop/estimate will appear here.
              </div>
            ) : (
              <div className="space-y-4">
                {bodyShopEstimates.map((est) => (
                  <div key={est.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-lg">{est.customer_name}</h3>
                          <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold">
                            {est.estimate_number}
                          </span>
                          {est.insurance_involved && (
                            <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                              Insurance: {est.insurance_company || 'Claim'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400">
                          Vehicle: <strong className="text-white">{est.vehicle_year} {est.vehicle_make} {est.vehicle_model}</strong> • Submitted: {new Date(est.created_at).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={async () => {
                            const trackingCode = `TRK-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
                            const workOrderNumber = `AHAQ-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
                            const { data: newWo, error } = await supabase.from("work_orders").insert([{
                              work_order_number: workOrderNumber,
                              tracking_code: trackingCode,
                              customer_name: est.customer_name,
                              customer_phone: est.customer_phone,
                              customer_email: est.customer_email,
                              vehicle_title: `${est.vehicle_year || ''} ${est.vehicle_make || ''} ${est.vehicle_model || ''}`.trim() || 'Customer Collision Vehicle',
                              vehicle_vin: est.vehicle_vin,
                              department: 'body_shop',
                              primary_concern: est.damage_description,
                              status: 'checked_in',
                              progress_percentage: 15,
                              technician_name: 'Master Collision Specialist',
                              bay_number: 'Body Bay 1',
                              public_status_notes: 'Vehicle checked in at body shop. Digital laser alignment and damage assessment underway.'
                            }]).select('*').single();

                            if (!error && newWo) {
                              setWorkOrders(prev => [newWo, ...prev]);
                              await supabase.from("body_shop_estimates").update({ status: 'in_repair' }).eq("id", est.id);
                              setBodyShopEstimates(prev => prev.map(item => item.id === est.id ? { ...item, status: 'in_repair' } : item));
                              alert(`Converted to Collision Work Order #${workOrderNumber} (Tracking Code: ${trackingCode})!`);
                              setActiveTab("work_orders");
                            } else {
                              alert("Error creating work order: " + (error?.message || "Unknown error"));
                            }
                          }}
                          className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 border border-zinc-700"
                        >
                          <Plus size={13} /> Convert to Work Order
                        </button>

                        <select
                          value={est.status || "pending_review"}
                          onChange={(e) => handleLeadStatusChange("body_shop_estimates", est.id, e.target.value, setBodyShopEstimates)}
                          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-zinc-800 border border-zinc-700 text-white"
                        >
                          <option value="pending_review">🟡 Pending Review</option>
                          <option value="estimate_prepared">📋 Estimate Prepared</option>
                          <option value="customer_approved">✅ Customer Approved</option>
                          <option value="in_repair">⚙️ In Repair</option>
                          <option value="completed">💎 Completed</option>
                          <option value="cancelled">⚪ Cancelled</option>
                        </select>

                        <button
                          onClick={() => handleDeleteLead("body_shop_estimates", est.id, setBodyShopEstimates)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1">
                        <span className="text-zinc-500 font-bold uppercase block text-[10px]">Contact Info</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">{est.customer_phone}</span>
                          <a href={`https://wa.me/${est.customer_phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white font-bold text-[10px] hover:underline flex items-center gap-0.5">
                            <MessageCircle size={12} /> WhatsApp
                          </a>
                        </div>
                        {est.customer_email && <p className="text-zinc-400">{est.customer_email}</p>}
                      </div>

                      <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1">
                        <span className="text-zinc-500 font-bold uppercase block text-[10px]">Vehicle &amp; Drivability</span>
                        <p className="text-white font-bold">{est.vehicle_year} {est.vehicle_make} {est.vehicle_model}</p>
                        <p className={est.is_drivable ? "text-zinc-300 font-bold text-[10px]" : "text-zinc-500 font-bold text-[10px]"}>
                          {est.is_drivable ? "✓ Vehicle is Drivable" : "⚠ Not Drivable / Needs Towing"}
                        </p>
                      </div>

                      <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1">
                        <span className="text-zinc-500 font-bold uppercase block text-[10px]">Damage Description</span>
                        <p className="text-zinc-300 leading-relaxed font-normal">{est.damage_description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* SPECIALS & COUPONS MANAGER TAB                                 */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "specials" && (
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Tag className="text-white" size={20} /> Service Coupons &amp; Specials Manager
                </h2>
                <p className="text-zinc-400 text-xs">Live control over customer discounts displayed on /service-specials.</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full w-fit">
                {specials.length} Active Coupons
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specials.map((sp) => (
                <div key={sp.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-zinc-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest border border-zinc-800">
                      {sp.tag}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={async () => {
                          const newActive = !sp.is_active;
                          const { error } = await supabase.from("service_specials").update({ is_active: newActive }).eq("id", sp.id);
                          if (!error) {
                            setSpecials(prev => prev.map(item => item.id === sp.id ? { ...item, is_active: newActive } : item));
                          }
                        }}
                        className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border transition-all ${
                          sp.is_active ? "bg-white text-black border-white" : "bg-zinc-900 text-zinc-500 border-zinc-800"
                        }`}
                      >
                        {sp.is_active ? "🟢 Live on Site" : "⚪ Hidden"}
                      </button>
                      <button
                        onClick={async () => {
                          if (!confirm(`Delete coupon "${sp.title}"?`)) return;
                          const { error } = await supabase.from("service_specials").delete().eq("id", sp.id);
                          if (!error) {
                            setSpecials(prev => prev.filter(item => item.id !== sp.id));
                          }
                        }}
                        className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-2xl font-black text-white block">{sp.discount_headline}</span>
                    <h3 className="text-base font-bold text-zinc-200 mt-0.5">{sp.title}</h3>
                    <p className="text-xs text-zinc-400 mt-1">{sp.description}</p>
                  </div>

                  {sp.promo_code && (
                    <div className="p-2.5 bg-zinc-900 rounded-xl border border-zinc-800 inline-block font-mono text-xs text-white">
                      Code: <strong>{sp.promo_code}</strong>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 3. CREDIT ACCEPTANCE & FINANCING LEADS TAB                     */}
        {/* ══════════════════════════════════════════════════════════════ */}
        {activeTab === "finance" && (
          <div className="p-6 space-y-8">
            
            {/* Credit Acceptance Provider Card */}
            <div className="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-emerald-500/30 rounded-3xl p-6 md:p-8 text-white shadow-2xl space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                      <ShieldCheck size={12} /> Credit Acceptance Active
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest">
                      Dealer Code: DCX3C
                    </span>
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                    Credit Acceptance Integration Control
                  </h2>
                  <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
                    Customer credit applications are processed through your official Credit Acceptance hosted portal. Zero local SSN storage ensures 100% compliance with automotive privacy regulations.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href="https://www.startyourcreditapproval.com/credit-application/DCX3C"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/40"
                  >
                    🇺🇸 Open English App <ExternalLink size={13} />
                  </a>
                  <a
                    href="https://www.startyourcreditapproval.com/credit-application/DCX3C?lang=es"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 border border-zinc-700"
                  >
                    🇪🇸 Open Spanish App <ExternalLink size={13} />
                  </a>
                  <button
                    onClick={() => setShowAdminQr(!showAdminQr)}
                    className="px-4 py-2.5 bg-white text-zinc-950 hover:bg-zinc-200 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg"
                  >
                    <QrCode size={14} /> {showAdminQr ? "Hide QR" : "Show QR"}
                  </button>
                </div>
              </div>

              {/* Admin QR Code View for Dealership Showroom */}
              {showAdminQr && (
                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-center gap-8 animate-in fade-in duration-200">
                  <div className="flex gap-6">
                    <div className="text-center">
                      <div className="w-28 h-28 bg-white rounded-xl p-2 mb-1.5 flex items-center justify-center shadow-lg">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fwww.startyourcreditapproval.com%2Fcredit-application%2FDCX3C" 
                          alt="English QR"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase">English Portal</span>
                    </div>
                    <div className="text-center">
                      <div className="w-28 h-28 bg-white rounded-xl p-2 mb-1.5 flex items-center justify-center shadow-lg">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https%3A%2F%2Fwww.startyourcreditapproval.com%2Fcredit-application%2FDCX3C%3Flang%3Des" 
                          alt="Spanish QR"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase">Spanish Portal</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Printable Showroom QR Codes
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-md">
                      Customers on the showroom lot can scan these QR codes directly with their smartphone cameras to immediately begin their Credit Acceptance application.
                    </p>
                  </div>
                </div>
              )}

              {/* CRM / CAPS Integration Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-500 font-bold uppercase tracking-wider block text-[10px]">Dealer ID</span>
                  <span className="text-white font-mono font-bold text-sm">DCX3C</span>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-500 font-bold uppercase tracking-wider block text-[10px]">CRM / CAPS Status</span>
                  <span className="text-emerald-400 font-bold text-xs">Hosted Flow Active</span>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-500 font-bold uppercase tracking-wider block text-[10px]">Security Underwriting</span>
                  <span className="text-zinc-300 font-bold text-xs">256-Bit SSL • Zero Local SSN</span>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <span className="text-zinc-500 font-bold uppercase tracking-wider block text-[10px]">API Key Config</span>
                  <span className="text-zinc-400 font-mono text-xs">•••••••••••• (Ready)</span>
                </div>
              </div>
            </div>

            {/* Lead Metrics KPI Counter Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider block">Total Leads</span>
                <span className="text-3xl font-black text-white mt-1 block">{financingLeads.length}</span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider block">New Leads</span>
                <span className="text-3xl font-black text-emerald-400 mt-1 block">
                  {financingLeads.filter(l => (l.status || 'new') === 'new').length}
                </span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider block">In Progress / Contacted</span>
                <span className="text-3xl font-black text-amber-400 mt-1 block">
                  {financingLeads.filter(l => ['contacted', 'application_started', 'deal_in_progress'].includes(l.status)).length}
                </span>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider block">Spanish Language</span>
                <span className="text-3xl font-black text-teal-400 mt-1 block">
                  {financingLeads.filter(l => l.preferred_language === 'es').length}
                </span>
              </div>
            </div>

            {/* Leads Filter & Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-3.5 top-3 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search leads by customer, phone, vehicle..."
                  value={financeSearch}
                  onChange={(e) => setFinanceSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select
                  value={financeStatusFilter}
                  onChange={(e) => setFinanceStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white font-bold focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">🟢 New</option>
                  <option value="contacted">🟡 Contacted</option>
                  <option value="application_started">🔵 App Started</option>
                  <option value="deal_in_progress">🟣 Deal in Progress</option>
                  <option value="approved">🟢 Approved</option>
                  <option value="funded">💎 Funded</option>
                  <option value="closed">⚪ Closed</option>
                </select>

                <select
                  value={financeLanguageFilter}
                  onChange={(e) => setFinanceLanguageFilter(e.target.value)}
                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white font-bold focus:outline-none"
                >
                  <option value="all">All Languages</option>
                  <option value="en">🇺🇸 English</option>
                  <option value="es">🇪🇸 Español</option>
                </select>
              </div>
            </div>

            {/* Leads List */}
            {financingLeads.length === 0 ? (
              <div className="py-16 text-center text-zinc-500 text-sm bg-zinc-950 border border-zinc-800 rounded-2xl">
                No financing leads recorded yet. As customers click Apply for Financing or start approvals, they will appear here live.
              </div>
            ) : (
              <div className="space-y-4">
                {financingLeads
                  .filter(lead => {
                    const searchTarget = `${lead.customer_name || ''} ${lead.customer_phone || ''} ${lead.customer_email || ''} ${lead.vehicle_title || ''} ${lead.vehicle_vin || ''}`.toLowerCase();
                    const matchesSearch = searchTarget.includes(financeSearch.toLowerCase());
                    const matchesStatus = financeStatusFilter === 'all' || (lead.status || 'new').toLowerCase() === financeStatusFilter.toLowerCase();
                    const matchesLang = financeLanguageFilter === 'all' || (lead.preferred_language || 'en').toLowerCase() === financeLanguageFilter.toLowerCase();
                    return matchesSearch && matchesStatus && matchesLang;
                  })
                  .map((lead) => {
                    const isSpanish = lead.preferred_language === 'es';
                    const hasVehicle = Boolean(lead.vehicle_title || lead.vehicle_vin);
                    const isEditing = editingNotes[lead.id] !== undefined;
                    const noteContent = isEditing ? editingNotes[lead.id] : (lead.notes || '');

                    return (
                      <div key={lead.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all space-y-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-white text-lg">
                                {lead.customer_name || "Online Financing Applicant"}
                              </h3>
                              <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                                isSpanish ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                              }`}>
                                {isSpanish ? "🇪🇸 Español" : "🇺🇸 English"}
                              </span>
                              <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 font-mono">
                                {lead.source || "website"}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-500">
                              Activity: {new Date(lead.created_at).toLocaleString()} • Source Page: <span className="text-zinc-400 font-mono">{lead.source_page || '/finance'}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <select
                              value={lead.status || "new"}
                              onChange={(e) => handleLeadStatusChange("financing_leads", lead.id, e.target.value, setFinancingLeads)}
                              className={`text-xs font-bold px-3 py-2 rounded-xl border ${
                                lead.status === "approved" || lead.status === "funded"
                                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                                  : lead.status === "contacted" || lead.status === "deal_in_progress"
                                  ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                                  : "bg-zinc-800 text-white border-zinc-700"
                              }`}
                            >
                              <option value="new">🟢 New Lead</option>
                              <option value="contacted">🟡 Contacted</option>
                              <option value="application_started">🔵 App Started</option>
                              <option value="deal_in_progress">🟣 Deal in Progress</option>
                              <option value="approved">🟢 Approved (Credit Acceptance)</option>
                              <option value="funded">💎 Funded / Delivered</option>
                              <option value="closed">⚪ Closed / Lost</option>
                            </select>

                            <button
                              onClick={() => handleDeleteLead("financing_leads", lead.id, setFinancingLeads)}
                              className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                              title="Delete Lead"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Lead Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                          {/* Customer Contact */}
                          <div className="space-y-1.5 bg-zinc-900/50 p-3.5 rounded-xl border border-zinc-800/80">
                            <span className="text-zinc-500 font-bold uppercase tracking-wider block text-[10px]">Contact Info</span>
                            {lead.customer_phone ? (
                              <div className="flex items-center gap-2">
                                <span className="text-white font-bold">{lead.customer_phone}</span>
                                <a 
                                  href={`https://wa.me/${lead.customer_phone.replace(/[^0-9]/g, '')}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-[10px] text-emerald-400 font-bold hover:underline flex items-center gap-0.5"
                                >
                                  <MessageCircle size={12} /> WhatsApp
                                </a>
                              </div>
                            ) : (
                              <p className="text-zinc-500 italic">No phone captured yet</p>
                            )}
                            {lead.customer_email && (
                              <p className="text-zinc-400 truncate">{lead.customer_email}</p>
                            )}
                          </div>

                          {/* Vehicle Association */}
                          <div className="space-y-1.5 bg-zinc-900/50 p-3.5 rounded-xl border border-zinc-800/80">
                            <span className="text-zinc-500 font-bold uppercase tracking-wider block text-[10px]">Associated Vehicle</span>
                            {hasVehicle ? (
                              <div>
                                <p className="text-white font-bold truncate">{lead.vehicle_title}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                  {lead.vehicle_price && (
                                    <span className="text-emerald-400 font-bold">
                                      ${Number(lead.vehicle_price).toLocaleString()}
                                    </span>
                                  )}
                                  {lead.vehicle_vin && (
                                    <span className="text-zinc-500 font-mono text-[10px]">
                                      VIN: {lead.vehicle_vin.slice(-8)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <p className="text-zinc-400 font-medium">General Inventory Application</p>
                            )}
                          </div>

                          {/* Credit Acceptance Info */}
                          <div className="space-y-1.5 bg-zinc-900/50 p-3.5 rounded-xl border border-zinc-800/80">
                            <span className="text-zinc-500 font-bold uppercase tracking-wider block text-[10px]">Provider Workflow</span>
                            <p className="text-emerald-400 font-bold flex items-center gap-1">
                              <ShieldCheck size={13} /> Credit Acceptance (DCX3C)
                            </p>
                            <p className="text-zinc-500 text-[10px]">
                              {lead.credit_acceptance_status || "Customer directed to hosted portal"}
                            </p>
                          </div>
                        </div>

                        {/* Internal Dealership Notes Editor */}
                        <div className="pt-2">
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                              <Edit size={12} /> Internal Notes &amp; Follow-Up History
                            </label>
                            {isEditing && (
                              <button
                                onClick={async () => {
                                  try {
                                    const { error } = await supabase
                                      .from("financing_leads")
                                      .update({ notes: noteContent, updated_at: new Date().toISOString() })
                                      .eq("id", lead.id);
                                    if (!error) {
                                      setFinancingLeads(prev => prev.map(l => l.id === lead.id ? { ...l, notes: noteContent } : l));
                                      setEditingNotes(prev => {
                                        const next = { ...prev };
                                        delete next[lead.id];
                                        return next;
                                      });
                                    } else {
                                      alert("Error saving notes: " + error.message);
                                    }
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                              >
                                <Save size={12} /> Save Notes
                              </button>
                            )}
                          </div>
                          <textarea
                            rows={2}
                            value={noteContent}
                            placeholder="Add follow-up notes, customer budget, trade-in info..."
                            onChange={(e) => setEditingNotes({ ...editingNotes, [lead.id]: e.target.value })}
                            className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
                          />
                        </div>
                      </div>
                    );
                  })}
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
