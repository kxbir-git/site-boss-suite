import { bookingsData } from "@/data/equipment";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const statusBadge: Record<string, string> = {
  pending: "bg-primary text-primary-foreground",
  confirmed: "bg-green-600 text-green-50",
  completed: "bg-construction-steel text-secondary-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
};

const UserDashboard = () => {
  const { isLoggedIn, role, userName } = useAuth();

  if (!isLoggedIn || role !== "user") return <Navigate to="/login" />;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="section-stripe">
            <h1 className="text-3xl font-heading text-secondary-foreground">My Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {userName}</p>
          </div>
        </div>
      </div>

      <section className="py-8 bg-background flex-1">
        <div className="container mx-auto px-4">
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { label: "Total Bookings", value: bookingsData.length },
              { label: "Active Rentals", value: bookingsData.filter((b) => b.status === "confirmed").length },
            ].map((s) => (
              <div key={s.label} className="bg-card border border-border rounded-lg p-5 text-center">
                <p className="text-muted-foreground text-sm">{s.label}</p>
                <p className="font-heading text-2xl text-primary mt-1">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default UserDashboard;
