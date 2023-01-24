/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { requestUserPermission, notificaation } from './Components/PushNotification_Helper';

export default function App() {
  useEffect(() => {
    requestUserPermission();
    notificaation();
  }, [])
  return (
    <View>
      <Text>App</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
