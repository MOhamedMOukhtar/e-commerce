import { cn } from "@/lib/utils";

function CustomButton({
  children,
  className,
  onClick,
  loading,
}: {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
}) {
  return (
    <button
      className={cn(
        `focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border-3 border-black text-sm font-medium whitespace-nowrap shadow-xs transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5`,
        className,
      )}
      onClick={onClick}
    >
      {loading ? (
        <span className="animate-bull-bounce h-2 w-2 rounded-full bg-white" />
      ) : (
        children
      )}
    </button>
  );
}

export default CustomButton;
