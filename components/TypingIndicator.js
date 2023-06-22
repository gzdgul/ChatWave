import React from 'react';
import { View, StyleSheet, ActivityIndicator} from 'react-native';
import {TypingAnimation} from "react-native-typing-animation";

const TypingIndicator = () => {
    return (
        <View style={styles.container}>
            <TypingAnimation
                dotColor="gray"
                dotMargin={6}
                dotAmplitude={3}
                dotSpeed={0.20}
                dotRadius={2.5}
                dotY={0}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
});

export default TypingIndicator;
