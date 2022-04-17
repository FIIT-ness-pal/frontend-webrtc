import React from 'react';
import { Text, View, Button, SafeAreaView, StatusBar } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { mediaDevices, RTCView, MediaStream, RTCPeerConnection, RTCIceCandidate, RTCSessionDescription } from "react-native-webrtc";
import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'

const Butt = (press) => {
    return (
        <View>
            <Button title="Call" onPress={() => press} />
        </View>
    )
}

const GettingCall = (joinCall, hangUpCall) => {
    return (
        <View>
            <Button title="Join Call" onPress={joinCall} />
            <Button title="Hang Up" onPress={hangUpCall} />
        </View>
    )
}

const Video = (hangUp, localStream, remoteStream) => {
    if(localStream && !remoteStream) {
        return (
            <View>
                <RTCView streamURL={localStream.toURL()} style={{ width: 200, height: 200 }} />
                <View>
                    <Button title="Hang Up" onPress={hangUp} />
                </View>
            </View> 
        )
    }

    if(localStream && remoteStream) {
        return (
            <View>
                <RTCView streamURL={localStream.toURL()} style={{ width: 200, height: 200 }} />
                <RTCView streamURL={remoteStream.toURL()} style={{ width: 200, height: 200 }} />
                <View>
                    <Button title="Hang Up" onPress={hangUp} />
                </View>
            </View> 
        )
    }
    
    return (
        <View>
            <Button title="Hang Up" onPress={hangUp} />
        </View>
    )
}

const Call = () => {
    const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
    
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [incomingCall, setIncomingCall] = useState(false);

    const pc = useRef();
    const connection = useRef(false);

    useEffect(() => {
        let callReference = firestore().collection('calls').doc('callId');
        let subcribe = callReference.onSnapshot(snapshot => {
            let data = snapshot.data();

            // answer -> start the call
            if(pc.current && !pc.current.remoteDescripion && data && data.answer) {
                pc.current.setRemoteDescription(new RTCSessionDescription(data.answer));
            }

            // there is offer for callId -> set incoming call state
            if(data && data.offer && !connection.current) {
                setIncomingCall(true);
            }
        });

        // on delete of collection call hangup, other side clicked on hangup
        let subcribeDelete = callReference.collection('callee').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'removed') {
                    hangUpCall();
                }
            });
        });

        return () => {
            subcribe();
            subcribeDelete();
        }

    }, []);

    let getStream = async () => {
        let isFront = true;
        let sourceInfos = await mediaDevices.enumerateDevices();
        console.log(sourceInfos);
        let videoSourceId;

        for (let i = 0; i < sourceInfos.length; i++) {
            const sourceInfo = sourceInfos[i];
            if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
                videoSourceId = sourceInfo.deviceId;
            }
        }

        let stream = await mediaDevices.getUserMedia({
            audio: true,
            video: {
                width: 640,
                height: 480,
                frameRate: 30,
                facingMode: (isFront ? "user" : "environment"),
                deviceId: videoSourceId
            }
        });

        if(typeof(stream) != 'boolean') return stream;
        return null;
    }

    let setupWebRTC = async () => {
        pc.current = new RTCPeerConnection(configuration);

        // Audio and video stream from call
        let stream = await getStream();
        if(stream) {
            setLocalStream(stream);
            pc.current.addStream(stream);
        }

        pc.current.onaddstream = (event) => {
            setRemoteStream(event.stream);
        }
    }

    let createConnection = async () => {
        console.log('sadas')
        connection.current = true;
        await setupWebRTC();

        // Firestore document for the call
        let callReference = firestore().collection('calls').doc('callId');
        // Exchange the ICE candidates between caller and callee
        collectIceCandidates(callReference, 'caller', 'callee');

        if(pc.current) {
            // Create call offer, store it under the document
            let offer = await pc.current.createOffer();
            pc.current.setLocalDescription(offer);

            let callData = {
                offer: {
                    type: offer.type,
                    sdp: offer.sdp
                }
            }

            callReference.set(callData);
        }
    }

    let joinCall = async () => {
        connection.current = true;
        setIncomingCall(false);

        let callReference = firestore().collection('calls').doc('callId');
        let offer = await callReference.get();
        offer = offer.data().offer;

        if(offer) {
            await setupWebRTC();
            // reversed parameters
            collectIceCandidates(callReference, 'callee', 'caller');

            if(pc.current) {
                pc.current.setRemoteDescription(new RTCSessionDescription(offer));

                let answer = await pc.current.createAnswer();
                pc.current.setLocalDescription(answer);

                let callData = {
                    answer: {
                        type: answer.type,
                        sdp: answer.sdp
                    }
                }

                callReference.update(callData);
            }
        }
    }

    let hangUpCall = async () => {
        setIncomingCall(false);
        connection.current = false;
        
        // Release the stream
        if(localStream) {
            localStream.getTracks().forEach(track => track.stop());
            localStream.release();
        }
        setLocalStream(null);
        setRemoteStream(null);
        
        // Remove doc from firestore
        let callReference = firestore().collection('calls').doc('callId');
        if(callReference) {
            let calleeCandidate = await callReference.collection('callee').get();
            calleeCandidate.forEach(async (candidate) => {
                await candidate.ref.delete();
            });

            let callerCandidate = await callReference.collection('caller').get();
            callerCandidate.forEach(async (candidate) => {
                await candidate.ref.delete();
            });

            callReference.delete();
        }

        if(pc.current) {
            pc.current.close();
            pc.current = null;
        }
    }

    let collectIceCandidates = async (callReference, localName, remoteName) => {
        let candidateCollection = callReference.collection(localName);

        if(pc.current) {
            // On new ICE candidate add it to the firestore
            pc.current.onicecandidate = (event) => {
                if(event.candidate) {
                    candidateCollection.add({candidate: event.candidate});
                }
            }
        }

        // Get the ICE candidate added to the firestore adn update local PC
        callReference.collection(remoteName).onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added') {
                    let candidate = new RTCIceCandidate(change.doc.data());
                    pc.current.addIceCandidate(candidate);
                } 
            });
        });
    }

    if (incomingCall) {
        // hangup, join
        // return getting call
        return (
            <View>
                <Button title="Join Call" onPress={() => joinCall()} />
                <Button title="Hang Up" onPress={() => hangUpCall()} />
            </View>
        )
    }

    if (localStream) {
        // hangup, local stream, remote stream
        // return video
        // <Video>
        if(localStream && !remoteStream) {
            return (
                <View>
                    <RTCView streamURL={localStream.toURL()} style={{ width: 200, height: 200 }} />
                    <View>
                        <Button title="Hang Up" onPress={() => hangUpCall()} />
                    </View>
                </View> 
            )
        }
    
        if(localStream && remoteStream) {
            return (
                <View>
                    <RTCView streamURL={localStream.toURL()} style={{ width: 200, height: 200 }} />
                    <RTCView streamURL={remoteStream.toURL()} style={{ width: 200, height: 200 }} />
                    <View>
                        <Button title="Hang Up" onPress={() => hangUpCall()} />
                    </View>
                </View> 
            )
        } 
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Button title="Call" onPress={() => createConnection()} />
            </View>
        </SafeAreaView>
    );
}

export default Call;