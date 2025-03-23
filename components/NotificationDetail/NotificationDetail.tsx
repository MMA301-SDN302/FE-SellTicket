import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { markNotificationAsRead } from '../../utils/NotificationHelper';

export type NotificationDetailProps = {
  id: string;
  mess: string;
  time: Date;
  unRead: boolean;
  type: 'payment' | 'ticket' | 'system';
};

export const NotificationDetail: React.FC<NotificationDetailProps> = ({ id, mess, time, unRead, type }) => {
  const handlePress = async () => {
    if (unRead) {
      await markNotificationAsRead(id);
    }
  };

  const getTimeDisplay = (time: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - time.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `${diffMinutes} phút trước`;
    } else if (diffHours < 24) {
      return `${diffHours} giờ trước`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays} ngày trước`;
    }
  };

  const getNotificationIcon = () => {
    switch (type) {
      case 'payment':
        return 'card';
      case 'ticket':
        return 'ticket';
      default:
        return 'notifications';
    }
  };
  
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.box}>
        <View style={styles.icon}>
          <Ionicons 
            name={getNotificationIcon()} 
            size={24} 
            color="#2a3266" 
          />
        </View>
        <View style={styles.detailMess}>
          <Text style={[styles.mess, unRead && styles.unreadMess]}>{mess}</Text>
          <Text style={styles.time}>{getTimeDisplay(time)}</Text>
        </View>
        {unRead && (
          <Ionicons
            name="ellipse"
            style={styles.statusIcon}
            color="#FF3B30"
            size={8}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8
  },
  box: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    position: 'relative'
  },
  icon: {
    padding: 8,
    backgroundColor: '#f0f4f9',
    borderRadius: 50,
    marginRight: 12
  },
  detailMess: {
    flex: 1,
    paddingRight: 24
  },
  mess: {
    color: '#333',
    fontSize: 14,
    marginBottom: 4
  },
  unreadMess: {
    fontWeight: 'bold',
    color: '#000'
  },
  time: {
    color: '#999',
    fontSize: 12
  },
  statusIcon: {
    position: 'absolute',
    top: 12,
    right: 12
  }
});
