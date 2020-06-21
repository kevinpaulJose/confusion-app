import React from 'react';
import { StyleSheet } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100
      }
});

export const Loading = () => {
    return (
        <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../shared/loader.json")}
          animationStyle={styles.lottie}
          speed={1}
        />
      );
}