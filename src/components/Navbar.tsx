import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X, HardHat, LogOut } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { isLoggedIn, role, userName, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-secondary border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <HardHat className="h-8 w-8 text-primary" />
          <span className="font-heading text-xl text-secondary-foreground tracking-wider">
            EquipRent<span className="text-primary">PRO</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-secondary-foreground hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <Link to="/equipment" className="text-secondary-foreground hover:text-primary transition-colors font-medium">
            Equipment
          </Link>
          {isLoggedIn && role === "admin" && (
            <Link to="/admin" className="text-secondary-foreground hover:text-primary transition-colors font-medium">
              Admin Panel
            </Link>
          )}
          {isLoggedIn && role === "user" && (
            <Link to="/dashboard" className="text-secondary-foreground hover:text-primary transition-colors font-medium">
              My Bookings
            </Link>
          )}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-sm">Hi, {userName}</span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-heading tracking-wide">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-secondary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-secondary border-t border-border px-4 pb-4 space-y-3">
          <Link to="/" className="block text-secondary-foreground py-2" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/equipment" className="block text-secondary-foreground py-2" onClick={() => setMobileOpen(false)}>Equipment</Link>
          {isLoggedIn && role === "admin" && (
            <Link to="/admin" className="block text-secondary-foreground py-2" onClick={() => setMobileOpen(false)}>Admin Panel</Link>
          )}
          {isLoggedIn && role === "user" && (
            <Link to="/dashboard" className="block text-secondary-foreground py-2" onClick={() => setMobileOpen(false)}>My Bookings</Link>
          )}
          {isLoggedIn ? (
            <Button variant="outline" size="sm" onClick={() => { handleLogout(); setMobileOpen(false); }} className="border-primary text-primary w-full">
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="bg-primary text-primary-foreground w-full font-heading">Login</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
