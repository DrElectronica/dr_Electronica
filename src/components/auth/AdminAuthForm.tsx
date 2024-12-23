import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";

interface AdminAuthFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
}

const AdminAuthForm = ({
  onSubmit = () => {},
  isLoading = false,
}: AdminAuthFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      email: "admin@example.com",
      password: "password",
    });
  };

  return (
    <Card className="w-[440px] bg-background border-border">
      <CardHeader className="space-y-1 text-center">
        <h2 className="text-2xl font-semibold">Admin Login</h2>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access the admin dashboard
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                placeholder="admin@example.com"
                type="email"
                className="pl-10"
                defaultValue="admin@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                className="pl-10"
                defaultValue="password"
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          This portal is restricted to authorized administrators only
        </p>
      </CardFooter>
    </Card>
  );
};

export default AdminAuthForm;
