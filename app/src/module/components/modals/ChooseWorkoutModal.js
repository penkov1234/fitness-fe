import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, Button, Dimensions, Image } from 'react-native';
import { colors, headers } from 'styles';
import { InputBase, TextField, FormControl, InputLabel, MenuItem, Select, withStyles } from '@material-ui/core';
import CustomSelect from '../CustomSelect';
import CustomInput from 'module/components/CustomInput';
import TitledGroupBox from '../TitledGroupBox';
import CustomCounter from 'module/components/CustomCounter';
import StandardButton from '../buttons/StandardButton';
import CloseButton from '../buttons/CloseButton';

import CalendarDay from 'module/components/CalendarDay';
import ExerciseEntry from '../ExerciseEntry';
import { newWorkoutAction } from 'redux/actions/data.actions';
import { useDispatch, useSelector } from 'react-redux';
import { workoutPlanMock } from 'static/mockObjects';
import WhiteOutlinedButton from '../buttons/WhiteOutlinedButton';
import { TouchableOpacity, SafeAreaView } from 'react-native-web';
import DetailsModal from './DetailsModal';
import { getAllWorkoutsFiltered, getSubscribedWorkout, getUserInfo, subscribeToWorkout } from 'redux/actions/data.actions';
import ConfirmDialog from './ConfirmDialogSubscribe';
import { checkForSubscription, resetCheckForSubscription } from '../../../redux/actions/data.actions';
import { stateIsLoaded } from '../../../services/stateHelpers';
import ModalTitle from 'module/components/modals/components/ModalTitle';

import previewJPG from 'assets/icons-for-web/previewWHITE.png';

