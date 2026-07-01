import { useEffect, useRef } from "react";

import { Animated, StyleSheet, View } from "react-native";

import { COLORS } from "@/styles";

type Props = {
  onFinish: () => void;
};

export const SplashScreen = ({ onFinish }: Props) => {
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.delay(500),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onFinish());
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.pokeballWrapper,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }, { rotate: spin }],
          },
        ]}
      >
        <View style={styles.topHalf} />
        <View style={styles.bottomHalf} />
        <View style={styles.middleBand}>
          <View style={styles.centerButtonOuter}>
            <View style={styles.centerButtonInner} />
          </View>
        </View>
      </Animated.View>

      <Animated.Text style={[styles.title, { opacity: opacityAnim }]}>
        Pokédex
      </Animated.Text>
    </View>
  );
};

const BALL_SIZE = 120;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  pokeballWrapper: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: COLORS.black,
  },
  topHalf: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  bottomHalf: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  middleBand: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    height: 8,
    marginTop: -4,
    backgroundColor: COLORS.black,
    justifyContent: "center",
    alignItems: "center",
  },
  centerButtonOuter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.black,
    justifyContent: "center",
    alignItems: "center",
  },
  centerButtonInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.white,
    marginTop: 24,
    letterSpacing: 2,
  },
});
