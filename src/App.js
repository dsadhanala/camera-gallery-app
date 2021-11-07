import { registerRootComponent } from 'expo';
import React, { useState, useRef } from 'react';
import { StyleSheet, View, SafeAreaView, Alert, StatusBar, Platform, Image } from 'react-native';
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from 'expo-image-picker';
import { LandingView } from './components/landing-view';
import { CameraView } from './components/camera-view';

export function App() {
  const [startCamera, setStartCamera] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const camRef = useRef();

  const handleOpenCamera = async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      if (status !== 'granted') return Alert.alert('Camera Access denied!');
      setStartCamera(true);
  }

  const handleOpenGallery = async () => {
      const {status} = await await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') return Alert.alert('Gallery Access denied!');

      let photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 2],
        quality: 1,
      });

      if (photo.cancelled) return;

      const source = photo.uri;
      // show preview
      setPreviewImage(source);
      setStartCamera(false);
}

  const handleSave = async (photo) => {

      const { status: MediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (MediaLibraryStatus !== "granted" || status !== "granted") return Alert.alert('Please allow access to save the picture!');
      const assert = await MediaLibrary.createAssetAsync(photo);
      await MediaLibrary.createAlbumAsync('DU class app', assert);
  };

  const handleCapture = async () => {
    if (camRef.current) {
      const options = { quality: 1, base64: true, skipProcessing: true };

     if (!camRef) return;

      const photo = await camRef.current.takePictureAsync(options);
      const source = photo.uri;
      camRef.current.pausePreview();

      // save image to gallery
      await handleSave(source);

      // show preview
      setPreviewImage(source);
      setStartCamera(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {
          startCamera
          ? (<CameraView {...{ Camera, camRef, handleCapture }} />)
          : (<LandingView {...{ handleOpenCamera, handleOpenGallery, previewImage }} />)
        }
      </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  }
});

export default registerRootComponent(App);
