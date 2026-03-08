import { useState } from "react";
import { equipmentData, bookingsData, Equipment, Booking } from "@/data/equipment";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, ClipboardList, PlusCircle, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const statusBadge: Record<string, string> = {
  available: "bg-green-600 text-green-50",
  rented: "bg-accent text-accent-foreground",
  maintenance: "bg-destructive text-destructive-foreground",
  pending: "bg-primary text-primary-foreground",
  confirmed: "bg-green-600 text-green-50",
  completed: "bg-construction-steel text-secondary-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
};

const AdminPage = () => {
  const { isLoggedIn, role } = useAuth();
  const [equipment, setEquipment] = useState<Equipment[]>(equipmentData);
  const [bookings] = useState<Booking[]>(bookingsData);
  const [search, setSearch] = useState("");

  if (!isLoggedIn || role !== "admin") return <Navigate to="/login" />;

  const filteredEquipment = equipment.filter(
    (e) => e.name.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setEquipment((prev) => prev.filter((e) => e.id !== id));
    toast.success("Equipment removed.");
  };

  const toggleStatus = (id: string) => {
    setEquipment((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e;
        const next = e.status === "available" ? "maintenance" : "available";
        return { ...e, status: next };
      })
    );
    toast.info("Status updated.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-secondary py-8">
        <div className="container mx-auto px-4">
          <div className="section-stripe">
            <h1 className="text-3xl font-heading text-secondary-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage equipment & bookings</p>
          </div>
        </div>
      </div>

      <section className="py-8 bg-background flex-1">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="equipment" className="w-full">
            <TabsList className="mb-6 bg-muted">
              <TabsTrigger value="equipment" className="font-heading tracking-wide data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Package className="h-4 w-4 mr-2" /> Equipment ({equipment.length})
              </TabsTrigger>
              <TabsTrigger value="bookings" className="font-heading tracking-wide data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <ClipboardList className="h-4 w-4 mr-2" /> Bookings ({bookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="equipment">
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Input
                  placeholder="Search equipment..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="max-w-sm"
                />
                <Button className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-heading tracking-wide" onClick={() => toast.info("Add equipment form coming soon!")}>
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Equipment
                </Button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead className="font-heading">Name</TableHead>
                      <TableHead className="font-heading">Category</TableHead>
                      <TableHead className="font-heading">Rate/Day</TableHead>
                      <TableHead className="font-heading">Status</TableHead>
                      <TableHead className="font-heading">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEquipment.map((eq) => (
                      <TableRow key={eq.id}>
                        <TableCell className="font-medium">{eq.name}</TableCell>
                        <TableCell>{eq.category}</TableCell>
                        <TableCell>₹{eq.dailyRate}</TableCell>
                        <TableCell>
                          <Badge className={`${statusBadge[eq.status]} border-0 font-heading text-xs`}>
                            {eq.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => toggleStatus(eq.id)} className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDelete(eq.id)} className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="bookings">
              <div className="overflow-x-auto rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead className="font-heading">Booking ID</TableHead>
                      <TableHead className="font-heading">Equipment</TableHead>
                      <TableHead className="font-heading">Client</TableHead>
                      <TableHead className="font-heading">Dates</TableHead>
                      <TableHead className="font-heading">Cost</TableHead>
                      <TableHead className="font-heading">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((b) => (
                      <TableRow key={b.id}>
                        <TableCell className="font-mono text-sm">{b.id}</TableCell>
                        <TableCell>{b.equipmentName}</TableCell>
                        <TableCell>{b.userName}</TableCell>
                        <TableCell className="text-sm">{b.startDate} → {b.endDate}</TableCell>
                        <TableCell>₹{b.totalCost.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={`${statusBadge[b.status]} border-0 font-heading text-xs`}>
                            {b.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AdminPage;