export default function ChooseWorkoutModal({
    history,
    exercises,
    setDetailsModal,
    detailsModalOpen,
    setChooseWorkoutModalOpen,
    setDetailsPropObj,
    detailsPropObj,
}) {
    let frequencyOptions = [
        {
            name: '3 days',
            value: 4,
            id: 1,
        },
        {
            name: '4 days',
            value: 4,
            id: 2,
        },
        {
            name: '5 days',
            value: 5,
            id: 3,
        },
    ];
    let difficultyOptions = [
        {
            name: 'Beginner',
            value: 4,
            id: 1,
        },
        {
            name: 'Intermediate',
            value: 4,
            id: 2,
        },
        {
            name: 'Proffesional',
            value: 5,
            id: 3,
        },
    ];
    let workoutTypeOptions = [
        {
            name: 'Beginner',
            value: 4,
            id: 1,
        },
        {
            name: 'Intermediate',
            value: 4,
            id: 2,
        },
        {
            name: 'Proffesional',
            value: 5,
            id: 3,
        },
    ];
    const dispatch = useDispatch();

    const workoutsFiltered = useSelector(state => state.workoutsFiltered.data);

    const checkForSubscriptionState = useSelector(state => state.checkForSubscription);

    const [open, setOpen] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        dispatch(resetCheckForSubscription());
    };

    const [workoutPlanFilters, setWorkoutPlanFilters] = useState({
        frequency: 3,
        difficulty: 'easy',
        workoutType: 'Bodybuilding',
        chosenWorkoutPlan: null,
    });
    const [mockWorkoutPlanState, setMockWorkoutPlanState] = useState(workoutPlanMock);

    const window = Dimensions.get('window');

    const [dimensions, setDimensions] = useState({ window });

    const onChange = ({ window, screen }) => {
        setDimensions({ window });
    };

    useEffect(() => {
        Dimensions.addEventListener('change', onChange);
        return () => {
            Dimensions.removeEventListener('change', onChange);
        };
    });

    useEffect(() => {
        dispatch(getAllWorkoutsFiltered(3, 'easy'));
    }, []);

    useEffect(() => {
        setWorkoutPlanFilters({ ...workoutPlanFilters, chosenWorkoutPlan: null });
        dispatch(getAllWorkoutsFiltered(workoutPlanFilters.frequency, workoutPlanFilters.difficulty));
    }, [workoutPlanFilters.frequency, workoutPlanFilters.difficulty]);

    // console.log(workoutPlanFilters.chosenWorkoutPlan);

    function subscribe() {
        dispatch(checkForSubscription());
    }

    useEffect(() => {
        if (stateIsLoaded(checkForSubscriptionState)) {
            // console.log(checkForSubscriptionState);
            if (checkForSubscriptionState.data.data === true && !open) {
                setOpen(true);
            } else if (confirmed) {
                dispatch(subscribeToWorkout(workoutPlanFilters.chosenWorkoutPlan.id));
                setOpen(false);
                setChooseWorkoutModalOpen(false);
                setConfirmed(false);
                dispatch(resetCheckForSubscription());
            } else {
                dispatch(subscribeToWorkout(workoutPlanFilters.chosenWorkoutPlan.id));
                dispatch(resetCheckForSubscription());
                setChooseWorkoutModalOpen(false);
            }
        }
    }, [checkForSubscriptionState, confirmed]);

    function handleConfirm() {
        setConfirmed(true);
        // dispatch(resetCheckForSubscription());
    }
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
                    setChooseWorkoutModalOpen(false);
                }}
            >
                <ImageBackground style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }} />
            </TouchableOpacity>
            <SafeAreaView
                style={{
                    top: dimensions.window.height * 0.1,
                    marginLeft: dimensions.window.width * 0.1,
                    marginRight: dimensions.window.width * 0.1,
                    height: dimensions.window.height * 0.8,
                    backgroundColor: 'white',
                    boxShadow: '-10px 12px 11px -1px rgba(0,0,0,0.2)',
                    overflow: 'auto',
                }}
            >
                <View style={{ position: 'absolute', zIndex: 99, width: 55, height: 55, right: 0 }}>
                    <CloseButton
                        title="close"
                        onPress={() => {
                            setChooseWorkoutModalOpen(false);
                        }}
                    ></CloseButton>
                </View>

                <ModalTitle title={'Choose your workout plan'} />

                <View style={{ paddingLeft: 45, paddingTop: 30, paddingRight: 45, flex: 1 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 35 }}>
                                <Text style={[headers.H4('black', 'Light'), { width: 230 }]}>1. Choose your frequency: </Text>

                                <CustomSelect
                                    data={[3, 4, 5]}
                                    suffix={' days'}
                                    onChange={value => {
                                        setWorkoutPlanFilters({ ...workoutPlanFilters, frequency: +value });
                                    }}
                                ></CustomSelect>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 35 }}>
                                {/* <Text>2. Choose difficulty </Text> */}
                                <Text style={[headers.H4('black', 'Light'), { width: 230 }]}>2. Choose difficulty: </Text>

                                <CustomSelect
                                    data={['easy', 'medium', 'hard']}
                                    onChange={value => setWorkoutPlanFilters({ ...workoutPlanFilters, difficulty: value })}
                                ></CustomSelect>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 35 }}>
                                <Text style={[headers.H4('black', 'Light'), { width: 230 }]}>3. Choose workout type: </Text>
                                <CustomSelect
                                    data={['Bodybuilding', 'Powerlifting']}
                                    onChange={value => setWorkoutPlanFilters({ ...workoutPlanFilters, workoutType: value })}
                                ></CustomSelect>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 35 }}>
                                <Text style={[headers.H4('black', 'Light'), { width: 230 }]}>4. Choose your workout:</Text>

                                <CustomInput
                                    maxSize={300}
                                    hasSearch={true}
                                    hasOptions={true}
                                    options={workoutsFiltered.yours ? [...workoutsFiltered.yours, ...workoutsFiltered.others] : []}
                                    value={workoutPlanFilters.chosenWorkoutPlan ? workoutPlanFilters.chosenWorkoutPlan.name : ''}
                                    setValue={value => setWorkoutPlanFilters({ ...workoutPlanFilters, chosenWorkoutPlan: value })}
                                ></CustomInput>
                            </View>
                        </View>
                        <SafeAreaView style={{ flex: 1, zIndex: -1 }}>
                            {true && (
                                <TitledGroupBox
                                    style={{
                                        flex: 1,
                                        padding: 25,
                                        paddingRight: 15,
                                    }}
                                    titleStyle={headers.H4('black', 'Light')}
                                    title={'Workout preview'}
                                >
                                    {workoutPlanFilters.chosenWorkoutPlan && workoutPlanFilters.chosenWorkoutPlan.id && (
                                        <View style={{ paddingBottom: 10 }}>
                                            <Text style={[headers.H5(null, 'Medium')]}>
                                                {workoutPlanFilters.chosenWorkoutPlan
                                                    ? workoutPlanFilters.chosenWorkoutPlan.name
                                                    : 'Nothing selected yet'}
                                            </Text>
                                        </View>
                                    )}
                                    {!(workoutPlanFilters.chosenWorkoutPlan && workoutPlanFilters.chosenWorkoutPlan.id) && (
                                        <View style={{ flex: 1, flexBasis: '100%' }}>
                                            <ImageBackground
                                                source={previewJPG}
                                                imageStyle={{ opacity: 0.3 }}
                                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                                            >
                                                <Text style={[headers.H1(null, 'Bold')]}>Choose a workout plan to preview it </Text>
                                            </ImageBackground>
                                        </View>
                                    )}
                                    <ScrollView>
                                        {workoutPlanFilters.chosenWorkoutPlan &&
                                            workoutPlanFilters.chosenWorkoutPlan.dailyWorkouts &&
                                            workoutPlanFilters.chosenWorkoutPlan.dailyWorkouts.map((el, index) => {
                                                return (
                                                    <View>
                                                        {(index + 1) % workoutPlanFilters.chosenWorkoutPlan.frequency === 1 && (
                                                            <View
                                                                style={{
                                                                    padding: 10,
                                                                    borderBottomWidth: 1,
                                                                    borderBottomColor: colors.borderGrayColor(20),
                                                                    marginRight: 20,
                                                                    marginBottom: 5,
                                                                }}
                                                            >
                                                                <Text style={[headers.H5('black', 'Italic')]}>
                                                                    Week {index / workoutPlanFilters.chosenWorkoutPlan.frequency + 1}{' '}
                                                                </Text>
                                                            </View>
                                                        )}
                                                        <View
                                                            onMouseEnter={() => {
                                                                el.previewButtonVisible = true;
                                                                setMockWorkoutPlanState({ ...workoutPlanFilters.chosenWorkoutPlan });
                                                            }}
                                                            onMouseLeave={() => {
                                                                el.previewButtonVisible = false;
                                                                setMockWorkoutPlanState({ ...workoutPlanFilters.chosenWorkoutPlan });
                                                            }}
                                                            style={{
                                                                flexDirection: 'row',
                                                                margin: 4,
                                                                padding: 4,
                                                                paddingLeft: 4,
                                                                paddingRight: 4,
                                                                marginleft: 6,
                                                                marginRight: 6,

                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                backgroundColor: el.previewButtonVisible
                                                                    ? colors.themeSecoundary(15)
                                                                    : colors.themeSecoundary(7),
                                                                borderRadius: 5,
                                                            }}
                                                        >
                                                            <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
                                                                <Text style={[headers.H6(null, 'Italic'), { lineHeight: '1.6' }]}>
                                                                    Day {(index % workoutPlanFilters.chosenWorkoutPlan.frequency) + 1}:{' '}
                                                                    {el.dailyWorkoutName}
                                                                </Text>
                                                            </View>
                                                            {
                                                                <WhiteOutlinedButton
                                                                    title={'Preview'}
                                                                    color={colors.themeSecoundary()}
                                                                    style={{
                                                                        opacity: el.previewButtonVisible ? 1 : 0,
                                                                        backgroundColor: 'transparent',
                                                                        padding: 5,
                                                                        marginRight: 2,
                                                                    }}
                                                                    titleStyle={headers.H6(colors.themeSecoundary(), 'Bold')}
                                                                    onPress={() => {
                                                                        el.withoutCompletedView = true;
                                                                        setDetailsModal(el);
                                                                        // setDetailsPropObj(el);
                                                                    }}
                                                                ></WhiteOutlinedButton>
                                                            }
                                                        </View>
                                                    </View>
                                                );
                                            })}
                                    </ScrollView>
                                </TitledGroupBox>
                            )}
                            {/* {!workoutPlanFilters.chosenWorkoutPlan && (
                                
                            )} */}
                        </SafeAreaView>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 20, marginRight: 20, marginTop: 10 }}>
                    <StandardButton
                        disabled={!workoutPlanFilters.chosenWorkoutPlan}
                        title="Subscribe"
                        color={colors.themeActive()}
                        style={{ borderRadius: 5, paddingLeft: 40, paddingRight: 40, paddingTop: 12, paddingBottom: 12 }}
                        hasShadow={true}
                        onPress={() => {
                            subscribe();
                        }}
                    ></StandardButton>

                    <ConfirmDialog open={open} handleClose={handleClose} handleConfirm={handleConfirm}></ConfirmDialog>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
