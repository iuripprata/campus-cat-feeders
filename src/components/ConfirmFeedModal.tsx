import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

interface ConfirmFeedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feederName: string;
}

export function ConfirmFeedModal({ open, onOpenChange, feederName }: ConfirmFeedModalProps) {
  const handleConfirm = () => {
    // Simulate API call
    toast({
      title: 'Alimento Liberado!',
      description: `Alimento foi liberado em ${feederName}. Os gatos estão felizes! 🐱`,
    });
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">Confirmar Liberação de Alimento</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Confirmar liberação de alimento em <span className="font-semibold text-foreground">{feederName}</span>? 
            Esta ação é imediata.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="px-6">Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6"
          >
            Sim, Liberar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
