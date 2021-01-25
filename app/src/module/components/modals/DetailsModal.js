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
import TextAndPictureModal from 'module/components/modals/TextAndPictureModal';

export default function DetailsModal({ history, setDetailsModal, detailsModal }) {
    const window = Dimensions.get('window');
    const [finishedWorkout, setFinishedWorkout] = useState(false);
    const [dimensions, setDimensions] = useState({ window });
    const [exercises, setExercises] = useState(detailsModal.exercises);
    const [textAndPictureModalInfo, setOpenTextAndPictureModal] = useState(false);
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
                    setDetailsModal(false);
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
                        onPress={() => {
                            ('propagated to this also');
                            setDetailsModal(false);
                        }}
                    ></CloseButton>
                </View>
                {/* <View
                    style={{
                        marginLeft: 25,
                        borderBottomWidth: 1,
                        paddingTop: 10,
                        paddingBottom: 10,
                        borderBottomColor: colors.borderGrayColor(30),
                        marginRight: 20,
                    }}
                >
                    <Text style={[headers.H1('black', 'Light')]}> Choose your workout</Text>
                </View> */}
                <ModalTitle title={'Daily workout details'}></ModalTitle>
                <View style={{ padding: 40, paddingBottom: 0, flex: 1 }}>
                    <TitledGroupBox style={{ padding: 30, flex: 1 }} titleStyle={headers.H4('black', 'Light')} title={'Day exercises'}>
                        <View style={[basicStyles.scrollView]}>
                            <ScrollView>
                                <View style={{ paddingBottom: 30 }}>
                                    <Text style={[headers.H5(null, 'Medium')]}>{detailsModal.dailyWorkoutName}</Text>
                                </View>
                                {exercises.map((el, index) => {
                                    return (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                paddingBottom: 7,
                                                paddingTop: 7,
                                                backgroundColor: el.previewButtonVisible ? colors.themeSecoundary(15) : colors.themeSecoundary(7),
                                                borderRadius: 5,
                                                marginBottom: 10,
                                            }}
                                            onMouseEnter={() => {
                                                el.previewButtonVisible = true;
                                                // console.log([...exercises]);
                                                setExercises([...exercises]);
                                            }}
                                            onMouseLeave={() => {
                                                el.previewButtonVisible = false;
                                                setExercises([...exercises]);
                                            }}
                                        >
                                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={[headers.H5(null, 'Italic'), { flex: 1, paddingLeft: 10, paddingRight: 10 }]}>
                                                    {' '}
                                                    Exercise {index + 1}:{' '}
                                                    <Text>
                                                        <Text style={[headers.H5(null, 'Medium')]}> {el.name} </Text> for {el.numReps} reps for{' '}
                                                        {el.numSets} sets
                                                    </Text>
                                                </Text>
                                                {
                                                    <WhiteOutlinedButton
                                                        title={'Preview'}
                                                        color={colors.themeSecoundary()}
                                                        style={{
                                                            opacity: el.previewButtonVisible ? 1 : 0,
                                                            backgroundColor: 'transparent',
                                                            padding: 5,
                                                            marginRight: 10,
                                                        }}
                                                        titleStyle={headers.H6(colors.themeSecoundary(), 'Bold')}
                                                        onPress={() => {
                                                            // setDetailsPropObj(el);
                                                            setOpenTextAndPictureModal(el);
                                                        }}
                                                    ></WhiteOutlinedButton>
                                                }
                                            </View>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        </View>
                    </TitledGroupBox>
                    {!detailsModal.withoutCompletedView && (
                        <View style={{ paddingTop: 10 }}>
                            {!detailsModal.isCompleted && (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[headers.H4('black', 'Light'), { width: 230 }]}> Completed the workout </Text>
                                    <Checkbox
                                        color="primary"
                                        name=" Set finished workot"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        onChange={el => {
                                            setFinishedWorkout(!finishedWorkout);
                                        }}
                                    />
                                </View>
                            )}
                            {detailsModal.isCompleted && (
                                <View style={{ alignItems: 'flexStart', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={checkboxPNG} style={{ width: 75, height: 50 }} />
                                    <Text style={[headers.H4('black', 'Bold'), { width: 230, textAlign: 'center', paddingBottom: 20 }]}>
                                        {' '}
                                        This workout is completed!{' '}
                                    </Text>
                                    <Text style={[headers.H4('black', 'Light'), { width: 230, textAlign: 'center' }]}>
                                        {' '}
                                        Total time spent <Text style={[headers.H4('black', 'Medium')]}>
                                            {' '}
                                            {Math.floor(detailsModal.hoursSpent)}{' '}
                                        </Text>{' '}
                                        hours and{' '}
                                        <Text style={[headers.H4('black', 'Medium')]}>
                                            {Math.floor((detailsModal.hoursSpent - Math.floor(detailsModal.hoursSpent)) * 60)}{' '}
                                        </Text>{' '}
                                        minutes.{' '}
                                    </Text>
                                </View>
                            )}
                            {finishedWorkout && (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[headers.H4('black', 'Light')]}> Estimated time </Text>

                                    <CustomInput
                                        maxSize={50}
                                        value={timeEstimated.hours}
                                        setValue={value => {
                                            setTimeEstimated({
                                                ...timeEstimated,
                                                hours: +value.name ? +value.name : value.name === '' ? 0 : timeEstimated.hours,
                                            });
                                        }}
                                    ></CustomInput>
                                    <Text style={[headers.H4('black', 'Light')]}> h </Text>
                                    <CustomInput
                                        maxSize={50}
                                        value={timeEstimated.min}
                                        setValue={value => {
                                            // console.log(value);
                                            setTimeEstimated({
                                                ...timeEstimated,
                                                min: +value.name ? +value.name : value.name === '' ? 0 : timeEstimated.min,
                                            });
                                        }}
                                    ></CustomInput>
                                    <Text style={[headers.H4('black', 'Light')]}> min </Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 20, marginRight: 20, marginTop: 10 }}>
                    <StandardButton
                        disabled={(!finishedWorkout || (!timeEstimated.hours && !timeEstimated.min)) && !detailsModal.isCompleted}
                        title={detailsModal.isCompleted ? 'Close' : 'Submit'}
                        color={colors.themeActive()}
                        style={{ borderRadius: 5, paddingLeft: 40, paddingRight: 40, paddingTop: 12, paddingBottom: 12 }}
                        hasShadow={true}
                        onPress={() => {
                            if (!detailsModal.isCompleted) {
                                // console.log(timeEstimated.hours, timeEstimated.min, timeEstimated.hours + timeEstimated.min / 60);
                                let date = dateToIsoConverter(new Date(detailsModal.dateTrained));
                                // console.log(date);
                                dispatch(updateWorkout(detailsModal.dailyWorkoutId, date, timeEstimated.hours + timeEstimated.min / 60, true));
                            }
                            setDetailsModal(false);
                        }}
                    ></StandardButton>
                    {/* <StandardButton></StandardButton> */}

                    {/* <ConfirmDialog open={open} handleClose={handleClose} handleConfirm={handleConfirm}></ConfirmDialog> */}
                </View>
            </View>
            {textAndPictureModalInfo && (
                <TextAndPictureModal
                    setModalOpen={setOpenTextAndPictureModal}
                    title={textAndPictureModalInfo.name}
                    text={textAndPictureModalInfo.description}
                    imageSource={textAndPictureModalInfo.imageUrl}
                />
            )}
        </ImageBackground>
    );
}
