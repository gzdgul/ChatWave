import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const TypingIndicator = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="small" color="#000000" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        alignItems: 'center',
    },
});

export default TypingIndicator;
