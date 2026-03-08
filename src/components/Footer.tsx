import { HardHat, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <HardHat className="h-7 w-7 text-primary" />
            <span className="font-heading text-lg tracking-wider">
              EquipRent<span className="text-primary">PRO</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your trusted partner for construction equipment rental. Quality machinery for every project.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-primary mb-4 text-lg">Quick Links</h4>
          <div className="space-y-2">
            <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link>
            <Link to="/equipment" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Equipment</Link>
            <Link to="/login" className="block text-muted-foreground hover:text-primary transition-colors text-sm">Login</Link>
          </div>
        </div>
        <div>
          <h4 className="font-heading text-primary mb-4 text-lg">Contact</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +91 98765 43210</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> info@equiprentpro.com</p>
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Mumbai, Maharashtra, India</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
        © 2026 EquipRentPRO. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
