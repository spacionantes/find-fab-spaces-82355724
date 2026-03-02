import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for recovery token in URL hash
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setReady(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Mot de passe mis à jour", description: "Vous pouvez maintenant vous connecter." });
      navigate("/connexion");
    }
  };

  return (
    <Layout>
      <section className="container flex min-h-[60vh] items-center justify-center py-12">
        <Card className="w-full max-w-md rounded-2xl">
          <CardContent className="space-y-6 p-8">
            <div className="text-center">
              <h1 className="text-2xl font-extrabold">Nouveau mot de passe</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {ready ? "Choisissez un nouveau mot de passe." : "Lien invalide ou expiré. Demandez un nouveau lien depuis la page de connexion."}
              </p>
            </div>
            {ready && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input type="password" placeholder="Nouveau mot de passe (min. 6 caractères)" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required minLength={6} />
                </div>
                <Button type="submit" className="w-full rounded-2xl" disabled={loading}>
                  {loading ? "Mise à jour…" : "Mettre à jour"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
};

export default ResetPassword;
