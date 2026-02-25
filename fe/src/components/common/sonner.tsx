import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  RiCheckboxCircleLine,
  RiInformationLine,
  RiErrorWarningLine,
  RiCloseCircleLine,
  RiLoaderLine,
} from "@remixicon/react";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="bottom-right"
      duration={2000}
      icons={{
        success: <RiCheckboxCircleLine className="size-4 text-primary" />,
        info: <RiInformationLine className="size-4 text-primary" />,
        warning: <RiErrorWarningLine className="size-4" />,
        error: <RiCloseCircleLine className="size-4 text-destructive" />,
        loading: <RiLoaderLine className="size-4 animate-spin text-primary" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--muted)",
          "--success-border": "var(--primary)",
          "--success-text": "var(--foreground)",
          "--error-bg": "var(--muted)",
          "--error-border": "var(--destructive)",
          "--error-text": "var(--foreground)",
          "--border-radius": "var(--radius-lg)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast border-2 shadow-lg font-sans bg-popover text-popover-foreground border-border rounded-xl",
          title: "font-medium text-sm",
          description: "text-muted-foreground text-xs",
          success: "border-primary/50",
          error: "border-destructive/50",
        },
      }}
      {...props}
    />
  );
};

export { Toaster }
