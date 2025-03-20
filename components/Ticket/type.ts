type Trip = {
  _id: string;
  route: string;
  car: string;
  busCompany: string;
  depature: string;
  arrive: string;
  tripStartTime: Date;
  tripEndTime: Date;
  availableSeats: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TicketResponse = {
  _id: string;
  ticket_id?: string;
  ticket_No: string;
  passenger?: string;
  ticket_price: number;
  ticket_seat?: string;
  ticket_status: "pending" | "confirmed" | "cancelled" | "completed";
  trip_id?: Trip;
  route_id?: string;
  user_id: string;
  startlocation?: string;
  endlocation?: string;
};
