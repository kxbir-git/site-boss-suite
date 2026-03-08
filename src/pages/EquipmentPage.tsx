import { useState } from "react";
import { equipmentData } from "@/data/equipment";
import EquipmentCard from "@/components/EquipmentCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "JCB", "Crane", "Truck", "Tractor", "Trailer"];

const EquipmentPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? equipmentData
    : equipmentData.filter((e) => e.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-secondary py-10">
        <div className="container mx-auto px-4">
          <div className="section-stripe">
            <h1 className="text-3xl md:text-4xl font-heading text-secondary-foreground">Our Equipment Fleet</h1>
            <p className="text-muted-foreground mt-2">Browse our full range of construction machinery available for rent.</p>
          </div>
        </div>
      </div>

      <section className="py-10 bg-background flex-1">
        <div className="container mx-auto px-4">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded font-heading text-sm tracking-wide transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/20 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((eq) => (
              <EquipmentCard key={eq.id} equipment={eq} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No equipment found in this category.</p>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EquipmentPage;
