import { useMemo, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { styles } from "./MyTicketStyle";
import { PreviewLayout } from "../../../components/PreviewLayout/PreviewLayout";
import { Ticket, type TicketProps } from "../../../components/Ticket/Ticket";
import { useAuth } from "../../../context/AuthContext";
const MyTickets = () => {
  const { userInfo } = useAuth();

  const [direction, setDirection] = useState("Hiện tại");
  const tickets: TicketProps[] = [
    {
      ticketNo: "RLT-0123",
      seatNO: ["3B"],
      Passenger: "Thanh Thuyy",
      Depature: "Ha Tinh",
      Arrive: "Da Nang",
      DepatureTime: new Date("2025-01-18T20:00"),
      ArriveTime: new Date("2025-01-19T05:00"),
      status: "CURRENT",
    },
    {
      ticketNo: "RLT-0123",
      seatNO: ["4B"],
      Passenger: "Labubu",
      Depature: "Ha Tinh",
      Arrive: "Da Nang",
      DepatureTime: new Date("2025-01-18T20:00"),
      ArriveTime: new Date("2025-01-19T05:00"),
      status: "CURRENT",
      Price: "500,000 VND",
    },
    {
      ticketNo: "RLT-0456",
      seatNO: ["5A"],
      Passenger: "Baby three",
      Depature: "Hanoi",
      Arrive: "Ho Chi Minh",
      DepatureTime: new Date("2025-01-15T10:00"),
      ArriveTime: new Date("2025-01-15T20:00"),
      status: "COMPLETED",
      Price: "600,000 VND",
    },
  ];

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      if (direction === "Hiện tại") return ticket.status === "CURRENT";
      if (direction === "Đã hoàn thành") return ticket.status === "COMPLETED";
      if (direction === "Đã hủy") return ticket.status === "CANCELLED";
      return false;
    });
  }, [direction, tickets]);

  return (
    <PreviewLayout
      label="Vé của tôi"
      selectedValue={direction}
      values={["Hiện tại", "Đã hoàn thành", "Đã hủy"]}
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
