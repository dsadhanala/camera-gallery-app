import React from 'react';
import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import LaunchCameraIcon from '../icons/launch-camera.svg';
import GalleryIcon from '../icons/gallery.svg';
import placeholderImage from '../assets/app_landing.jpeg';

export function LandingView({ handleOpenCamera, handleOpenGallery, previewImage }) {
    return (
        <View style={styles.wrap}>
            <View style={styles.imagePreviewView}>
                <Text style={styles.imagePreviewLabel}>Image Preview</Text>
                <Image
                    resize="contain"
                    source={previewImage ? { uri: previewImage } : placeholderImage }
                    style={previewImage ? styles.imagePreview :  styles.placeholderImage}
                />
            </View>
            <View style={styles.buttonsWrap}>
                <View>
                    <Pressable onPress={handleOpenCamera} style={styles.launchCamera}>
                        <LaunchCameraIcon />
                    </Pressable>
                    <Text style={styles.title}>Camera</Text>
                </View>
                <View>
                    <Pressable onPress={handleOpenGallery} style={styles.launchCamera}>
                        <GalleryIcon />
                    </Pressable>
                    <Text style={styles.title}>Gallery</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        paddingTop: 0,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePreviewView: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 'auto'
    },
    imagePreviewLabel: {
        fontSize: 16,
        marginBottom: 10
    },
    imagePreview: {
        width: 300,
        height: 600,
        borderRadius: 12
    },
    title: {
        fontSize: 14,
        marginBottom: 10
    },
    launchCamera: {
        width: 48,
        height: 48
    },
    buttonsWrap: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    placeholderImage: {
        width: 300,
        height: 300
    }
});
