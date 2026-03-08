import jcbImg from "@/assets/jcb.jpg";
import craneImg from "@/assets/crane.jpg";
import truckImg from "@/assets/truck.jpg";
import tractorImg from "@/assets/tractor.jpg";
import trailerImg from "@/assets/trailer.jpg";

export interface Equipment {
  id: string;
  name: string;
  category: string;
  image: string;
  dailyRate: number;
  status: "available" | "rented" | "maintenance";
  description: string;
  specs: string;
}

export const equipmentData: Equipment[] = [
  {
    id: "1",
    name: "JCB 3CX Backhoe Loader",
    category: "JCB",
    image: jcbImg,
    dailyRate: 250,
    status: "available",
    description: "Versatile backhoe loader ideal for excavation, trenching, and material handling on construction sites.",
    specs: "Engine: 74 kW | Max Dig Depth: 5.46m | Bucket Capacity: 1.0m³",
  },
  {
    id: "2",
    name: "Tower Crane TC-5500",
    category: "Crane",
    image: craneImg,
    dailyRate: 800,
    status: "available",
    description: "Heavy-duty tower crane for high-rise construction with exceptional lifting capacity.",
    specs: "Max Load: 12 Tons | Boom Length: 60m | Height: 80m",
  },
  {
    id: "3",
    name: "CAT 773G Dump Truck",
    category: "Truck",
    image: truckImg,
    dailyRate: 450,
    status: "rented",
    description: "Off-highway dump truck designed for high-production mining and heavy construction.",
    specs: "Payload: 55.3 Tons | Engine: 537 kW | Speed: 64 km/h",
  },
  {
    id: "4",
    name: "CAT 950M Wheel Loader",
    category: "Tractor",
    image: tractorImg,
    dailyRate: 350,
    status: "available",
    description: "High-performance wheel loader for material handling and site preparation.",
    specs: "Engine: 153 kW | Bucket Capacity: 3.3m³ | Operating Weight: 18.3T",
  },
  {
    id: "5",
    name: "Lowboy Trailer 60T",
    category: "Trailer",
    image: trailerImg,
    dailyRate: 180,
    status: "maintenance",
    description: "Heavy-duty lowboy trailer for transporting oversized construction equipment.",
    specs: "Capacity: 60 Tons | Length: 14m | Axles: 3",
  },
  {
    id: "6",
    name: "JCB JS220 Excavator",
    category: "JCB",
    image: jcbImg,
    dailyRate: 380,
    status: "available",
    description: "Powerful tracked excavator for heavy earthmoving and demolition work.",
    specs: "Engine: 129 kW | Operating Weight: 22.5T | Max Dig Depth: 6.7m",
  },
];

export interface Booking {
  id: string;
  equipmentId: string;
  equipmentName: string;
  userName: string;
  startDate: string;
  endDate: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  totalCost: number;
}

export const bookingsData: Booking[] = [
  { id: "B001", equipmentId: "3", equipmentName: "CAT 773G Dump Truck", userName: "Raj Construction Ltd", startDate: "2026-03-01", endDate: "2026-03-15", status: "confirmed", totalCost: 6750 },
  { id: "B002", equipmentId: "1", equipmentName: "JCB 3CX Backhoe Loader", userName: "Metro Builders", startDate: "2026-03-10", endDate: "2026-03-20", status: "pending", totalCost: 2500 },
  { id: "B003", equipmentId: "2", equipmentName: "Tower Crane TC-5500", userName: "Skyline Projects", startDate: "2026-02-15", endDate: "2026-03-05", status: "completed", totalCost: 14400 },
];
