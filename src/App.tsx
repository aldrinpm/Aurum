import { useCallback, useState } from "react";
import { LivingWorldHero } from "./components/LivingWorldHero";
import { BookingModal } from "./components/BookingModal";

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = useCallback(() => setBookingOpen(true), []);

  return (
    <div className="aurum-app">
      <LivingWorldHero onBook={openBooking} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
