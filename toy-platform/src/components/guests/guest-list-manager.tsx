"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Plus,
  Search,
  Trash2,
  Edit3,
  Check,
  X,
  UserPlus,
  UserCheck,
  UserX,
  HelpCircle,
  Filter,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ProgressBar } from "@/components/ui/progress";
import { FadeIn } from "@/components/animations/animated";
import { useI18n } from "@/i18n/context";
import { cn } from "@/lib/utils";

type GuestStatus = "confirmed" | "pending" | "declined" | "maybe";
type GuestGroup = "bride" | "groom" | "mutual" | "colleagues" | "vip";
type Dietary = "none" | "vegetarian" | "vegan" | "halal" | "glutenFree" | "allergies";

interface Guest {
  id: string;
  name: string;
  group: GuestGroup;
  status: GuestStatus;
  dietary: Dietary;
  table: number | null;
  notes: string;
  phone?: string;
}

const MOCK_GUESTS: Guest[] = [
  { id: "1", name: "Hamza Karimov", group: "groom", status: "confirmed", dietary: "none", table: 1, notes: "", phone: "+998901112233" },
  { id: "2", name: "Nodira Abdullayeva", group: "bride", status: "confirmed", dietary: "vegetarian", table: 2, notes: "Bring gift" },
  { id: "3", name: "Sardor Rakhimov", group: "mutual", status: "pending", dietary: "none", table: null, notes: "Needs transportation" },
  { id: "4", name: "Gulnara Toshmatova", group: "bride", status: "confirmed", dietary: "halal", table: 3, notes: "" },
  { id: "5", name: "Jasur Mirkhamidov", group: "colleagues", status: "pending", dietary: "none", table: null, notes: "" },
  { id: "6", name: "Dilshod Normatov", group: "groom", status: "confirmed", dietary: "none", table: 1, notes: "" },
  { id: "7", name: "Malika Yusupova", group: "vip", status: "confirmed", dietary: "vegan", table: 4, notes: "VIP table" },
  { id: "8", name: "Otabek Sobirov", group: "mutual", status: "declined", dietary: "none", table: null, notes: "Out of town" },
  { id: "9", name: "Zulfiya Karimova", group: "bride", status: "maybe", dietary: "glutenFree", table: null, notes: "" },
  { id: "10", name: "Rustam Aliyev", group: "groom", status: "confirmed", dietary: "none", table: 5, notes: "" },
];

const STATUS_ICONS: Record<GuestStatus, React.ComponentType<{ className?: string }>> = {
  confirmed: UserCheck,
  pending: HelpCircle,
  declined: UserX,
  maybe: HelpCircle,
};

const STATUS_COLORS: Record<GuestStatus, string> = {
  confirmed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  declined: "bg-rose-100 text-rose-700 border-rose-200",
  maybe: "bg-slate-100 text-slate-600 border-slate-200",
};

