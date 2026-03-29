"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Car,
  MessageSquare,
  PenSquare,
  Settings,
  Trash2,
  Edit,
} from "lucide-react";
import SocialPostHistory from "./SocialPostHistory";
import ManualPostComposer from "./ManualPostComposer";
import TokenStatus from "./TokenStatus";
import SocialPostButton from "./SocialPostButton";

const TABS = [
  { id: "inventory", label: "Inventory", icon: Car },
  { id: "feed", label: "Social Feed", icon: MessageSquare },
  { id: "compose", label: "Compose Post", icon: PenSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminTabs({ vehicles }) {
  const [activeTab, setActiveTab] = useState("inventory");

  return (
    <div>
      {/* Tab Bar */}
      <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-1.5 mb-8">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white text-zinc-900 shadow-lg"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* ── INVENTORY TAB ───────────────────────────────── */}
        {activeTab === "inventory" && (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/50">
                <th className="py-4 px-6 text-sm font-medium text-zinc-400">
                  Vehicle
                </th>
                <th className="py-4 px-6 text-sm font-medium text-zinc-400">
                  Price
                </th>
                <th className="py-4 px-6 text-sm font-medium text-zinc-400">
                  Mileage
                </th>
                <th className="py-4 px-6 text-sm font-medium text-zinc-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="py-12 text-center text-zinc-500"
                  >
                    No vehicles listed yet. Click &quot;Add Vehicle&quot; to get
                    started!
                  </td>
                </tr>
              ) : null}
              {vehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="border-b border-zinc-800/50 hover:bg-zinc-800/20 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      {vehicle.images?.[0] ? (
                        <div className="relative w-16 h-12 overflow-hidden rounded-lg">
                          <Image
                            src={vehicle.images[0]}
                            alt="Thumbnail"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-12 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-600 text-xs text-center border-2 border-dashed border-zinc-700">
                          No Img
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-white">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </div>
                        <div className="text-sm text-zinc-500 font-mono">
                          VIN: {vehicle.vin || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-zinc-300">
                    ${vehicle.price?.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-zinc-400">
                    {vehicle.mileage?.toLocaleString()} mi
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <SocialPostButton vehicleId={vehicle.id} />
                      <button className="text-zinc-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-400 transition-colors p-2 hover:bg-red-500/10 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ── SOCIAL FEED TAB ────────────────────────────── */}
        {activeTab === "feed" && (
          <div className="p-6">
            <h2 className="text-xl font-bold text-white tracking-tight mb-6">
              Social Post History
            </h2>
            <SocialPostHistory />
          </div>
        )}

        {/* ── COMPOSE TAB ────────────────────────────────── */}
        {activeTab === "compose" && (
          <div className="p-6">
            <h2 className="text-xl font-bold text-white tracking-tight mb-6">
              Compose &amp; Publish
            </h2>
            <ManualPostComposer />
          </div>
        )}

        {/* ── SETTINGS TAB ───────────────────────────────── */}
        {activeTab === "settings" && (
          <div className="p-6">
            <h2 className="text-xl font-bold text-white tracking-tight mb-6">
              Connected Accounts
            </h2>
            <TokenStatus />
          </div>
        )}
      </div>
    </div>
  );
}
