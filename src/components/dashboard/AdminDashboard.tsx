import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LayoutDashboard,
  Upload,
  FileText,
  Settings,
  LogOut,
  Grid,
} from "lucide-react";
import ContentUploadForm from "./ContentUploadForm";
import ResourceManager from "./ResourceManager";
import ServiceManager from "./ServiceManager";
import ProductManager from "./ProductManager";

interface AdminDashboardProps {
  userName?: string;
  onLogout?: () => void;
}

const AdminDashboard = ({
  userName = "Admin",
  onLogout = () => {},
}: AdminDashboardProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 border-r bg-card p-4">
        <div className="flex flex-col h-full">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold px-4">Admin Portal</h2>
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                size="lg"
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                size="lg"
              >
                <Grid className="h-5 w-5" />
                Products
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                size="lg"
              >
                <Upload className="h-5 w-5" />
                Upload Content
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                size="lg"
              >
                <FileText className="h-5 w-5" />
                Resources
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                size="lg"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </div>
          </div>
          <div className="mt-auto space-y-4">
            <div className="px-4 py-2 border rounded-lg">
              <p className="text-sm text-muted-foreground">Logged in as</p>
              <p className="font-medium">{userName}</p>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-100"
              size="lg"
              onClick={onLogout}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <Card className="p-6">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="upload">Upload Content</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="manage">Manage Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <ProductManager />
            </TabsContent>

            <TabsContent value="services">
              <ServiceManager />
            </TabsContent>

            <TabsContent value="upload">
              <div className="flex justify-center">
                <ContentUploadForm />
              </div>
            </TabsContent>

            <TabsContent value="manage">
              <ResourceManager />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
