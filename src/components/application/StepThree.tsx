import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ApplicationData } from "@/pages/Application";
import { ArrowRight, ArrowLeft, Plus, X, Upload, Link as LinkIcon, FileVideo } from "lucide-react";
import { useRef, useState } from "react";

interface StepThreeProps {
  data: ApplicationData;
  updateData: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepThree = ({ data, updateData, onNext, onBack }: StepThreeProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const addLink = () => {
    updateData({ portfolioLinks: [...data.portfolioLinks, ""] });
  };

  const removeLink = (index: number) => {
    const newLinks = data.portfolioLinks.filter((_, i) => i !== index);
    updateData({ portfolioLinks: newLinks.length > 0 ? newLinks : [""] });
  };

  const updateLink = (index: number, value: string) => {
    const newLinks = [...data.portfolioLinks];
    newLinks[index] = value;
    updateData({ portfolioLinks: newLinks });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    updateData({ uploadedFiles: [...data.uploadedFiles, ...files] });
  };

  const removeFile = (index: number) => {
    const newFiles = data.uploadedFiles.filter((_, i) => i !== index);
    updateData({ uploadedFiles: newFiles });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    updateData({ uploadedFiles: [...data.uploadedFiles, ...files] });
  };

  const hasContent = data.portfolioLinks.some((link) => link.trim()) || data.uploadedFiles.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="mb-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Show us your work
        </h2>
        <p className="text-muted-foreground text-lg">
          Links to your best projects or upload files directly.
        </p>
      </div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-muted rounded-xl p-5 mb-8 border-2 border-border"
      >
        <p className="text-muted-foreground text-sm">
          ⚡ Many animation accounts need content – we're actively looking for talent!
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Portfolio Links */}
        <div>
          <label className="block text-sm font-medium mb-3 flex items-center gap-2">
            <LinkIcon className="w-4 h-4" />
            Portfolio Links
          </label>
          <div className="space-y-3">
            {data.portfolioLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-2"
              >
                <Input
                  placeholder="https://youtube.com/watch?v=... or Instagram link"
                  value={link}
                  onChange={(e) => updateLink(index, e.target.value)}
                />
                {data.portfolioLinks.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLink(index)}
                    className="shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={addLink}
            className="mt-3"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add another link
          </Button>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium mb-3 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Upload Files
          </label>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? "border-foreground bg-muted"
                : "border-border hover:border-foreground/50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="video/*,image/*,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <FileVideo className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
            <p className="font-medium">
              Drag files here or click to browse
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Videos, images, or PDFs
            </p>
          </div>

          {/* Uploaded Files */}
          {data.uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              {data.uploadedFiles.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileVideo className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium truncate max-w-[200px]">
                      {file.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 flex gap-4">
        <Button variant="outline" size="lg" onClick={onBack} className="flex-1">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        <Button
          variant="hero"
          size="xl"
          className="flex-[2]"
          onClick={onNext}
          disabled={!hasContent}
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default StepThree;