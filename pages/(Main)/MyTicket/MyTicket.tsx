import { useMemo, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { styles } from "./MyTicketStyle";
import { PreviewLayout } from "../../../components/PreviewLayout/PreviewLayout";
import { Ticket, type TicketProps } from "../../../components/Ticket/Ticket";
const MyTickets = () => {
  const [direction, setDirection] = useState("CURRENT");
  const tickets: TicketProps[] = [
    {
      ticketNo: "RLT-0123",
      seatNO: ["3B", "4B"],
      Passenger: "Thanh Thuyy",
      Depature: "Ha Tinh",
      Arrive: "Da Nang",
      DepatureTime: new Date("2025-01-18T20:00"),
      ArriveTime: new Date("2025-01-19T05:00"),
      status: "CURRENT",
    },

    {
      ticketNo: "RLT-0456",
      seatNO: ["5A", "6A"],
      Passenger: "Labubu",
      Depature: "Hanoi",
      Arrive: "Ho Chi Minh",
      DepatureTime: new Date("2025-01-15T10:00"),
      ArriveTime: new Date("2025-01-15T20:00"),
      status: "COMPLETED",
    },
    {
      ticketNo: "RLT-0456",
      seatNO: ["5A", "6A"],
      Passenger: "Labubu",
      Depature: "Hanoi",
      Arrive: "Ho Chi Minh",
      DepatureTime: new Date("2025-01-15T10:00"),
      ArriveTime: new Date("2025-01-15T20:00"),
      status: "COMPLETED",
    },
    {
      ticketNo: "RLT-0456",
      seatNO: ["5A", "6A"],
      Passenger: "Labubu",
      Depature: "Hanoi",
      Arrive: "Ho Chi Minh",
      DepatureTime: new Date("2025-01-15T10:00"),
      ArriveTime: new Date("2025-01-15T20:00"),
      status: "COMPLETED",
    },
    {
      ticketNo: "RLT-0456",
      seatNO: ["5A", "6A"],
      Passenger: "Labubu",
      Depature: "Hanoi",
      Arrive: "Ho Chi Minh",
      DepatureTime: new Date("2025-01-15T10:00"),
      ArriveTime: new Date("2025-01-15T20:00"),
      status: "COMPLETED",
    },
    {
      ticketNo: "RLT-0456",
      seatNO: ["5A", "6A"],
      Passenger: "Labubu",
      Depature: "Hanoi",
      Arrive: "Ho Chi Minh",
      DepatureTime: new Date("2025-01-15T10:00"),
      ArriveTime: new Date("2025-01-15T20:00"),
      status: "COMPLETED",
    },
    {
      ticketNo: "RLT-0456",
      seatNO: ["5A", "6A"],
      Passenger: "Labubu",
      Depature: "Hanoi",
      Arrive: "Ho Chi Minh",
      DepatureTime: new Date("2025-01-15T10:00"),
      ArriveTime: new Date("2025-01-15T20:00"),
      status: "COMPLETED",
    },
    {
      ticketNo: "RLT-0456",
      seatNO: ["5A", "6A"],
      Passenger: "Labubu",
      Depature: "Hanoi",
      Arrive: "Ho Chi Minh",
      DepatureTime: new Date("2025-01-15T10:00"),
      ArriveTime: new Date("2025-01-15T20:00"),
      status: "COMPLETED",
    },
    {
      ticketNo: "RLT-0456",
      seatNO: ["5A", "6A"],
      Passenger: "Labubu",
      Depature: "Hanoi",
      Arrive: "Ho Chi Minh",
      DepatureTime: new Date("2025-01-15T10:00"),
      ArriveTime: new Date("2025-01-15T20:00"),
      status: "COMPLETED",
    },
    {
      ticketNo: "RLT-0456",
      seatNO: ["5A", "6A"],
      Passenger: "Labubu",
      Depature: "Hanoi",
      Arrive: "Ho Chi Minh",
      DepatureTime: new Date("2025-01-15T10:00"),
      ArriveTime: new Date("2025-01-15T20:00"),
      status: "COMPLETED",
    },
    {
      ticketNo: "RLT-0456",
      seatNO: ["5A", "6A"],
      Passenger: "Labubu",
      Depature: "Hanoi",
      Arrive: "Ho Chi Minh",
      DepatureTime: new Date("2025-01-15T10:00"),
      ArriveTime: new Date("2025-01-15T20:00"),
      status: "COMPLETED",
    },
  ];

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => ticket?.status === direction);
  }, [direction, tickets]);

  return (
    <PreviewLayout
      label="My Tickets"
      selectedValue={direction}
      values={["CURRENT", "COMPLETED", "CANCELLED"]}
      setSelectedValue={setDirection}
    >
      <ScrollView style={styles.container}>
        <View style={styles.containerView}>
          {!filteredTickets || filteredTickets.length === 0 ? (
            <Text style={styles.textNoDisplay}>
              Oops! No Tickets to Display
            </Text>
          ) : (
            <>
              {filteredTickets?.map((ticket, _) => (
                <View key={_}>
                  <Ticket {...ticket} />
                </View>
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </PreviewLayout>
  );
};
export default MyTickets;
