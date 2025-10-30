import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface ResultDisplayProps {
  text: string;
  isLoading: boolean;
}

export const ResultDisplay = ({ text, isLoading }: ResultDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Text copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy text");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 shadow-card animate-fade-in">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Processing your image with AI...</p>
        </div>
      </div>
    );
  }

  if (!text) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Extracted Text</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </Button>
      </div>
      <div className="bg-muted rounded-lg p-4 max-h-96 overflow-y-auto">
        <pre className="whitespace-pre-wrap font-mono text-sm text-foreground">
          {text}
        </pre>
      </div>
    </div>
  );
};
