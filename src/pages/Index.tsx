import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Truck, Clock, Star } from "lucide-react";
import heroImg from "@/assets/hero-construction.jpg";
import { equipmentData } from "@/data/equipment";
import EquipmentCard from "@/components/EquipmentCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { label: "Equipment Units", value: "200+" },
  { label: "Projects Completed", value: "1,500+" },
  { label: "Happy Clients", value: "300+" },
  { label: "Years Experience", value: "15+" },
];

const features = [
  { icon: Shield, title: "Safety First", desc: "All equipment meets rigorous safety standards and is regularly inspected." },
  { icon: Truck, title: "On-Site Delivery", desc: "We deliver and pick up equipment directly to your construction site." },
  { icon: Clock, title: "24/7 Support", desc: "Round-the-clock technical support and emergency maintenance service." },
  { icon: Star, title: "Premium Fleet", desc: "Latest models from top manufacturers, well-maintained and reliable." },
];

const Index = () => {
  const featured = equipmentData.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] flex items-center">
        <img src={heroImg} alt="Construction site with heavy machinery" className="absolute inset-0 w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl animate-fade-in-up">
            <div className="section-stripe mb-6">
              <span className="text-primary font-heading tracking-widest text-sm">CONSTRUCTION EQUIPMENT RENTAL</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading text-secondary-foreground leading-tight mb-6">
              Power Your Projects With <span className="text-primary">Heavy Machinery</span>
            </h1>
            <p className="text-lg text-construction-concrete mb-8 font-body max-w-xl">
              JCB, Cranes, Trucks, Tractors & Trailers — rent top-quality construction equipment at competitive daily rates.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/equipment">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-heading tracking-wide text-base px-8">
                  Browse Equipment <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-heading tracking-wide text-base px-8">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-secondary py-8">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-3xl text-primary">{s.value}</p>
              <p className="text-muted-foreground text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="section-stripe mb-8">
            <h2 className="text-3xl font-heading text-foreground">Featured Equipment</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((eq) => (
              <EquipmentCard key={eq.id} equipment={eq} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/equipment">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-heading tracking-wide">
                View All Equipment <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="section-stripe mb-8">
            <h2 className="text-3xl font-heading text-foreground">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-card p-6 rounded-lg border border-border text-center">
                <f.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-heading text-lg text-card-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
