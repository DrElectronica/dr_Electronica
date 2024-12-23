import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileText, Pencil, Trash2, Download, Search } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  type: string;
  dateUploaded: string;
  size: string;
}

interface ResourceManagerProps {
  resources?: Resource[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDownload?: (id: string) => void;
}

const defaultResources: Resource[] = [
  {
    id: "1",
    title: "Digital Logic Gates Introduction",
    type: "PDF",
    dateUploaded: "2024-01-15",
    size: "2.5 MB",
  },
  {
    id: "2",
    title: "Boolean Algebra Basics",
    type: "PDF",
    dateUploaded: "2024-01-14",
    size: "1.8 MB",
  },
  {
    id: "3",
    title: "Circuit Simulation Demo",
    type: "Video",
    dateUploaded: "2024-01-13",
    size: "45 MB",
  },
];

const ResourceManager = ({
  resources = defaultResources,
  onDelete = () => {},
  onEdit = () => {},
  onDownload = () => {},
}: ResourceManagerProps) => {
  return (
    <div className="w-full h-full min-h-[700px] bg-background p-6">
      <Card className="h-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Resource Management</h2>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search resources..."
                  className="pl-10 w-[300px]"
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add New Resource</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Resource</DialogTitle>
                  </DialogHeader>
                  <div className="p-4">
                    <Input placeholder="Resource Title" className="mb-4" />
                    <Input type="file" className="mb-4" />
                    <Button className="w-full">Upload Resource</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date Uploaded</TableHead>
                <TableHead>Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      {resource.title}
                    </div>
                  </TableCell>
                  <TableCell>{resource.type}</TableCell>
                  <TableCell>{resource.dateUploaded}</TableCell>
                  <TableCell>{resource.size}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDownload(resource.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(resource.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(resource.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default ResourceManager;
