import { useState } from "react";
import { MapPin, Settings, Camera, Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";

const steps = [
  { icon: MapPin, label: "Localisation" },
  { icon: Settings, label: "Caractéristiques" },
  { icon: Camera, label: "Photos" },
  { icon: Calendar, label: "Disponibilités" },
];

const ProposeSpace = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <Layout>
      <section className="py-12">
        <div className="container max-w-2xl">
          <h1 className="mb-2 text-3xl font-bold">Proposer un espace</h1>
          <p className="mb-10 text-muted-foreground">Remplissez les informations pour mettre votre espace en ligne</p>

          {/* Stepper */}
          <div className="mb-10 flex items-center justify-between">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              const done = i < currentStep;
              const active = i === currentStep;
              return (
                <div key={step.label} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full items-center">
                    {i > 0 && (
                      <div className={`h-0.5 flex-1 transition-colors ${done ? "bg-primary" : "bg-border"}`} />
                    )}
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border-2 transition-colors ${
                        done
                          ? "border-primary bg-primary text-primary-foreground"
                          : active
                          ? "border-primary bg-accent text-primary"
                          : "border-border bg-card text-muted-foreground"
                      }`}
                    >
                      {done ? <Check className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`h-0.5 flex-1 transition-colors ${done ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                  <span className={`text-xs font-medium ${active || done ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Form steps */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            {currentStep === 0 && (
              <div className="space-y-5">
                <div>
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" name="address" placeholder="12 rue de la Paix" className="mt-1.5 rounded-xl" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="city">Ville</Label>
                    <Input id="city" name="city" placeholder="Paris" className="mt-1.5 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="postal_code">Code postal</Label>
                    <Input id="postal_code" name="postal_code" placeholder="75001" className="mt-1.5 rounded-xl" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-5">
                <div>
                  <Label htmlFor="title">Nom de l'espace</Label>
                  <Input id="title" name="title" placeholder="Salle Lumière" className="mt-1.5 rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="type">Type d'espace</Label>
                  <Select name="type">
                    <SelectTrigger className="mt-1.5 rounded-xl">
                      <SelectValue placeholder="Choisir un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salle_reunion">Salle de réunion</SelectItem>
                      <SelectItem value="atelier">Atelier</SelectItem>
                      <SelectItem value="salle_evenementielle">Salle événementielle</SelectItem>
                      <SelectItem value="coworking">Coworking</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="salle_polyvalente">Salle polyvalente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="surface_m2">Surface (m²)</Label>
                    <Input id="surface_m2" name="surface_m2" type="number" placeholder="50" className="mt-1.5 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="capacity">Capacité</Label>
                    <Input id="capacity" name="capacity" type="number" placeholder="20" className="mt-1.5 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="price_per_hour">Prix/heure (€)</Label>
                    <Input id="price_per_hour" name="price_per_hour" type="number" placeholder="25" className="mt-1.5 rounded-xl" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" placeholder="Décrivez votre espace..." className="mt-1.5 rounded-xl" rows={4} />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">Ajoutez des photos de votre espace pour attirer plus de réservations.</p>
                <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-border py-16">
                  <div className="text-center">
                    <Camera className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
                    <p className="font-medium text-muted-foreground">Glissez vos photos ici</p>
                    <p className="text-sm text-muted-foreground/60">ou cliquez pour parcourir</p>
                    <Button variant="outline" className="mt-4 rounded-xl">
                      Choisir des fichiers
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-5">
                <p className="text-sm text-muted-foreground">Définissez vos créneaux de disponibilité.</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="available_from">Disponible à partir de</Label>
                    <Input id="available_from" name="available_from" type="date" className="mt-1.5 rounded-xl" />
                  </div>
                  <div>
                    <Label htmlFor="available_to">Jusqu'au</Label>
                    <Input id="available_to" name="available_to" type="date" className="mt-1.5 rounded-xl" />
                  </div>
                </div>
                <div className="rounded-2xl bg-accent p-4 text-center text-sm text-accent-foreground">
                  <Calendar className="mx-auto mb-2 h-8 w-8 text-primary" />
                  Un calendrier interactif sera bientôt disponible pour gérer vos disponibilités en détail.
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={prev}
                disabled={currentStep === 0}
                className="rounded-2xl"
              >
                Précédent
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button onClick={next} className="rounded-2xl px-8 font-semibold">
                  Suivant
                </Button>
              ) : (
                <Button className="rounded-2xl px-8 font-semibold">
                  Publier l'espace
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProposeSpace;
