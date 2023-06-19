import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StickyBarPopup = () => {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.stickyBar} onPress={togglePopup}>
                <Text style={styles.stickyBarText}>Sticky Bar</Text>
            </TouchableOpacity>

            {showPopup && (
                <View style={styles.popupContainer}>
                    <Text style={styles.popupText}>This is a sticky bar popup!</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={togglePopup}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stickyBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stickyBarText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    popupContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    popupText: {
        fontSize: 18,
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default StickyBarPopup;
