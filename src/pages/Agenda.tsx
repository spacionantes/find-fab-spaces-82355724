import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin, CalendarDays, Search, Inbox, CheckCircle2, XCircle, Loader2, ClipboardList } from "lucide-react";
import { format, isSameDay, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  space_title: string | null;
  city: string;
  desired_date: string | null;
  desired_start_time: string | null;
  desired_end_time: string | null;
  statut: string | null;
}

const statusConfig: Record<string, { label: string; color: string; dot: string; icon: React.ElementType }> = {
  nouveau: { label: "En attente", color: "bg-muted text-muted-foreground", dot: "bg-muted-foreground", icon: ClipboardList },
  valide: { label: "Validée", color: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", icon: CheckCircle2 },
  refuse: { label: "Refusée", color: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500", icon: XCircle },
  en_cours: { label: "En cours", color: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500", icon: Loader2 },
};
const getStatus = (s: string | null) => statusConfig[s || "nouveau"] || statusConfig.nouveau;

const Agenda = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Date>(new Date());

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth", { replace: true });
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    supabase
      .from("leads")
      .select("id, space_title, city, desired_date, desired_start_time, desired_end_time, statut")
      .eq("user_id", user.id)
      .not("desired_date", "is", null)
      .order("desired_date", { ascending: true })
      .then(({ data }) => {
        setLeads((data as Lead[]) || []);
        setLoading(false);
      });
  }, [user?.id]);

  const reservedDays = useMemo(
    () => leads.map((l) => parseISO(l.desired_date!)).filter((d) => !isNaN(d.getTime())),
    [leads]
  );

  const dayLeads = useMemo(
    () =>
      leads
        .filter((l) => l.desired_date && isSameDay(parseISO(l.desired_date), selected))
        .sort((a, b) => (a.desired_start_time || "").localeCompare(b.desired_start_time || "")),
    [leads, selected]
  );

  const upcoming = useMemo(
    () =>
      leads
        .filter((l) => l.desired_date && parseISO(l.desired_date) >= new Date(new Date().setHours(0, 0, 0, 0)))
        .slice(0, 5),
    [leads]
  );

  if (authLoading || !user) {
    return (
      <div className="mx-auto max-w-5xl space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-80 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mon agenda</h1>
          <p className="text-sm text-muted-foreground">
            Visualisez vos créneaux de réservation par date
          </p>
        </div>
        <Button asChild className="rounded-2xl">
          <Link to="/explorer">
            <Search className="mr-2 h-4 w-4" /> Nouvelle demande
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[auto,1fr]">
        {/* Calendar */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          {loading ? (
            <Skeleton className="h-[340px] w-[280px]" />
          ) : (
            <Calendar
              mode="single"
              locale={fr}
              selected={selected}
              onSelect={(d) => d && setSelected(d)}
              modifiers={{ reserved: reservedDays }}
              modifiersClassNames={{
                reserved:
                  "relative font-semibold text-primary after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-1 after:rounded-full after:bg-primary",
              }}
              className={cn("p-3 pointer-events-auto")}
            />
          )}
          <div className="mt-3 flex items-center gap-2 border-t border-border pt-3 text-xs text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            Date avec réservation
          </div>
        </div>

        {/* Day slots */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold capitalize">
              {format(selected, "EEEE d MMMM yyyy", { locale: fr })}
            </h2>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)}
            </div>
          ) : dayLeads.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-card py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                <Inbox className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium">Aucun créneau ce jour</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Sélectionnez une date marquée d&apos;un point pour voir les détails
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {dayLeads.map((lead, idx) => {
                const status = getStatus(lead.statut);
                const StatusIcon = status.icon;
                return (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col items-center justify-center rounded-xl bg-primary/10 px-4 py-3 text-primary min-w-[88px]">
                      <Clock className="h-4 w-4 mb-1" />
                      <span className="text-sm font-bold">
                        {lead.desired_start_time?.slice(0, 5) || "--:--"}
                      </span>
                      {lead.desired_end_time && (
                        <span className="text-xs opacity-70">
                          {lead.desired_end_time.slice(0, 5)}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold">{lead.space_title || "Demande générale"}</h3>
                      <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {lead.city}
                      </p>
                      <Badge className={`mt-2 rounded-xl ${status.color}`} variant="outline">
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {status.label}
                      </Badge>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Upcoming */}
          {!loading && upcoming.length > 0 && (
            <div className="pt-4">
              <h3 className="mb-3 text-sm font-semibold text-muted-foreground">Prochains créneaux</h3>
              <div className="space-y-2">
                {upcoming.map((lead) => {
                  const status = getStatus(lead.statut);
                  const date = parseISO(lead.desired_date!);
                  return (
                    <button
                      key={lead.id}
                      onClick={() => setSelected(date)}
                      className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left text-sm hover:border-primary/30 hover:bg-accent/30 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`h-2 w-2 rounded-full ${status.dot}`} />
                        <span className="font-medium truncate">{lead.space_title || "Demande"}</span>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {format(date, "d MMM", { locale: fr })}
                        {lead.desired_start_time && ` · ${lead.desired_start_time.slice(0, 5)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agenda;
