import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, File, X } from "lucide-react";

interface UploadedFile {
  name: string;
  size: string;
  progress: number;
}

interface ContentUploadFormProps {
  onUpload?: (files: File[]) => void;
  isUploading?: boolean;
  uploadedFiles?: UploadedFile[];
}

const ContentUploadForm = ({
  onUpload = () => {},
  isUploading = false,
  uploadedFiles = [
    { name: "example.pdf", size: "2.5 MB", progress: 75 },
    { name: "lecture.pdf", size: "1.8 MB", progress: 100 },
  ],
}: ContentUploadFormProps) => {
  const [dragActive, setDragActive] = React.useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  return (
    <Card className="w-full max-w-[800px] p-6 bg-background border-2">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Upload Educational Content</h2>
          <p className="text-muted-foreground">
            Add new materials for students
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive ? "border-primary bg-primary/10" : "border-border"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrag}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Drag and drop your files</h3>
            <p className="text-sm text-muted-foreground">
              or click to browse from your computer
            </p>
          </div>
          <Input
            type="file"
            className="hidden"
            multiple
            accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.png"
          />
          <Button variant="secondary" className="mt-4">
            Select Files
          </Button>
        </div>

        {/* File List */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Uploaded Files</h3>
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <File className="w-6 h-6 text-muted-foreground" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{file.size}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 w-1/3">
                <Progress value={file.progress} className="flex-1" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Content Title</Label>
            <Input
              id="title"
              placeholder="Enter a title for this content"
              defaultValue="Introduction to Digital Electronics"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Provide a brief description"
              defaultValue="Basic concepts and fundamentals of digital electronics"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline">Cancel</Button>
          <Button disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload Content"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ContentUploadForm;