export function GuestListManager() {
  const { t } = useI18n();
  const [guests, setGuests] = useState<Guest[]>(MOCK_GUESTS);
  const [search, setSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newGuest, setNewGuest] = useState({ name: "", group: "mutual" as GuestGroup, phone: "", notes: "" });

  const filtered = guests.filter((g) => {
    if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterGroup !== "all" && g.group !== filterGroup) return false;
    if (filterStatus !== "all" && g.status !== filterStatus) return false;
    return true;
  });

  const stats = {
    total: guests.length,
    confirmed: guests.filter((g) => g.status === "confirmed").length,
    pending: guests.filter((g) => g.status === "pending").length,
    declined: guests.filter((g) => g.status === "declined").length,
  };

  const addGuest = () => {
    if (!newGuest.name.trim()) return;
    setGuests([
      ...guests,
      {
        id: Date.now().toString(),
        name: newGuest.name,
        group: newGuest.group,
        status: "pending",
        dietary: "none",
        table: null,
        notes: newGuest.notes,
        phone: newGuest.phone,
      },
    ]);
    setNewGuest({ name: "", group: "mutual", phone: "", notes: "" });
    setShowAddForm(false);
  };

  const updateStatus = (id: string, status: GuestStatus) => {
    setGuests(guests.map((g) => (g.id === id ? { ...g, status } : g)));
  };

  const removeGuest = (id: string) => {
    setGuests(guests.filter((g) => g.id !== id));
  };

  return (
    <FadeIn>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary-500" />
              {t("guestList.title")}
            </CardTitle>
            <Button size="sm" onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="h-4 w-4" />
              {t("guestList.addGuest")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: t("guestList.totalGuests"), value: stats.total, color: "text-primary-600" },
              { label: t("guestList.confirmed"), value: stats.confirmed, color: "text-emerald-600" },
              { label: t("guestList.pending"), value: stats.pending, color: "text-amber-600" },
              { label: t("guestList.declined"), value: stats.declined, color: "text-rose-600" },
            ].map((s, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-slate-50">
                <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>

          <ProgressBar
            value={stats.confirmed}
            max={stats.total}
            color="#10b981"
            size="sm"
            showLabel
          />

          {/* Add Form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex gap-3 mt-4 p-4 rounded-xl bg-primary-50 border border-primary-200">
                  <input
                    type="text"
                    placeholder={t("guestList.name")}
                    value={newGuest.name}
                    onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                    className="flex-1 h-10 px-3 rounded-lg border border-primary-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                  />
                  <select
                    value={newGuest.group}
                    onChange={(e) => setNewGuest({ ...newGuest, group: e.target.value as GuestGroup })}
                    className="h-10 px-3 rounded-lg border border-primary-200 bg-white text-sm focus:outline-none"
                  >
                    <option value="bride">{t("guestList.groups.bride")}</option>
                    <option value="groom">{t("guestList.groups.groom")}</option>
                    <option value="mutual">{t("guestList.groups.mutual")}</option>
                    <option value="colleagues">{t("guestList.groups.colleagues")}</option>
                    <option value="vip">{t("guestList.groups.vip")}</option>
                  </select>
                  <Button size="sm" onClick={addGuest}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={t("common.search") + "..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="h-9 px-3 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none"
            >
              <option value="all">{t("common.all")}</option>
              <option value="bride">{t("guestList.groups.bride")}</option>
              <option value="groom">{t("guestList.groups.groom")}</option>
              <option value="mutual">{t("guestList.groups.mutual")}</option>
              <option value="colleagues">{t("guestList.groups.colleagues")}</option>
              <option value="vip">{t("guestList.groups.vip")}</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-9 px-3 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none"
            >
              <option value="all">{t("common.all")}</option>
              <option value="confirmed">{t("guestList.confirmedStatus")}</option>
              <option value="pending">{t("guestList.pendingStatus")}</option>
              <option value="declined">{t("guestList.declinedStatus")}</option>
              <option value="maybe">{t("guestList.maybeStatus")}</option>
            </select>
          </div>

          {/* Guest List */}
          <div className="mt-4 space-y-2">
            <AnimatePresence>
              {filtered.map((guest) => {
                const StatusIcon = STATUS_ICONS[guest.status];
                return (
                  <motion.div
                    key={guest.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all group"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-200 to-rose-200 flex items-center justify-center text-sm font-bold text-primary-700 shrink-0">
                      {guest.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 text-sm truncate">{guest.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-slate-400 capitalize">{guest.group}</span>
                        {guest.table && (
                          <span className="text-[10px] text-slate-400">• {t("guestList.table")} {guest.table}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {(["confirmed", "pending", "declined"] as GuestStatus[]).map((status) => {
                        const IC = STATUS_ICONS[status];
                        return (
                          <button
                            key={status}
                            onClick={() => updateStatus(guest.id, status)}
                            className={cn(
                              "p-1.5 rounded-lg transition-all",
                              guest.status === status
                                ? STATUS_COLORS[status]
                                : "text-slate-300 hover:text-slate-500 hover:bg-slate-100"
                            )}
                            title={t(`guestList.${status}Status`)}
                          >
                            <IC className="h-3.5 w-3.5" />
                          </button>
                        );
                      })}
                      <button
                        onClick={() => removeGuest(guest.id)}
                        className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            {filtered.length === 0 && (
              <div className="text-center py-8 text-sm text-slate-400">
                {t("common.noResults")}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
}
