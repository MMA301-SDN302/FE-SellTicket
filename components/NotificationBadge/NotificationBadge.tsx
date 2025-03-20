import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { countUnreadNotifications } from '../../utils/NotificationHelper';

interface NotificationBadgeProps {
  size?: number;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ size = 16 }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  
  useEffect(() => {
    const checkUnread = async () => {
      const count = await countUnreadNotifications();
      setUnreadCount(count);
    };
    
    checkUnread();
    const intervalId = setInterval(checkUnread, 10000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  if (unreadCount === 0) {
    return null;
  }
  
  return (
    <View style={[styles.badge, { minWidth: size }]}>
      <Text style={styles.badgeText}>
        +{unreadCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    position: 'absolute',
    top: -8,
    right: -12,
    paddingHorizontal: 4,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold'
  }
}); 