import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types/NavigationTypes';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { ApiConstant } from '../../../data/ApiConstant';
import useApi from '../../../hooks/useApi';
import ButtonCommon from '../../../components/Common/Button/ButtonCommon';
import { PreviewLayout } from '../../../components/PreviewLayout/PreviewLayout';
import { styles } from './PaymentStyle';
import { useAuth } from '../../../hooks/useAuth';
import { createPaymentSuccessNotification } from '../../../utils/NotificationHelper';

type PaymentRouteProps = RouteProp<RootStackParamList, 'Payment'>;

type PaymentScreenProps = {
  route: PaymentRouteProps;
  navigation: StackNavigationProp<RootStackParamList, 'Payment'>;
};

type PaymentConfigResponse = {
  publishableKey: string;
};

type PaymentIntentResponse = {
  clientSecret: string;
  paymentIntentId: string;
  ephemeralKey?: string;
  customer?: string;
  ticket: any;
  userInfo?: {
    hasEmail: boolean;
    name: string;
  };
};

const PaymentScreen: React.FC<PaymentScreenProps> = ({ route, navigation }) => {
  const { ticketId, ticketInfo } = route.params || {};
  const { userInfo } = useAuth();
  const [publishableKey, setPublishableKey] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
  
  // Customer information states
  const [customerName, setCustomerName] = useState<string>(userInfo?.user?.fullName || '');
  const [customerEmail, setCustomerEmail] = useState<string>(userInfo?.user?.email || '');
  const [hasEmailInDB, setHasEmailInDB] = useState<boolean>(!!userInfo?.user?.email);
  const [needEmail, setNeedEmail] = useState<boolean>(!userInfo?.user?.email);
  
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  
  // API hooks for Stripe configuration and payment intents
  const { fetchData: fetchConfig } = useApi<PaymentConfigResponse>({
    method: 'GET',
    url: ApiConstant.Payment.Config,
  });
  
  const { fetchData: createPaymentIntent } = useApi<PaymentIntentResponse>({
    method: 'POST',
    url: ApiConstant.Payment.StripeSheet,
  });
  
  const { fetchData: confirmPaymentBackend } = useApi({
    method: 'POST',
    url: ApiConstant.Payment.Confirm,
  });
  
  // Fetch Stripe configuration on component mount
  useEffect(() => {
    const initializePayment = async () => {
      try {
        // Get Stripe publishable key
        const configResponse = await fetchConfig();
        setPublishableKey(configResponse.publishableKey);
      } catch (error) {
        console.error('Error initializing payment:', error);
        Alert.alert('Error', 'Failed to initialize payment. Please try again.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    
    initializePayment();
  }, []);
  
  // Create payment intent and initialize payment sheet
  const initializePaymentSheet = async () => {
    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!ticketId) {
      Alert.alert('Error', 'Ticket information is missing');
      return { success: false, error: 'Missing ticket ID' };
    }

    try {
      setPaymentLoading(true);
      
      // BƯỚC 1: CHUẨN BỊ DỮ LIỆU GỬI LÊN SERVER
      // Only send email if user doesn't have one in the database
      const payloadData: any = { ticketId };
      
      // Only add customer email if we're prompting for it
      if (needEmail && customerEmail) {
        payloadData.customerEmail = customerEmail;
      }
      
      console.log('[STEP 1] Creating payment intent with payload:', JSON.stringify(payloadData));
      
      // BƯỚC 2: TẠO PAYMENT INTENT TRÊN SERVER
      // Create payment intent for the ticket
      const paymentIntentResponse = await createPaymentIntent(payloadData);
      
      console.log('[STEP 2] Raw payment intent response:', JSON.stringify(paymentIntentResponse));
      
      // Kiểm tra kỹ dữ liệu nhận về từ API
      if (!paymentIntentResponse) {
        console.error('[ERROR] No response from payment intent API');
        Alert.alert('Error', 'Could not initialize payment. Please try again later.');
        return { success: false, error: 'No response from server' };
      }
      
      if (!paymentIntentResponse.paymentIntentId) {
        console.error('[ERROR] No payment intent ID in response:', JSON.stringify(paymentIntentResponse));
        Alert.alert('Error', 'Could not initialize payment. Please try again later.');
        return { success: false, error: 'Missing payment intent ID' };
      }
      
      if (!paymentIntentResponse.clientSecret) {
        console.error('[ERROR] No client secret in response:', JSON.stringify(paymentIntentResponse));
        Alert.alert('Error', 'Could not initialize payment. Please try again later.');
        return { success: false, error: 'Missing client secret' };
      }
      
      // BƯỚC 3: LƯU TRỮ THÔNG TIN PAYMENT INTENT
      // Store payment intent data immediately in local variables
      const intentId = paymentIntentResponse.paymentIntentId.trim();
      const clientSecretValue = paymentIntentResponse.clientSecret;
      
      console.log('[STEP 3] Received payment intent ID:', intentId);
      
      // Update UI based on user info from server
      if (paymentIntentResponse.userInfo) {
        setHasEmailInDB(paymentIntentResponse.userInfo.hasEmail);
        setNeedEmail(!paymentIntentResponse.userInfo.hasEmail);
        
        if (!customerName && paymentIntentResponse.userInfo.name !== 'Unknown') {
          setCustomerName(paymentIntentResponse.userInfo.name);
        }
      }
      
      // BƯỚC 4: KHỞI TẠO PAYMENT SHEET
      console.log('[STEP 4] Initializing payment sheet with intent ID:', intentId);
      
      // Initialize Payment Sheet
      const initOptions: any = {
        paymentIntentClientSecret: clientSecretValue,
        merchantDisplayName: 'Fast Ticket',
      };
      
      // Add customer and ephemeralKey if available
      if (paymentIntentResponse.customer && paymentIntentResponse.ephemeralKey) {
        initOptions.customerId = paymentIntentResponse.customer;
        initOptions.customerEphemeralKeySecret = paymentIntentResponse.ephemeralKey;
      }
      
      console.log('[INFO] Payment sheet options:', JSON.stringify({
        ...initOptions,
        paymentIntentClientSecret: clientSecretValue.substring(0, 10) + '...'
      }));
      
      const { error: initError } = await initPaymentSheet(initOptions);
      
      if (initError) {
        console.error('[ERROR] Error initializing payment sheet:', initError);
        Alert.alert('Error', 'Could not initialize payment. Please try again.');
        return { success: false, error: initError.message };
      }
      
      // BƯỚC 5: KIỂM TRA LẠI ID CUỐI CÙNG
      console.log('[STEP 5] Payment intent ID after initialization:', intentId);
      
      if (!intentId) {
        console.error('[ERROR] Payment intent ID missing after initialization');
        Alert.alert('Error', 'Could not create payment. Please try again later.');
        return { success: false, error: 'Lost payment intent ID' };
      }
      
      // Trả về kết quả thành công với payment intent ID
      console.log('[SUCCESS] Payment sheet initialized successfully with ID:', intentId);
      return { success: true, paymentIntentId: intentId };
    } catch (error) {
      console.error('[ERROR] Error creating payment intent:', error);
      Alert.alert('Error', 'Failed to create payment. Please try again.');
      return { success: false, error: String(error) };
    } finally {
      setPaymentLoading(false);
    }
  };
  
  // Handle payment submission
  const handlePayPress = async () => {
    try {
      // Only validate email if we need it
      if (needEmail) {
        if (!customerEmail.trim()) {
          Alert.alert('Missing Information', 'Please provide your email to continue.');
          return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customerEmail)) {
          Alert.alert('Invalid Email', 'Please enter a valid email address.');
          return;
        }
      }
      
      // Hiển thị đang loading
      setPaymentLoading(true);
      
      // BƯỚC 1: KHỞI TẠO PAYMENT SHEET VÀ LẤY PAYMENT INTENT ID
      console.log("[PAYMENT STEP 1] Initializing payment sheet");
      const result = await initializePaymentSheet();
      
      console.log("[PAYMENT STEP 1 RESULT]", JSON.stringify(result));
      
      if (!result || !result.success) {
        console.error('[ERROR] Failed to initialize payment sheet');
        return;
      }
      
      // Lấy payment intent ID từ kết quả khởi tạo
      const paymentIntentId = result.paymentIntentId;
      
      // Kiểm tra kỹ payment intent ID
      if (!paymentIntentId) {
        console.error('[ERROR] Payment intent ID missing after successful initialization');
        Alert.alert('Error', 'Could not create payment. Please try again later.');
        return;
      }
      
      console.log("[PAYMENT STEP 2] Payment intent ID before presenting payment sheet:", paymentIntentId);
      
      // BƯỚC 2: HIỂN THỊ PAYMENT SHEET CHO NGƯỜI DÙNG
      const { error: paymentError } = await presentPaymentSheet();
      
      if (paymentError) {
        console.error('[ERROR] Payment error:', paymentError);
        
        // Xử lý các lỗi khác nhau
        if (paymentError.code === 'Canceled') {
          // Người dùng hủy thanh toán - không cần thông báo
          console.log('[INFO] User cancelled payment');
        } else {
          Alert.alert('Payment Failed', paymentError.message);
        }
        return;
      }
      
      // BƯỚC 3: XÁC NHẬN THANH TOÁN VỚI BACKEND
      console.log("[PAYMENT STEP 3] Payment successful, confirming with backend");
      console.log("[PAYMENT STEP 3] Using payment intent ID:", paymentIntentId);
      
      // Đợi một chút để Stripe xử lý thanh toán hoàn tất
      console.log('[INFO] Waiting for payment to be fully processed...');
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Chuẩn bị dữ liệu gửi lên API
      const confirmData = { 
        paymentIntentId: paymentIntentId
      };
      
      console.log('[INFO] Confirming payment with payload:', JSON.stringify(confirmData));
      
      try {
        // BƯỚC 4: GỌI API XÁC NHẬN THANH TOÁN
        await confirmPaymentBackend(confirmData);
        
        // BƯỚC 5: TẠO THÔNG BÁO THANH TOÁN THÀNH CÔNG
        console.log('[INFO] Creating payment success notification');
        await createPaymentSuccessNotification(
          ticketInfo?.ticket_No || 'Unknown',
          ticketInfo?.ticket_price || 0
        );
        
        // BƯỚC 6: HIỂN THỊ THÔNG BÁO THÀNH CÔNG
        Alert.alert(
          'Payment Successful',
          'Your ticket has been confirmed!',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [
                    { 
                      name: 'HomeStack'
                    }
                  ]
                });
              },
            },
          ]
        );
      } catch (apiError) {
        console.error('[ERROR] API error during payment confirmation:', apiError);
        
        // Thông báo cho người dùng là thanh toán đã được xử lý, nhưng cần kiểm tra lại
        Alert.alert(
          'Payment Processed',
          'Your payment was processed, but we could not confirm the ticket status. Please check your tickets or contact support.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'HomeStack' }]
                });
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error('[ERROR] Unexpected error during payment process:', error);
      Alert.alert('Error', 'An error occurred during payment. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4D5995" />
        <Text style={styles.loadingText}>Preparing payment...</Text>
      </View>
    );
  }
  
  return (
    <StripeProvider publishableKey={publishableKey}>
      <PreviewLayout label="Thanh toán vé">
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.ticketInfoContainer}>
              <Text style={styles.title}>Thông tin vé</Text>
              
              <View style={styles.infoRow}>
                <Text style={styles.label}>Mã vé:</Text>
                <Text style={styles.value}>{ticketInfo?.ticket_No}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.label}>Hành khách:</Text>
                <Text style={styles.value}>{ticketInfo?.passenger || userInfo?.user?.displayName || `${userInfo?.user?.firstName || ''} ${userInfo?.user?.lastName || ''}`.trim() || 'Chưa cung cấp'}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.label}>Tuyến đường:</Text>
                <Text style={styles.value}>
                  {ticketInfo?.startlocation || ticketInfo?.trip_id?.depature} → {ticketInfo?.endlocation || ticketInfo?.trip_id?.arrive}
                </Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.label}>Giá vé:</Text>
                <Text style={styles.price}>{new Intl.NumberFormat('en-US').format(ticketInfo?.ticket_price || 0)} VND</Text>
              </View>
            </View>
            
            {needEmail && (
              <View style={styles.cardContainer}>
                <Text style={styles.title}>Thông tin liên hệ</Text>
                <Text style={styles.subtitle}>Hãy cung cấp email để nhận thông tin vé</Text>
                
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Email:</Text>
                  <TextInput
                    style={styles.input}
                    value={customerEmail}
                    onChangeText={setCustomerEmail}
                    placeholder="Nhập email của bạn"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            )}
            
            <View style={styles.cardContainer}>
              <Text style={styles.title}>Thanh toán</Text>
              <Text style={styles.subtitle}>Nhấn nút "Thanh toán" để mở cổng thanh toán Stripe</Text>
              
              <Text style={styles.testCardText}>
                * Để test thanh toán, bạn có thể dùng số thẻ: 4242 4242 4242 4242
              </Text>
              <Text style={styles.testCardText}>
                Ngày hết hạn: Bất kỳ ngày nào trong tương lai (MM/YY)
              </Text>
              <Text style={styles.testCardText}>
                CVC: Bất kỳ 3 chữ số nào
              </Text>
            </View>
            
            <View style={styles.buttonContainer}>
              <ButtonCommon
                title="Hủy"
                isActive={!paymentLoading}
                onPress={() => navigation.goBack()}
                backgroundColor="#f0f0f0"
                textColor="black"
                activeBackgroundColor="#f0f0f0"
                activeTextColor="black"
                buttonStyle={styles.cancelButton}
              />
              
              <ButtonCommon
                title={paymentLoading ? "Đang xử lý..." : "Thanh toán"}
                isActive={!paymentLoading}
                onPress={handlePayPress}
                backgroundColor="#4D5995"
                textColor="white"
                activeBackgroundColor="#4D5995"
                activeTextColor="white"
                buttonStyle={styles.payButton}
              />
            </View>
          </View>
        </ScrollView>
      </PreviewLayout>
    </StripeProvider>
  );
};

export default PaymentScreen; 