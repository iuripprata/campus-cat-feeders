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
      title: 'Food Released!',
      description: `Food has been released at ${feederName}. The cats are happy! 🐱`,
    });
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">Confirm Food Release</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Confirm release of food at <span className="font-semibold text-foreground">{feederName}</span>? 
            This action is immediate.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="px-6">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-6"
          >
            Yes, Release
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
