import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UploadZone } from "@/components/UploadZone";
import { ResultDisplay } from "@/components/ResultDisplay";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelect = (file: File) => {
    setSelectedFile(file);
    setExtractedText("");
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleProcess = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first");
      return;
    }

    setIsProcessing(true);
    setExtractedText("");

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        
        const { data, error } = await supabase.functions.invoke("recognize-handwriting", {
          body: { image: base64Image },
        });

        if (error) {
          console.error("Error:", error);
          toast.error("Failed to process image. Please try again.");
          setIsProcessing(false);
          return;
        }

        if (data?.text) {
          setExtractedText(data.text);
          toast.success("Text extracted successfully!");
        } else {
          toast.error("No text found in the image");
        }

        setIsProcessing(false);
      };
      reader.readAsDataURL(selectedFile);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while processing");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Recognition</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Handwriting Recognition
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your handwritten notes and let AI decode them instantly
          </p>
        </div>

        {/* Upload Zone */}
        <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <UploadZone onImageSelect={handleImageSelect} previewUrl={previewUrl} />
        </div>

        {/* Process Button */}
        {selectedFile && (
          <div className="flex justify-center mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button
              onClick={handleProcess}
              disabled={isProcessing}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-soft"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Decode Text
                </>
              )}
            </Button>
          </div>
        )}

        {/* Results */}
        <ResultDisplay text={extractedText} isLoading={isProcessing} />

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <p>Powered by Handwriting Recognition Framework for Academic Integrity 
Using BiLSTM and Capsule Networks</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
