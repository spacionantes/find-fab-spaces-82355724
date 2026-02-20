import { useState } from "react";
import { Search, Building2, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";

type UserType = "seeker" | "owner" | null;

interface LeadData {
  user_type: UserType;
  organization_name: string;
  activity_type: string;
  space_type: string;
  city: string;
  email: string;
  phone: string;
}

const initialData: LeadData = {
  user_type: null,
  organization_name: "",
  activity_type: "",
  space_type: "",
  city: "",
  email: "",
  phone: "",
};

const activityTypes = [
  { value: "reunion", label: "Réunion" },
  { value: "atelier", label: "Atelier" },
  { value: "evenement", label: "Événement" },
  { value: "sport", label: "Sport" },
  { value: "autre", label: "Autre" },
];

const spaceTypes = [
  { value: "salle-reunion", label: "Salle de réunion" },
  { value: "atelier", label: "Atelier" },
  { value: "salle-evenementielle", label: "Salle événementielle" },
  { value: "coworking", label: "Coworking" },
  { value: "studio", label: "Studio" },
  { value: "autre", label: "Autre" },
];

const GetStarted = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<LeadData>(initialData);

  const update = (field: keyof LeadData, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const canSubmitStep2 = () => {
    if (data.user_type === "seeker") {
      return data.organization_name && data.activity_type && data.city;
    }
    return data.organization_name && data.space_type && data.city;
  };

  const canSubmitStep3 = () => !!data.email;

  const handleSubmit = () => {
    // Ready for Supabase insertion
    console.log("Lead submitted:", data);
    setStep(4);
  };

  const stepIndicator = (
    <div className="mb-8 flex items-center justify-center gap-2">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`h-2.5 rounded-full transition-all ${
            s === step ? "w-8 bg-primary" : s < step ? "w-2.5 bg-primary/40" : "w-2.5 bg-muted"
          }`}
        />
      ))}
    </div>
  );

  return (
    <Layout>
      <section className="flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-lg px-4">
          <AnimatePresence mode="wait">
            {/* Step 1 – Profile */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
                {stepIndicator}
                <h1 className="mb-2 text-center text-2xl font-bold">Vous êtes…</h1>
                <p className="mb-8 text-center text-sm text-muted-foreground">Sélectionnez votre profil pour commencer</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { type: "seeker" as const, icon: Search, title: "Je cherche un espace", desc: "Association ou organisme" },
                    { type: "owner" as const, icon: Building2, title: "Je propose un espace", desc: "Propriétaire ou gestionnaire" },
                  ].map(({ type, icon: Icon, title, desc }) => (
                    <button
                      key={type}
                      onClick={() => { update("user_type", type); setStep(2); }}
                      className={`group flex flex-col items-center gap-3 rounded-2xl border-2 border-border bg-card p-6 text-center shadow-sm transition-all hover:border-primary hover:shadow-md`}
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="font-semibold">{title}</span>
                      <span className="text-xs text-muted-foreground">{desc}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2 – Details */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
                {stepIndicator}
                <Card className="rounded-2xl shadow-sm">
                  <CardContent className="space-y-4 p-6">
                    <h2 className="text-lg font-bold">
                      {data.user_type === "seeker" ? "Votre association" : "Votre espace"}
                    </h2>

                    <div className="space-y-1.5">
                      <Label>{data.user_type === "seeker" ? "Nom de l'association" : "Nom / Société"}</Label>
                      <Input
                        value={data.organization_name}
                        onChange={(e) => update("organization_name", e.target.value)}
                        placeholder={data.user_type === "seeker" ? "Ex : Les Amis du Quartier" : "Ex : SCI Martin"}
                      />
                    </div>

                    {data.user_type === "seeker" ? (
                      <div className="space-y-1.5">
                        <Label>Type d'activité</Label>
                        <Select value={data.activity_type} onValueChange={(v) => update("activity_type", v)}>
                          <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                          <SelectContent>
                            {activityTypes.map((t) => (
                              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <Label>Type d'espace</Label>
                        <Select value={data.space_type} onValueChange={(v) => update("space_type", v)}>
                          <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                          <SelectContent>
                            {spaceTypes.map((t) => (
                              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <Label>Ville</Label>
                      <Input value={data.city} onChange={(e) => update("city", e.target.value)} placeholder="Ex : Lyon" />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" className="rounded-2xl" onClick={() => setStep(1)}>
                        <ArrowLeft className="mr-1 h-4 w-4" /> Retour
                      </Button>
                      <Button className="flex-1 rounded-2xl font-semibold" disabled={!canSubmitStep2()} onClick={() => setStep(3)}>
                        Continuer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 3 – Contact */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
                {stepIndicator}
                <Card className="rounded-2xl shadow-sm">
                  <CardContent className="space-y-4 p-6">
                    <h2 className="text-lg font-bold">Vos coordonnées</h2>

                    <div className="space-y-1.5">
                      <Label>Email *</Label>
                      <Input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="vous@exemple.com" />
                    </div>

                    <div className="space-y-1.5">
                      <Label>Téléphone <span className="text-muted-foreground">(optionnel)</span></Label>
                      <Input type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="06 00 00 00 00" />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button variant="outline" className="rounded-2xl" onClick={() => setStep(2)}>
                        <ArrowLeft className="mr-1 h-4 w-4" /> Retour
                      </Button>
                      <Button className="flex-1 rounded-2xl font-semibold" disabled={!canSubmitStep3()} onClick={handleSubmit}>
                        Envoyer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 4 – Confirmation */}
            {step === 4 && (
              <motion.div key="s4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-10 w-10 text-primary" />
                </div>
                <h2 className="mb-2 text-2xl font-bold">Merci !</h2>
                <p className="text-muted-foreground">Nous avons bien reçu votre demande.<br />Nous vous recontacterons sous 24h.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default GetStarted;
