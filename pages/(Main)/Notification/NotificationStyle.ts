import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  containerView: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea"
  },
  textNoDisplay: {
    color: "#000",
    fontWeight: "600",
    fontSize: 16,
    marginTop: 16
  },
  scrollView: {
    flex: 1
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4
  },
  filterButtonActive: {
    backgroundColor: '#4D5995'
  },
  filterText: {
    color: '#333',
    fontWeight: '500'
  },
  filterTextActive: {
    color: '#fff'
  },
  markReadButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#f0f0f0'
  },
  markReadText: {
    color: '#4D5995',
    fontWeight: '500',
    fontSize: 12
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    fontStyle: 'italic'
  }
});
