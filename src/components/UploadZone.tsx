import { useCallback } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface UploadZoneProps {
  onImageSelect: (file: File) => void;
  previewUrl: string | null;
}

export const UploadZone = ({ onImageSelect, previewUrl }: UploadZoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onImageSelect(acceptedFiles[0]);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative border-2 border-dashed rounded-xl p-12 transition-all duration-300 cursor-pointer ${
        isDragActive
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border hover:border-primary/50 hover:bg-muted/50"
      }`}
    >
      <input {...getInputProps()} />
      
      {previewUrl ? (
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden shadow-card">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-contain bg-muted"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Click or drag to replace image
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            {isDragActive ? (
              <ImageIcon className="w-10 h-10 text-primary animate-scale-in" />
            ) : (
              <Upload className="w-10 h-10 text-primary" />
            )}
          </div>
          <div>
            <p className="text-lg font-medium text-foreground">
              {isDragActive ? "Drop your image here" : "Upload handwritten text image"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Drag & drop or click to browse (PNG, JPG, JPEG, WEBP)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
