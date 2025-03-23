import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, StyleSheet } from 'react-native';
import { NotificationDetail } from '../../../components/NotificationDetail/NotificationDetail';
import { getAllNotifications, markAllNotificationsAsRead, AppNotification } from '../../../utils/NotificationHelper';
import { PreviewLayout } from '../../../components/PreviewLayout/PreviewLayout';

export const Notification = () => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    const notificationList = await getAllNotifications();
    setNotifications(notificationList);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  };

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsRead();
    await loadNotifications();
  };

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || (filter === 'unread' && notification.unRead)
  );

  return (
    <PreviewLayout label="Thông báo">
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <View style={styles.filterButtons}>
            <TouchableOpacity 
              style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
              onPress={() => setFilter('all')}
            >
              <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
                Tất cả
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterButton, filter === 'unread' && styles.filterButtonActive]}
              onPress={() => setFilter('unread')}
            >
              <Text style={[styles.filterText, filter === 'unread' && styles.filterTextActive]}>
                Chưa đọc
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.markReadButton}
            onPress={handleMarkAllAsRead}
          >
            <Text style={styles.markReadText}>Đánh dấu đã đọc</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredNotifications.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Không có thông báo</Text>
            </View>
          ) : (
            filteredNotifications.map((notification) => (
              <View key={notification.id} style={styles.notificationItem}>
                <NotificationDetail
                  id={notification.id}
                  mess={notification.mess}
                  time={notification.time}
                  unRead={notification.unRead}
                  type={notification.type}
                />
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </PreviewLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  filterContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  filterButtons: {
    flexDirection: 'row',
    marginBottom: 12
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f0f0f0'
  },
  filterButtonActive: {
    backgroundColor: '#2a3266'
  },
  filterText: {
    color: '#666',
    fontWeight: '500'
  },
  filterTextActive: {
    color: 'white'
  },
  markReadButton: {
    alignSelf: 'flex-end'
  },
  markReadText: {
    color: '#2a3266',
    fontWeight: '500'
  },
  scrollView: {
    flex: 1
  },
  notificationItem: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 32
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    fontStyle: 'italic'
  }
});
