import { createContext, useContext, useState, ReactNode } from "react";
import { Equipment, bookingsData, Booking } from "@/data/equipment";

interface BookingsContextType {
  bookings: Booking[];
  addBooking: (equipment: Equipment, userName: string) => void;
}

const BookingsContext = createContext<BookingsContextType>({
  bookings: [],
  addBooking: () => {},
});

export const useBookings = () => useContext(BookingsContext);

export const BookingsProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>(bookingsData);

  const addBooking = (equipment: Equipment, userName: string) => {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 7);

    const newBooking: Booking = {
      id: `B${String(bookings.length + 1).padStart(3, "0")}`,
      equipmentId: equipment.id,
      equipmentName: equipment.name,
      userName,
      startDate: today.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      status: "pending",
      totalCost: equipment.dailyRate * 7,
    };

    setBookings((prev) => [...prev, newBooking]);
  };

  return (
    <BookingsContext.Provider value={{ bookings, addBooking }}>
      {children}
    </BookingsContext.Provider>
  );
};
