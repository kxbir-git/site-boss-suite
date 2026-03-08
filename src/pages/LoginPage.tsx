import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HardHat, ShieldCheck, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"admin" | "user">("user");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    const name = email.split("@")[0];
    login(selectedRole, name);
    toast.success(`Welcome, ${name}!`);
    navigate(selectedRole === "admin" ? "/admin" : "/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <HardHat className="h-12 w-12 text-primary mx-auto mb-3" />
            <h1 className="text-3xl font-heading text-foreground">Sign In</h1>
            <p className="text-muted-foreground mt-1">Access your equipment dashboard</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 shadow-lg">
            {/* Role selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setSelectedRole("user")}
                className={`flex items-center justify-center gap-2 py-3 rounded font-heading text-sm tracking-wide transition-colors border ${
                  selectedRole === "user"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border hover:border-primary"
                }`}
              >
                <User className="h-4 w-4" /> User
              </button>
              <button
                onClick={() => setSelectedRole("admin")}
                className={`flex items-center justify-center gap-2 py-3 rounded font-heading text-sm tracking-wide transition-colors border ${
                  selectedRole === "admin"
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border hover:border-primary"
                }`}
              >
                <ShieldCheck className="h-4 w-4" /> Admin
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-card-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-card-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-heading tracking-wide text-base">
                Sign In as {selectedRole === "admin" ? "Admin" : "User"}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Demo: Use any email/password to sign in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
