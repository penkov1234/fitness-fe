import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Button, Dimensions, SafeAreaView } from 'react-native';
import { colors, headers } from 'styles';
import { InputBase, TextField, FormControl, InputLabel, MenuItem, Select, withStyles } from '@material-ui/core';
import CustomSelect from '../CustomSelect';
import CustomInput from 'module/components/CustomInput';
import TitledGroupBox from '../TitledGroupBox';
import CustomCounter from 'module/components/CustomCounter';
import StandardButton from '../buttons/StandardButton';
import CloseButton from '../buttons/CloseButton';
import WhiteOutlinedButton from 'module/components/buttons/WhiteOutlinedButton';

import CalendarDay from 'module/components/CalendarDay';
import ExerciseEntry from '../ExerciseEntry';
import { newWorkoutAction } from 'redux/actions/data.actions';
import { useDispatch, useSelector } from 'react-redux';
import ModalTitle from 'module/components/modals/components/ModalTitle';
import ConfirmDialogCreateWorkout from './ConfirmDialogCreateWorkout';

const BootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}))(InputBase);
export default function CreateWorkoutModal({ history, exercises, setCreateWorkoutModalOpen }) {
    const window = Dimensions.get('window');

    const [dimensions, setDimensions] = useState({ window });
    const [locked, setLocked] = useState(false);

    let defaultDayInfo = {
        dailyWorkoutName: '',
        exercises: [],
    };
    let defaultWeekInfo = {
        dailyWorkouts: [],
    };
    let defaultExercise = {
        exerciseName: '',
        numSets: 1,
        numReps: 1,
    };

    const dispatch = useDispatch();

    const [currentDayInWeekNum, setCurrentDayInWeekNum] = useState(1);
    const [currentWeekNum, setCurrentWeekNum] = useState(1);
    const [currentWeekInfo, setCurrentWeekInfo] = useState(defaultWeekInfo);
    const [currentDayInfo, setCurrentDayInfo] = useState(defaultDayInfo);
    const [currentExercise, setCurrentExercise] = useState(defaultExercise);
    const [openDialog, setOpenDialog] = useState(false);
    const [workoutIsSubmitted, setWorkoutIsSubmitted] = useState(false);

    const [workout, setWorkout] = useState({
        name: '',
        frequency: 3,
        difficulty: 'easy',

        dailyWorkouts: [],
    });

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
        // console.log(' CURRENT WEEEK NUMERO IS ');

        // console.log(currentWeekNum);
        if (currentWeekNum > 4) {
            setLocked(true);
        }
    }, [currentWeekNum]);
    // console.log(currentWeekInfo.dailyWorkouts.length + ' ' + workout.frequency);

    function handleExerciseClose(exercise) {
        currentDayInfo.exercises.splice(currentDayInfo.exercises.indexOf(exercise), 1);
        setCurrentDayInfo({
            ...currentDayInfo,
            exercises: [...currentDayInfo.exercises],
        });
    }

    function handleCreateNewWeek() {
        let weekInfo = currentWeekInfo.dailyWorkouts;
        weekInfo.forEach((el, index) => {
            el.weekNum = currentWeekNum;
            el.dayNum = index + 1;
        });
        setWorkout({ ...workout, dailyWorkouts: [...workout.dailyWorkouts, ...weekInfo] });
        setCurrentWeekNum(currentWeekNum + 1);
        setCurrentWeekInfo(defaultWeekInfo);
        setCurrentDayInWeekNum(1);
    }

    function repeatForAllWeeks() {
        let allDays = [];
        for (let i = currentWeekNum; i <= 4; i++) {
            for (let j = 0; j < currentWeekInfo.dailyWorkouts.length; j++) {
                let dayInfo = {
                    weekNum: i,
                    dayNum: j + 1,
                    dailyWorkoutName: currentWeekInfo.dailyWorkouts[j].dailyWorkoutName,
                    exercises: currentWeekInfo.dailyWorkouts[j].exercises,
                };
                allDays.push(dayInfo);
            }
        }
        setWorkout({ ...workout, dailyWorkouts: [...workout.dailyWorkouts, ...allDays] });
        setCurrentWeekNum(5);
    }
    function createWorkout(published) {
        workout.isPublished = published;
        dispatch(newWorkoutAction(workout));
        setWorkoutIsSubmitted(true);

        // setCreateWorkoutModalOpen(false);
    }

    return (
        <>
            {!workoutIsSubmitted && (
                <ImageBackground
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `linear-gradient(to bottom right, ${colors.themePrimary(100)}, ${colors.themePrimary(
                            50
                        )}, ${colors.themePrimary(70)}, ${colors.themeSecoundary(50)},  ${colors.themeSecoundary(100)} )`,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setCreateWorkoutModalOpen(false);
                        }}
                    >
                        <ImageBackground style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }} />
                    </TouchableOpacity>

                    <SafeAreaView
                        style={{
                            // width: '80%',
                            // height: '80%',
                            top: dimensions.window.height * 0.1,
                            marginLeft: dimensions.window.width * 0.1,
                            marginRight: dimensions.window.width * 0.1,
                            height: dimensions.window.height * 0.8,
                            backgroundColor: 'white',
                            boxShadow: '-10px 12px 11px -1px rgba(0,0,0,0.2)',
                        }}
                    >
                        <View style={{ position: 'absolute', zIndex: 99, width: 55, height: 55, right: 0 }}>
                            <CloseButton
                                title="close"
                                onPress={() => {
                                    setCreateWorkoutModalOpen(false);
                                }}
                            ></CloseButton>
                        </View>

                        <ModalTitle title={'Create your workout plan'} />
                        <ScrollView
                            style={{
                                paddingLeft: 45,
                                paddingTop: 30,
                                paddingRight: 40,
                                overflow: 'auto',
                                borderBottomColor: colors.borderGrayColor(30),
                                borderBottomWidth: 1,
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 20 }}>
                                <Text style={[headers.H4('black', 'Light'), { width: 230 }]}>1. Your workout name: </Text>

                                <CustomInput value={workout.name} setValue={value => setWorkout({ ...workout, name: value.name })} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 20 }}>
                                <Text style={[headers.H4('black', 'Light'), { width: 230 }]}>2. Choose your frequency: </Text>
                                <CustomSelect
                                    onChange={value => {
                                        setWorkout({ ...workout, frequency: +value });
                                    }}
                                    data={[3, 4, 5]}
                                    suffix={' days'}
                                ></CustomSelect>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 40 }}>
                                <Text style={[headers.H4('black', 'Light'), { width: 230 }]}>3. Choose the difficulty: </Text>
                                <CustomSelect
                                    onChange={value => {
                                        setWorkout({ ...workout, difficulty: value });
                                    }}
                                    data={['easy', 'medium', 'hard']}
                                ></CustomSelect>
                                <View>
                                    <Text> </Text>
                                </View>
                            </View>
                            <View>
                                <TitledGroupBox
                                    titleStyle={[headers.H4('black', 'Light')]}
                                    title={'4. Create your workout'}
                                    style={{ minWidth: 820 }}
                                >
                                    <View>
                                        <View style={{ paddingLeft: 25 }}>
                                            <Text style={[headers.H5('black', 'Italic'), { paddingBottom: 15 }]}>
                                                Week {!locked ? currentWeekNum : ' [filled]'}
                                            </Text>
                                            <Text style={[headers.H5('black', 'Italic'), { paddingLeft: 25, paddingBottom: 15 }]}>
                                                Day{' '}
                                                {!locked
                                                    ? currentDayInWeekNum < workout.frequency
                                                        ? currentDayInWeekNum
                                                        : workout.frequency
                                                    : '[filled]'}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 60, paddingBottom: 15 }}>
                                            <Text style={[headers.H5('black', 'Medium'), { width: 160 }]}> Daily workout title: </Text>
                                            <CustomInput
                                                value={currentDayInfo.dailyWorkoutName}
                                                setValue={value => setCurrentDayInfo({ ...currentDayInfo, dailyWorkoutName: value.name })}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 999, paddingLeft: 60, paddingBottom: 15 }}>
                                            <Text style={[headers.H5('black', 'Medium'), { width: 160, textAlign: 'left' }]}> Add exercise: </Text>
                                            <CustomInput
                                                hasSearch={true}
                                                hasTextAndPicture={true}
                                                hasOptions={true}
                                                options={exercises ? exercises.data.data : []}
                                                value={currentExercise.exerciseName}
                                                setValue={value =>
                                                    setCurrentExercise({ ...currentExercise, exerciseName: value.name, exerciseId: value.id })
                                                }
                                            ></CustomInput>

                                            <Text style={[headers.H6('black', 'Medium'), { paddingLeft: 8, paddingRight: 8, textAlign: 'center' }]}>
                                                # of sets
                                            </Text>
                                            <CustomCounter
                                                value={currentExercise.numSets}
                                                setValue={value => setCurrentExercise({ ...currentExercise, numSets: value })}
                                            ></CustomCounter>
                                            <Text style={[headers.H6('black', 'Medium'), { paddingLeft: 8, paddingRight: 8, textAlign: 'center' }]}>
                                                # of reps
                                            </Text>
                                            <CustomCounter
                                                style={{ marginRight: 10 }}
                                                value={currentExercise.numReps}
                                                setValue={value => setCurrentExercise({ ...currentExercise, numReps: value })}
                                            ></CustomCounter>
                                            <StandardButton
                                                title="Enter exercise"
                                                disabled={!currentExercise.exerciseId ? true : false}
                                                titleStyle={headers.H5('white', 'Medium')}
                                                style={{
                                                    padding: 10,
                                                    paddingRight: '2%',
                                                    paddingLeft: '2%',
                                                    marginLeft: 'auto',
                                                    marginRight: 10,
                                                    alignSelf: 'flex-end',
                                                }}
                                                onPress={() => {
                                                    if (currentExercise.exerciseId) {
                                                        setCurrentDayInfo({
                                                            ...currentDayInfo,
                                                            exercises: [...currentDayInfo.exercises, currentExercise],
                                                        });
                                                        setCurrentExercise({ exerciseName: '', numSets: 1, numReps: 1 });
                                                    }
                                                }}
                                            ></StandardButton>
                                            {/* <StandardButton */}
                                        </View>

                                        <View style={{ paddingTop: 20 }}>
                                            <TitledGroupBox titleStyle={headers.H5(null, 'Italic')} title={'Weeks preview'}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ width: 20, marginRight: 10 }}>
                                                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                                            <View
                                                                style={{
                                                                    width: 6,
                                                                    height: 35,
                                                                    backgroundColor:
                                                                        currentWeekNum > 1 ? colors.themeSecoundary() : colors.themeDull(),
                                                                    borderTopLeftRadius: 3,
                                                                    borderTopRightRadius: 3,
                                                                }}
                                                            ></View>
                                                            <View
                                                                style={{
                                                                    width: 6,
                                                                    height: 35,
                                                                    backgroundColor:
                                                                        currentWeekNum > 2 ? colors.themeSecoundary() : colors.themeDull(),
                                                                }}
                                                            ></View>
                                                            <View
                                                                style={{
                                                                    width: 6,
                                                                    height: 35,
                                                                    backgroundColor:
                                                                        currentWeekNum > 3 ? colors.themeSecoundary() : colors.themeDull(),
                                                                }}
                                                            ></View>
                                                            <View
                                                                style={{
                                                                    width: 6,
                                                                    height: 35,
                                                                    backgroundColor:
                                                                        currentWeekNum > 4 ? colors.themeSecoundary() : colors.themeDull(),
                                                                    borderBottomLeftRadius: 3,
                                                                    borderBottomRightRadius: 3,
                                                                }}
                                                            ></View>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={{
                                                            flex: 1,
                                                            justifyContent: 'flex-start',
                                                            flexDirection: 'row',
                                                            overflow: 'auto',
                                                            marginRight: 20,
                                                        }}
                                                    >
                                                        {currentWeekInfo.dailyWorkouts.map((dailyWorkout, index) => {
                                                            return (
                                                                <View key={index} style={{ alignItems: 'center', marginRight: 10 }}>
                                                                    <Text style={[headers.H2('black', 'Thin'), { paddingBottom: 10 }]}>
                                                                        Day {index + 1}
                                                                    </Text>
                                                                    <CalendarDay
                                                                        prototype={true}
                                                                        date={1}
                                                                        done={true}
                                                                        rest={false}
                                                                        workoutTitle={dailyWorkout.dailyWorkoutName}
                                                                        style={{ width: 140, height: 140, marginBottom: 10 }}
                                                                        currentWeek={false}
                                                                    ></CalendarDay>
                                                                </View>
                                                            );
                                                        })}
                                                        {currentWeekInfo.dailyWorkouts.length !== workout.frequency && (
                                                            <View style={{ alignItems: 'center' }}>
                                                                <Text style={[headers.H2('black', 'Thin'), { paddingBottom: 10 }]}>
                                                                    Day {currentWeekInfo.dailyWorkouts.length + 1}
                                                                </Text>
                                                                <TitledGroupBox
                                                                    style={{
                                                                        width: 330,
                                                                        height: 140,
                                                                        marginBottom: 10,
                                                                        borderRadius: 5,
                                                                        padding: 15,
                                                                    }}
                                                                >
                                                                    <ScrollView>
                                                                        {currentDayInfo.exercises.length === 0 && (
                                                                            <View>
                                                                                <Text style={[headers.H6(null, 'Italic')]}>
                                                                                    {' '}
                                                                                    No exercises added yet{' '}
                                                                                </Text>
                                                                            </View>
                                                                        )}
                                                                        {currentDayInfo.exercises.map((exercise, index) => {
                                                                            return (
                                                                                <ExerciseEntry
                                                                                    key={index}
                                                                                    onClose={() => handleExerciseClose(exercise)}
                                                                                    title={`${exercise.exerciseName} ${exercise.numSets} sets for ${exercise.numReps} reps`}
                                                                                ></ExerciseEntry>
                                                                            );
                                                                        })}
                                                                    </ScrollView>
                                                                </TitledGroupBox>
                                                            </View>
                                                        )}
                                                    </View>

                                                    <View style={{ alignSelf: 'center' }}>
                                                        <StandardButton
                                                            style={{ padding: 10, marginBottom: 10 }}
                                                            title={'Enter day workout'}
                                                            titleStyle={headers.H5('white', 'Medium')}
                                                            disabled={
                                                                currentWeekInfo.dailyWorkouts.length !== workout.frequency &&
                                                                currentDayInfo.dailyWorkoutName != '' &&
                                                                currentDayInfo.exercises.length > 0
                                                                    ? false
                                                                    : true
                                                            }
                                                            onPress={() => {
                                                                setCurrentWeekInfo({
                                                                    dailyWorkouts: [...currentWeekInfo.dailyWorkouts, currentDayInfo],
                                                                });
                                                                setCurrentDayInfo(defaultDayInfo);
                                                                setCurrentDayInWeekNum(currentDayInWeekNum + 1);
                                                            }}
                                                        >
                                                            {' '}
                                                        </StandardButton>
                                                        <StandardButton
                                                            style={{ padding: 10, marginBottom: 10 }}
                                                            titleStyle={headers.H5('white', 'Medium')}
                                                            title={'Repeat for all weeks'}
                                                            disabled={currentWeekInfo.dailyWorkouts.length === workout.frequency ? locked : true}
                                                            onPress={() => repeatForAllWeeks()}
                                                        ></StandardButton>
                                                        <StandardButton
                                                            style={{ padding: 10, paddingLeft: 20, paddingRight: 20 }}
                                                            titleStyle={headers.H5('white', 'Medium')}
                                                            title={'Enter and create new week'}
                                                            disabled={currentWeekInfo.dailyWorkouts.length === workout.frequency ? locked : true}
                                                            onPress={() => handleCreateNewWeek()}
                                                        ></StandardButton>
                                                    </View>
                                                </View>
                                            </TitledGroupBox>
                                        </View>
                                    </View>
                                </TitledGroupBox>
                            </View>
                        </ScrollView>
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', padding: 20, marginRight: 25 }}>
                            <StandardButton
                                title={'Submit workout'}
                                style={{ borderRadius: 5, paddingLeft: 40, paddingRight: 40, paddingTop: 12, paddingBottom: 12 }}
                                color={colors.themeActive()}
                                disabled={!locked || !workout.name}
                                onPress={() => {
                                    setOpenDialog(true);
                                }}
                                hasShadow={true}
                            ></StandardButton>
                            <ConfirmDialogCreateWorkout
                                open={openDialog}
                                handleClose={() => createWorkout(false)}
                                handleConfirm={() => createWorkout(true)}
                            ></ConfirmDialogCreateWorkout>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            )}
            {workoutIsSubmitted && (
                <ImageBackground
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `linear-gradient(to bottom right, ${colors.themePrimary(100)}, ${colors.themePrimary(
                            50
                        )}, ${colors.themePrimary(70)}, ${colors.themeSecoundary(50)},  ${colors.themeSecoundary(100)} )`,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setCreateWorkoutModalOpen(false);
                        }}
                    >
                        <ImageBackground style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }} />
                    </TouchableOpacity>
                    <View
                        style={{
                            justifyContent: 'center',
                            margin: 'auto',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            width: 700,
                            boxShadow: '-10px 12px 11px -1px rgba(0,0,0,0.2)',
                        }}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 30 }}>
                            <Text style={[headers.H2('black'), { padding: 20 }]}> You have just created a new workout plan! </Text>
                            <Text style={[headers.H5(), { padding: 20 }]}>
                                {' '}
                                You have successfully created a new workout plan. You can choose to subscribe to the workout plan you have just
                                created or other workout plans by opening the choose workout modal. If you published this workout plan we will also
                                keep statistics and notify you when users subscribe to your workout plan!{' '}
                            </Text>
                            <WhiteOutlinedButton
                                title={'Continue'}
                                onPress={() => {
                                    setCreateWorkoutModalOpen(false);
                                }}
                            ></WhiteOutlinedButton>
                        </View>
                    </View>
                </ImageBackground>
            )}
        </>
    );
}
