import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

type ReservationStatus = "form" | "checking" | "confirmed";

type Room = {
  id: string;
  label: string;
  blurb: string;
  rate: number;
};

const ROOMS: Room[] = [
  { id: "deluxe", label: "Deluxe Room", blurb: "King bed, city view, rain shower", rate: 280 },
  { id: "executive", label: "Executive Suite", blurb: "Separate living area, workspace", rate: 480 },
  { id: "penthouse", label: "Penthouse Terrace", blurb: "Private terrace, skyline panorama", rate: 920 },
] as const;

const CONFIRMATION_NUMBER = "AUR-" + Math.random().toString(36).slice(2, 8).toUpperCase();

function formatMoney(amount: number): string {
  return "$" + amount.toLocaleString("en-US", { minimumFractionDigits: 0 });
}

function nightsBetween(checkIn: string, checkOut: string): number {
  const a = Date.parse(checkIn);
  const b = Date.parse(checkOut);
  if (!a || !b || b <= a) return 1;
  return Math.max(1, Math.round((b - a) / (1000 * 60 * 60 * 24)));
}

export function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<ReservationStatus>("form");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState<number>(2);
  const [roomId, setRoomId] = useState<string>("deluxe");
  const [rooms, setRooms] = useState<number>(1);

  const timerRef = useRef<number | null>(null);

  const room = useMemo(
    () => ROOMS.find((r) => r.id === roomId) ?? ROOMS[0],
    [roomId],
  );

  const nights = nightsBetween(checkIn, checkOut);
  const total = room.rate * nights * rooms;

  useEffect(() => {
    if (open) setStatus("form");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (status !== "checking") return;
    timerRef.current = window.setTimeout(() => {
      setStatus("confirmed");
    }, 2200);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [status]);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  if (!open) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "form") setStatus("checking");
  };

  const cancel = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    onClose();
  };

  return (
    <div className="booking-overlay" onClick={onClose}>
      <div
        className="booking-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Reserve your stay"
        onClick={(e) => e.stopPropagation()}
      >
        {status === "form" && (
          <form className="booking-form" onSubmit={submit}>
            <p className="booking-eyebrow">AURUM</p>
            <h2 className="booking-title">Reserve your stay</h2>
            <p className="booking-sub">Curated rooms, honest nightly rates, and a concierge on watch through the night.</p>

            <div className="booking-grid">
              <label className="field">
                <span>Check-in</span>
                <input required type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
              </label>
              <label className="field">
                <span>Check-out</span>
                <input required type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
              </label>
              <label className="field">
                <span>Guests</span>
                <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                  {[1, 2, 3, 4].map((g) => (
                    <option key={g} value={g}>{g} {g === 1 ? "guest" : "guests"}</option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Rooms</span>
                <select value={rooms} onChange={(e) => setRooms(Number(e.target.value))}>
                  {[1, 2, 3].map((r) => (
                    <option key={r} value={r}>{r} {r === 1 ? "room" : "rooms"}</option>
                  ))}
                </select>
              </label>
              <label className="field" style={{ gridColumn: "1 / -1" }}>
                <span>Room type</span>
                <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
                  {ROOMS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label} — from {formatMoney(r.rate)} / night
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="booking-fare">
              <div className="booking-fare-row">
                <span>{room.label} · {formatMoney(room.rate)} / night</span>
                <span>{formatMoney(room.rate * rooms)}</span>
              </div>
              <div className="booking-fare-row">
                <span>Nights · {nights}</span>
                <span>{formatMoney(room.rate * nights * rooms)}</span>
              </div>
              <div className="booking-fare-row">
                <span>Rooms · {rooms}</span>
                <span>{formatMoney(room.rate * nights * rooms)}</span>
              </div>
              <div className="booking-fare-row booking-fare-total">
                <span>Estimated total</span>
                <span>{formatMoney(total)}</span>
              </div>
              <p className="booking-fare-note">Honest nightly rates. No hidden fees, no resort charges.</p>
            </div>

            <button className="booking-submit" type="submit">
              Reserve my stay
            </button>
          </form>
        )}

        {status === "checking" && (
          <div className="booking-state">
            <div className="booking-spinner" aria-hidden="true" />
            <h2 className="booking-title">Checking availability</h2>
            <p className="booking-sub">Confirming your room and dates.</p>
          </div>
        )}

        {status === "confirmed" && (
          <div className="booking-state">
            <div className="booking-eyebrow">Reservation confirmed</div>
            <h2 className="booking-title">Your stay is booked</h2>
            <div className="booking-driver">
              <span className="booking-avatar" aria-hidden="true">
                AU
              </span>
              <div>
                <p className="booking-driver-name">
                  {room.label} <span>★ 4.9</span>
                </p>
                <p className="booking-driver-meta">
                  {checkIn || "—"} → {checkOut || "—"} · {nights} {nights === 1 ? "night" : "nights"} · {guests} {guests === 1 ? "guest" : "guests"}
                </p>
              </div>
            </div>
            <p className="booking-eta">
              Confirmation {CONFIRMATION_NUMBER} — the front desk has your details and will greet you by name on arrival.
            </p>
            <button className="booking-cancel" type="button" onClick={cancel}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}