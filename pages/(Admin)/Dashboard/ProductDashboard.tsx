import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProductDashboard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fast Ticket</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Product</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.earningCard}>
        <Text style={styles.earningTitle}>Earnings</Text>
        <Text style={styles.earningAmount}>213.95 M$</Text>
        <Text style={styles.earningChange}>⬆ 6.4%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  earningCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  earningTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  earningAmount: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },
  earningChange: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
  },
});

export default ProductDashboard;
