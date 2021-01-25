import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, ScrollView } from 'react-native';

import { Button, TextField } from '@material-ui/core';
import Link from '@material-ui/core/Link';
// import {  } from 'react-native-web';
import Background from 'assets/haramara yoga shared.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { passwordLoginAction, registerStartedAction } from '../../redux/actions/auth.actions';
import { stateIsLoaded, stateIsLoading } from '../../services/stateHelpers';
import { Redirect } from 'react-router-dom';
import FirstStep from '../components/register/FirstStep';
import SecondStep from '../components/register/SecondStep';
import { headers, colors, basicStyles } from 'styles';
// import arrowSVG from 'assets/Symbol 6 – 1.svg';
import grayArrowSVG from 'assets/Symbol 10 – 1.svg';
// import grayArrowSVG from 'assets/Path 25.svg';

import whiteArrowSVG from 'assets/whiteSVG.svg';
import pinkArrowSVG from 'assets/pinkSVG.svg';

export default function RegisterScreen({ history }) {
    const dispatch = useDispatch();
    const registerState = useSelector(state => state.register);
    // console.log(registerState);

    useEffect(() => {
        dispatch(registerStartedAction());
    }, []);

    return (
        <View style={{ backgroundColor: colors.background(10), flex: 1 }}>
            <ImageBackground
                source={Background}
                imageStyle={{ opacity: '60%' }}
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <View style={{ width: 400, padding: 20, backgroundColor: '#FFFFFF', boxShadow: '-10px 12px 15px -1px' + ' rgba(0,0,0,0.4)' }}>
                    <Text
                        style={{
                            fontSize: 30,
                            textAlign: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: colors.borderGrayColor(50),
                            paddingBottom: 20,
                            ...headers.H1(),
                        }}
                    >
                        Create your free account
                    </Text>
                    {/* <Text style={{ fontSize: 25, textAlign: 'center' }}>
                        Step: {stateIsLoaded(registerState.progress) && registerState.progress.data.progress}
                    </Text> */}
                    <View style={{ flexDirection: 'row', marginLeft: -10, marginTop: 30 }}>
                        <View
                            style={{
                                // borderWidth: 1,

                                width: 219,
                                height: 37,
                                textAlign: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingBottom: 5,
                                paddingLeft: 30,
                            }}
                        >
                            <Text style={[headers.H6('white', 'Medium')]}> Account information </Text>
                        </View>
                        <View
                            style={{
                                // borderWidth: 1,
                                width: 150,
                                height: 37,
                                // textAlign: 'center',
                                justifyContent: 'center',
                                // alignItems: 'center',
                                paddingBottom: 5,

                                // paddingLeft: 20,
                            }}
                        >
                            <Text style={[headers.H6('white', 'Medium')]}> Personal details </Text>
                        </View>
                        <Image source={whiteArrowSVG} style={{ position: 'absolute', width: 52, height: 37 }}></Image>
                        <Image
                            source={registerState.progress.data.progress === 1 ? grayArrowSVG : pinkArrowSVG}
                            style={{ position: 'absolute', width: 219, height: 38, zIndex: -1, left: 150 }}
                        ></Image>
                        <Image
                            source={registerState.progress.data.progress === 1 ? pinkArrowSVG : grayArrowSVG}
                            style={{ position: 'absolute', width: 219, height: 38, zIndex: -1 }}
                        ></Image>
                    </View>
                    {stateIsLoading(registerState.register) && registerState.progress.data.progress === 1 && <FirstStep></FirstStep>}
                    {stateIsLoading(registerState.register) && registerState.progress.data.progress === 2 && (
                        <SecondStep history={history}></SecondStep>
                    )}
                </View>
            </ImageBackground>
        </View>
    );
}
