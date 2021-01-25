import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, Button, Dimensions, TouchableOpacity, Image } from 'react-native';
import { colors, headers, basicStyles } from 'styles';
import TitledGroupBox from '../TitledGroupBox';
import Checkbox from '@material-ui/core/Checkbox';
import { workoutPlanMock } from 'static/mockObjects';
import WhiteOutlinedButton from 'module/components/buttons/WhiteOutlinedButton';
import CloseButton from 'module/components/buttons/CloseButton';

import CustomInput from '../CustomInput';
import ModalTitle from 'module/components/modals/components/ModalTitle';
import StandardButton from 'module/components/buttons/StandardButton';
import { updateWorkout } from 'redux/actions/data.actions';
import { useDispatch } from 'react-redux';
import { dateToIsoConverter } from 'services/stringHelpers';
import checkboxPNG from 'assets/icons-for-web/checkbox.png';
import TextAndPicture from 'module/components/TextAndPicture';
export default function TextAndPictureModal({ history, modalOpen, setModalOpen, title, text, imageSource }) {
    // console.log(text);
    // console.log(imageSource);
    const window = Dimensions.get('window');
    const [finishedWorkout, setFinishedWorkout] = useState(false);
    const [dimensions, setDimensions] = useState({ window });
    const [timeEstimated, setTimeEstimated] = useState({
        hours: 0,
        min: 0,
    });
    // console.log(detailsModal);
    const onChange = ({ window, screen }) => {
        setDimensions({ window });
    };
    const dispatch = useDispatch();
    useEffect(() => {
        Dimensions.addEventListener('change', onChange);
        return () => {
            Dimensions.removeEventListener('change', onChange);
        };
    });
    return (
        <ImageBackground
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `linear-gradient(to bottom right, ${colors.themePrimary(100)}, ${colors.themePrimary(50)}, ${colors.themePrimary(
                    70
                )}, ${colors.themeSecoundary(50)},  ${colors.themeSecoundary(100)} )`,
            }}
        >
            <TouchableOpacity
                onPress={() => {
                    setModalOpen(false);
                }}
            >
                <ImageBackground style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }} />
            </TouchableOpacity>

            <View
                style={{
                    top: dimensions.window.height * 0.1,
                    marginLeft: dimensions.window.width * 0.33,
                    marginRight: dimensions.window.width * 0.33,
                    height: dimensions.window.height * 0.8,
                    backgroundColor: 'white',
                    boxShadow: '-10px 12px 11px -1px rgba(0,0,0,0.2)',
                    overflow: 'auto',
                }}
            >
                <View style={{ position: 'absolute', zIndex: 120, width: 55, height: 55, right: 0 }}>
                    <CloseButton
                        title="close"
                        onPress={event => {
                            setModalOpen(false);
                        }}
                    ></CloseButton>
                </View>

                <ModalTitle title={'Exercise details'}></ModalTitle>
                <TextAndPicture text={text} imageSource={imageSource} title={title} textStyle={[headers.H4()]} titleStyle={[headers.H2()]} />
            </View>
        </ImageBackground>
    );
}
