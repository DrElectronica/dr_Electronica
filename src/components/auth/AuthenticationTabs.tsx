import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserAuthForm from "./UserAuthForm";
import AdminAuthForm from "./AdminAuthForm";

interface AuthenticationTabsProps {
  onUserAuth?: (data: { email: string; password: string }) => void;
  onAdminAuth?: (data: { email: string; password: string }) => void;
  defaultTab?: "user" | "admin";
}

const AuthenticationTabs = ({
  onUserAuth = () => {},
  onAdminAuth = () => {},
  defaultTab = "user",
}: AuthenticationTabsProps) => {
  return (
    <div className="flex items-center justify-center min-h-[600px] w-[480px] bg-background p-4">
      <Card className="w-full p-6">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="user">
            <UserAuthForm onSubmit={onUserAuth} />
          </TabsContent>

          <TabsContent value="admin">
            <AdminAuthForm onSubmit={onAdminAuth} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthenticationTabs;
