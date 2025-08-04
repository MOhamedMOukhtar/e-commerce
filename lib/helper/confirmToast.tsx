import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function showConfirmToast(onConfirm: () => void) {
  toast.custom((t) => (
    <div className="w-96 space-y-4 rounded-md border-3 border-gray-200/80 bg-white p-4 shadow-md dark:bg-neutral-900">
      <p className="text-sm font-medium">
        Are you sure you want to delete this category?
      </p>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={() => toast.dismiss(t)}>
          Cancel
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            toast.dismiss(t);
            onConfirm();
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  ));
}
