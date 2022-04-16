import React from 'react';
import { Text, View, Button, SafeAreaView, StatusBar } from 'react-native';
import { mediaDevices, RTCView } from "react-native-webrtc";
import { useState } from 'react';

const Call = () => {
    const [stream, setStream] = useState(null);

    const start = async () => {
        console.log("start");
        if (!stream) {
        let s;
        try {
            s = await mediaDevices.getUserMedia({ video: true });
            setStream(s);
        } catch (e) {
            console.error(e);
        }
        }
    };

    const stop = () => {
        console.log("stop");
        if (stream) {
        stream.release();
        setStream(null);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flex: 1 }}>
            {stream && <RTCView streamURL={stream.toURL()} />}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <Button title="Start" onPress={start} />
            <Button title="Stop" onPress={stop} />
        </View>
        </SafeAreaView>
    );
}

export default Call;