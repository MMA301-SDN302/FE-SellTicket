import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa loại dữ liệu cho thông báo
export type AppNotification = {
  id: string;
  mess: string;
  time: Date;
  unRead: boolean;
  type: 'payment' | 'ticket' | 'system';
  relatedId?: string;
}

// Lưu trữ key cho AsyncStorage
const NOTIFICATION_STORAGE_KEY = 'app_notifications';

/**
 * Lấy tất cả thông báo từ storage
 */
export const getAllNotifications = async (): Promise<AppNotification[]> => {
  try {
    const notificationsJson = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
    if (notificationsJson) {
      const notifications = JSON.parse(notificationsJson);
      // Chuyển đổi chuỗi thời gian thành đối tượng Date
      return notifications.map((notification: any) => ({
        ...notification,
        time: new Date(notification.time)
      }));
    }
    return [];
  } catch (error) {
    console.error('Lỗi khi lấy thông báo:', error);
    return [];
  }
};

/**
 * Thêm một thông báo mới
 */
export const addNotification = async (notification: Omit<AppNotification, 'id'>): Promise<boolean> => {
  try {
    // Lấy thông báo hiện tại
    const currentNotifications = await getAllNotifications();
    
    // Tạo thông báo mới với ID ngẫu nhiên
    const newNotification: AppNotification = {
      ...notification,
      id: Math.random().toString(36).substring(2, 15),
    };
    
    // Thêm thông báo mới vào đầu danh sách
    const updatedNotifications = [newNotification, ...currentNotifications];
    
    // Giới hạn số lượng thông báo (chỉ giữ 50 thông báo gần nhất)
    const limitedNotifications = updatedNotifications.slice(0, 50);
    
    // Lưu vào storage
    await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(limitedNotifications));
    
    return true;
  } catch (error) {
    console.error('Lỗi khi thêm thông báo:', error);
    return false;
  }
};

/**
 * Đánh dấu thông báo đã đọc
 */
export const markNotificationAsRead = async (notificationId: string): Promise<boolean> => {
  try {
    const notifications = await getAllNotifications();
    const updatedNotifications = notifications.map(notification => 
      notification.id === notificationId 
        ? { ...notification, unRead: false } 
        : notification
    );
    
    await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(updatedNotifications));
    return true;
  } catch (error) {
    console.error('Lỗi khi đánh dấu đã đọc:', error);
    return false;
  }
};

/**
 * Đánh dấu tất cả thông báo đã đọc
 */
export const markAllNotificationsAsRead = async (): Promise<boolean> => {
  try {
    const notifications = await getAllNotifications();
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      unRead: false
    }));
    
    await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(updatedNotifications));
    return true;
  } catch (error) {
    console.error('Lỗi khi đánh dấu tất cả đã đọc:', error);
    return false;
  }
};

/**
 * Tạo thông báo thanh toán thành công
 */
export const createPaymentSuccessNotification = async (ticketNo: string, price: number): Promise<boolean> => {
  const notification: Omit<AppNotification, 'id'> = {
    mess: `Vé ${ticketNo} đã được thanh toán thành công với giá ${new Intl.NumberFormat('vi-VN').format(price)} VND`,
    time: new Date(),
    unRead: true,
    type: 'payment',
    relatedId: ticketNo
  };
  
  return await addNotification(notification);
};

/**
 * Đếm số thông báo chưa đọc
 */
export const countUnreadNotifications = async (): Promise<number> => {
  try {
    const notifications = await getAllNotifications();
    return notifications.filter(notification => notification.unRead).length;
  } catch (error) {
    console.error('Lỗi khi đếm thông báo chưa đọc:', error);
    return 0;
  }
}; 