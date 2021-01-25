import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { colors, basicStyles, headers } from 'styles';

import { useDispatch, useSelector } from 'react-redux';
import { registerStartedAction } from '../../redux/actions/auth.actions';
import WhiteOutlinedButton from 'module/components/buttons/WhiteOutlinedButton.js';
import HomeTitleDescComponent from 'module/components/HomeTitleDescComponent';
import AbsoluteImage from 'module/components/AbsoluteImage';
import pinkGuyPNG from 'assets/icons-for-web/output-onlinepngtools (1).png';
import orangeJumpingGirlPNG from 'assets/icons-for-web/output-onlinepngtools (2).png';
import breadPNG from 'assets/icons-for-web/output-onlinepngtools (3).png';
import vagaPNG from 'assets/icons-for-web/output-onlinepngtools (5).png';
import blueGuyPNG from 'assets/icons-for-web/output-onlinepngtools (7).png';
import bodyBuildGirlPNG from 'assets/icons-for-web/af92c7542d43fbbc575c862395966ecd-woman-bodybuilder-silhouette-by-vexels.png';
import kcalIcon from 'assets/icons-for-web/kcal icon.png';
export default function HomeScreen({ history }) {
    const dispatch = useDispatch();
    const registerState = useSelector(state => state.register);
    // console.log(registerState);

    useEffect(() => {
        dispatch(registerStartedAction());
    }, []);

    return (
        <ScrollView style={[{ backgroundColor: colors.themePrimary(100) }, basicStyles.scrollView]}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 20 }}>
                <WhiteOutlinedButton
                    onPress={() => history.push('/register')}
                    title={'REGISTER'}
                    style={{ margin: 20, marginRight: 0, width: 150, padding: 10 }}
                ></WhiteOutlinedButton>

                <WhiteOutlinedButton
                    title={'LOG IN'}
                    onPress={() => history.push('/login')}
                    style={{ margin: 20, width: 150, padding: 10, backgroundColor: 'transparent' }}
                ></WhiteOutlinedButton>
            </View>
            <View style={{ padding: 100 }}>
                <View>
                    <AbsoluteImage
                        imageSource={orangeJumpingGirlPNG}
                        top={-100}
                        left={-120}
                        imageWidth={200}
                        imageHeight={300}
                        opacity={0.5}
                        rotation={10}
                    ></AbsoluteImage>
                    <AbsoluteImage
                        imageSource={bodyBuildGirlPNG}
                        top={50}
                        left={'65%'}
                        imageWidth={300}
                        imageHeight={400}
                        opacity={0.4}
                    ></AbsoluteImage>
                    <AbsoluteImage imageSource={pinkGuyPNG} top={1000} left={'5%'} imageWidth={350} imageHeight={400} opacity={0.55}></AbsoluteImage>

                    <AbsoluteImage imageSource={breadPNG} top={350} left={'10%'} imageWidth={202} imageHeight={150} opacity={0.2}></AbsoluteImage>

                    {/* <AbsoluteImage imageSource={vagaPNG}></AbsoluteImage> */}
                    {/* <AbsoluteImage
                        imageSource={blueGuyPNG}
                        top={550}
                        left={'90%'}
                        rotation={-15}
                        imageWidth={350}
                        imageHeight={300}
                        opacity={0.4}
                    ></AbsoluteImage> */}
                </View>
                <View style={{ width: '90%', paddingBottom: 130 }}>
                    <Text style={[headers.H1('white', null, 50), { paddingBottom: 75 }]}> YOUR FITNESS PLANNER </Text>
                    <Text style={[headers.H1('white', null, 40), { lineHeight: '1.5' }]}>
                        Get the best workout plans from our expirienced trainers, track your calories and learn everything you need to know about your
                        meal plan. All in one app!
                    </Text>
                </View>
                <HomeTitleDescComponent
                    title={'Choose your workouts for free!'}
                    desc={'Over 200 workouts for bodybuilding, crossfit, powerlifting and many others! Take a plan and record your progress!'}
                    width={60}
                    style={{ alignSelf: 'flex-end', paddingBottom: 150 }}
                ></HomeTitleDescComponent>
                <HomeTitleDescComponent
                    title={'Build your own workout'}
                    desc={
                        'Create your own workouts, define your own rules and timetables and follow your progress! Learn more about exercises and choose the perfect set for your workouts. '
                    }
                    width={60}
                    style={{ paddingBottom: 600, position: 'relative' }}
                >
                    <View
                        style={{
                            width: 630,
                            height: 630,
                            backgroundColor: colors.themeDull(),
                            position: 'absolute',
                            right: 0,
                            top: 200,
                            zIndex: -1,

                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '50%',
                        }}
                    >
                        {/* <HomeTitleDescComponent
                        title={'Track your calories'}
                        desc={'Enter what you eat daily and calculate your calorie intake! Set goals and get rewarded for doing things right.'}
                        width={60}
                        style={{ paddingLeft: 50 }}
                    ></HomeTitleDescComponent> */}
                        <Text style={[headers.H1('white', null, 45), { textAlign: 'center' }]}> {'Track your calories'} </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                            <View style={{ padding: 40, flex: 1 }}>
                                <Text style={[headers.H1('white'), { textAlign: 'center' }]}>
                                    Enter what you eat daily and calculate your calorie intake! Set goals and get rewarded for doing things right.
                                </Text>
                            </View>
                            <Image source={kcalIcon} style={{ width: 300, height: 300, marginRight: 20 }} />
                        </View>
                    </View>
                </HomeTitleDescComponent>

                <HomeTitleDescComponent
                    title={'Visualize your progress like never before!'}
                    desc={
                        'With the help of our statistics and graphs, follow your progress, check your determiness and your disciplene toward your goals!.'
                    }
                    width={60}
                    style={{}}
                ></HomeTitleDescComponent>
            </View>
        </ScrollView>
    );
}
