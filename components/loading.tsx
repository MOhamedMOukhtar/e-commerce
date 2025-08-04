import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white dark:bg-black">
      <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
    </div>
  );
}
