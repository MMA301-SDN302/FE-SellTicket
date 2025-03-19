type BusCompany = {
  bus_company_status: string;
  bus_company_name: string;
  bus_company_dob: string;
  bus_company_img_url: string;
  bus_company_description: string;
  bus_company_location: string;
  location_id: Location;
};
type Car = {
  _id: string;
  car_code: string;
  amount_seat: number;
  car_img_url: string;
  car_manufacturer: string;
  buscompany_id: BusCompany;
};
type StopMap = {
  stop_id: number;
  stop_name: string;
  latitude: number;
  longitude: number;
  stop_time: Date;
};
type Trip = {
  car: Car;
  stopMap: {
    type: [
      {
        name: string;
        time: string;
        offsetTime: number;
        code: string;
        AODAddress: string;
      }
    ];
    required: true;
  };
  price: number;
  weekTimeRun: [
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday"
  ];
};
export type RouteResponse = {
  _id: string;
  policy: string;
  car: Car;
  name: string;
  routeDescription: string;
  routeStartTime: Date | null;
  routeEndTime: Date | null;
  stopMap: StopMap;
  trip: Trip;
  remainingSeat: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TicketResponse = {
  ticket_No: string;
  passenger: string;
  ticket_price: number;
  ticket_seat: string;
  ticket_status: "pending" | "confirmed" | "cancelled" | "completed";
  route_id: RouteResponse;
  _id: string;
  user_id: string;
  startlocation: string;
  endlocation: string;
};
