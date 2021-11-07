import React, { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import FlipCamera from '../icons/flip-camera.svg';
import TakePicker from '../icons/take-picture.svg';

export function CameraView({ Camera, camRef, handleCapture }) {
    const [type, setType] = useState(Camera.Constants.Type.back);

    return (
        <View style={styles.wrap}>
            <Camera ref={camRef} style={styles.camera} type={type}>
                <View style={styles.buttonsContainer}>
                    <Pressable
                        style={styles.flipCameraButton}
                        onPress={() => {
                            setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            );
                        }}
                    >
                        <FlipCamera />
                    </Pressable>
                    <Pressable
                        onPress={handleCapture}
                        style={styles.takeAPictureButton}
                    >
                        <TakePicker />
                    </Pressable>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
    },
    camera: {
        flex: 1
    },
    buttonsContainer: {
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 40,
        marginHorizontal: 30
    },
    flipCameraButton: {
        width: 32,
        height: 32,
        marginRight: 'auto'
    },
    takeAPictureButton: {
        width: 64,
        height: 64,
        marginRight: 'auto'
    }
});
