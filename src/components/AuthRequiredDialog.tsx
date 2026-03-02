import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AuthRequiredDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  returnTo?: string;
}

const AuthRequiredDialog = ({ open, onOpenChange, returnTo }: AuthRequiredDialogProps) => {
  const navigate = useNavigate();
  const params = returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader className="space-y-2 text-center">
          <DialogTitle className="text-xl">Connexion requise</DialogTitle>
          <DialogDescription>
            Connectez-vous ou créez un compte pour continuer.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-3">
          <Button
            className="w-full rounded-2xl"
            onClick={() => { onOpenChange(false); navigate(`/connexion${params}`); }}
          >
            <LogIn className="mr-2 h-4 w-4" /> Se connecter
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-2xl"
            onClick={() => { onOpenChange(false); navigate(`/inscription${params}`); }}
          >
            <UserPlus className="mr-2 h-4 w-4" /> Créer un compte
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthRequiredDialog;
