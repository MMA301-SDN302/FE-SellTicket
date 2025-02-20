import { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";
import Modal from "react-native-modal";
import { useSpinner } from "../../../hooks/useSpinner";

const SpinnerLoading = () => {
  const { isShowSpinner } = useSpinner();

  const animations = Array(8)
    .fill(0)
    .map(() => useRef(new Animated.Value(1)).current);

  useEffect(() => {
    const animate = (index: number) => {
      Animated.sequence([
        Animated.timing(animations[index], {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animations[index], {
          toValue: 1,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start(() => animate(index));
    };

    animations.forEach((_, index) => {
      setTimeout(() => animate(index), index * 125);
    });
  }, []);

  return (
    <Modal
      isVisible={isShowSpinner}
      backdropOpacity={0.5}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.modalContainer}>
        <View style={styles.spinnerContainer}>
          {animations.map((anim, index) => {
            const angle = index * 45 + "deg";
            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    opacity: anim,
                    transform: [{ rotate: angle }, { translateY: -50 }],
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerContainer: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
  },
  dot: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4bda3d",
  },
});

export default SpinnerLoading;
