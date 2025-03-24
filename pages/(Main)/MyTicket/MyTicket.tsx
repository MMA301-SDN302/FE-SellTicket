import { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { styles } from "./MyTicketStyle";
import { PreviewLayout } from "../../../components/PreviewLayout/PreviewLayout";
import { Ticket } from "../../../components/Ticket/Ticket";
import { ApiConstant } from "../../../data/ApiConstant";
import useApi from "../../../hooks/useApi";
import type { TicketResponse } from "../../../components/Ticket/type";
import { useAuth } from "../../../hooks/useAuth";

const MyTickets = () => {
  const { userInfo } = useAuth();
  const [direction, setDirection] = useState("Chờ thanh toán");
  const [tickets, setTickets] = useState<TicketResponse[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { fetchData, loading } = useApi<TicketResponse[]>({
    method: "GET",
    url: `${ApiConstant.Ticket}/`,
    disableSpinner: true, // Disable default spinner to use custom loading UI
    security: true,
  });

  const fetchTickets = async () => {
    setError(null); // Clear any previous errors
    try {
      const res = await fetchData();

      // Log response for debugging
      console.log("Raw API response:", res);

      if (!Array.isArray(res)) {
        setError("Bạn chưa có vé nào.");
        setTickets([]);
        return;
      }

      // Format the tickets with proper date objects and ensure type compatibility
      const formattedTickets: TicketResponse[] = res.map((ticket) => {
        // Make sure trip_id is properly formatted or use default empty object with correct type
        const formattedTrip = ticket.trip_id
          ? {
              ...ticket.trip_id,
              tripStartTime: ticket.route_id?.routeStartTime
                ? new Date(ticket.route_id.routeStartTime)
                : new Date(),
              tripEndTime: ticket.route_id?.routeEndTime
                ? new Date(ticket.route_id.routeEndTime)
                : new Date(),
            }
          : ticket.trip_id;

        return {
          ...ticket,
          trip_id: formattedTrip,
        };
      });

      console.log("Formatted tickets:", formattedTickets);
      setTickets(formattedTickets);
    } catch (err: any) {
      console.error("Error fetching tickets:", err);
      setError(
        err.message || "Không thể tải dữ liệu vé. Vui lòng thử lại sau."
      );
      setTickets([]);
    }
  };

  // Initial data loading
  useEffect(() => {
    fetchTickets();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchTickets();
    setIsRefreshing(false);
  };

  const filteredTickets = useMemo(() => {
    if (!Array.isArray(tickets)) return [];

    console.log("Current user ID:", userInfo?.user.userId);
    console.log("All tickets before filtering:", tickets);

    const statusMap: any = {
      "Hiện tại": "confirmed",
      "Đã hoàn thành": "completed",
      "Đã hủy": "cancelled",
      "Chờ thanh toán": "pending",
    };

    // Filter by status first
    const statusFiltered = tickets.filter(
      (ticket) => ticket.ticket_status === statusMap[direction]
    );

    console.log(
      `Tickets with status "${statusMap[direction]}":`,
      statusFiltered
    );

    // No need to filter by userId for now, just return all tickets with matching status
    return statusFiltered;
  }, [direction, tickets, userInfo]);

  // Render loading state
  const renderContent = () => {
    if (loading && !isRefreshing && tickets.length === 0) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      );
    }

    // Render error state
    if (error && !loading && tickets.length === 0) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    // Render empty state
    if (!filteredTickets || filteredTickets.length === 0) {
      return <Text style={styles.textNoDisplay}>Không có vé để hiển thị</Text>;
    }

    // Render tickets
    return (
      <>
        {filteredTickets?.map((ticket, index) => (
          <View key={index}>
            <Ticket {...ticket} onCancel={fetchTickets} />
          </View>
        ))}
      </>
    );
  };

  return (
    <PreviewLayout
      label="Vé của tôi"
      selectedValue={direction}
      values={["Chờ thanh toán", "Hiện tại", "Đã hoàn thành", "Đã hủy"]}
      setSelectedValue={setDirection}
    >
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.containerView}>{renderContent()}</View>
      </ScrollView>
    </PreviewLayout>
  );
};

export default MyTickets;
