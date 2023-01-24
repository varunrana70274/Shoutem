/* eslint-disable prettier/prettier */
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        GetFCMToke();
    }
}

async function GetFCMToke() {
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    console.log("Old Token", fcmtoken);
    if (!fcmtoken) {
        try {
            const fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log(fcmToken, "New FcmToken");
                await AsyncStorage.setItem("fcmtoken", fcmToken);
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}
export const notificaation = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
    });

    messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.notification,
                );
            }
        });

    messaging().onMessage(async remoteMessage => {
        console.log("Notification On froground .....", remoteMessage);
    });
}
