import { useEffect, useMemo, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { styles } from "./MyTicketStyle";
import { PreviewLayout } from "../../../components/PreviewLayout/PreviewLayout";
import { Ticket } from "../../../components/Ticket/Ticket";
import { ApiConstant } from "../../../data/ApiConstant";
import useApi from "../../../hooks/useApi";
import type { TicketResponse } from "../../../components/Ticket/type";
import { useAuth } from "../../../hooks/useAuth";
const MyTickets = () => {
  const { userInfo } = useAuth();

  const { fetchData } = useApi<TicketResponse[]>({
    method: "GET",
    url: `${ApiConstant.Ticket}/`,
  });
  const [direction, setDirection] = useState("Chờ thanh toán");
  const [tickets, setTickets] = useState<TicketResponse[]>([]);
  const fetchTickets = async () => {
    try {
      await fetchData().then((res) => {
        const formattedTickets = res
          .filter((ticket) => ticket.user_id === userInfo?.user.userId)
          .map((ticket) => ({
            ...ticket,
            trip_id: {
              ...ticket.trip_id,
              tripStartTime: new Date(ticket.trip_id.tripStartTime),
              tripEndTime: new Date(ticket.trip_id.tripEndTime),
            },
          }));
        setTickets(formattedTickets);
        console.log("res", res);
      });
    } catch (err) {}
  };
  useEffect(() => {
    fetchTickets();
  }, []);
  const filteredTickets = useMemo(() => {
    if (!Array.isArray(tickets)) return [];

    const statusMap: any = {
      "Hiện tại": "confirmed",
      "Đã hoàn thành": "completed",
      "Đã hủy": "cancelled",
      "Chờ thanh toán": "pending",
    };

    return tickets.filter(
      (ticket) => ticket.ticket_status === statusMap[direction]
    );
  }, [direction, tickets]);

  return (
    <PreviewLayout
      label="Vé của tôi"
      selectedValue={direction}
      values={["Chờ thanh toán", "Hiện tại", "Đã hoàn thành", "Đã hủy"]}
      setSelectedValue={setDirection}
    >
      <ScrollView style={styles.container}>
        <View style={styles.containerView}>
          {!filteredTickets || filteredTickets.length === 0 ? (
            <Text style={styles.textNoDisplay}>Không có vé để hiển thị</Text>
          ) : (
            <>
              {filteredTickets?.map((ticket, _) => (
                <View key={_}>
                  <Ticket {...ticket} onCancel={fetchTickets} />
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
