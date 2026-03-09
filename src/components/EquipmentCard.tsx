import { Equipment } from "@/data/equipment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
  available: "bg-green-600 text-green-50",
  rented: "bg-accent text-accent-foreground",
  maintenance: "bg-destructive text-destructive-foreground",
};

const EquipmentCard = ({ equipment }: { equipment: Equipment }) => {
  const { isLoggedIn, role } = useAuth();
  const navigate = useNavigate();

  const handleRent = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (role === "admin") {
      toast.info("Admins manage equipment, not rent.");
      return;
    }
    toast.success(`Booking request sent for ${equipment.name}!`);
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border equipment-card-hover">
      <div className="relative h-48 overflow-hidden">
        <img src={equipment.image} alt={equipment.name} className="w-full h-full object-cover" />
        <Badge className={`absolute top-3 right-3 ${statusColors[equipment.status]} border-0 font-heading text-xs tracking-wide`}>
          {equipment.status.toUpperCase()}
        </Badge>
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg text-card-foreground mb-1">{equipment.name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{equipment.description}</p>
        <p className="text-xs text-muted-foreground mb-4">{equipment.specs}</p>
        <div className="flex items-center justify-end">
          <Button
            size="sm"
            disabled={equipment.status !== "available"}
            onClick={handleRent}
            className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-heading tracking-wide"
          >
            Rent Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;
