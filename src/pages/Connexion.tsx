import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, resetPassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      navigate(returnTo);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      toast({ title: "Email requis", description: "Entrez votre email pour réinitialiser votre mot de passe.", variant: "destructive" });
      return;
    }
    const { error } = await resetPassword(email);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Email envoyé", description: "Vérifiez votre boîte mail pour réinitialiser votre mot de passe." });
    }
  };

  return (
    <Layout>
      <section className="container flex min-h-[60vh] items-center justify-center py-12">
        <Card className="w-full max-w-md rounded-2xl">
          <CardContent className="space-y-6 p-8">
            <div className="text-center">
              <h1 className="text-2xl font-extrabold">Connexion</h1>
              <p className="mt-1 text-sm text-muted-foreground">Accédez à votre espace Spacio</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required />
              </div>
              <Button type="submit" className="w-full rounded-2xl" disabled={loading}>
                {loading ? "Connexion…" : "Se connecter"}
              </Button>
            </form>
            <div className="flex flex-col items-center gap-2 text-sm">
              <button onClick={handleForgotPassword} className="text-primary hover:underline" type="button">
                Mot de passe oublié ?
              </button>
              <p className="text-muted-foreground">
                Pas encore de compte ?{" "}
                <Link to={`/inscription${returnTo !== "/" ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`} className="font-medium text-primary hover:underline">
                  S'inscrire
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
};

export default Connexion;
