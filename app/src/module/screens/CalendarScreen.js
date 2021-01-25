import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { colors } from 'styles';
import CalendarDay from 'module/components/CalendarDay';
import Calendar from 'module/components/Calendar';
import { Button } from '@material-ui/core';
import WhiteOutlinedButton from 'module/components/buttons/WhiteOutlinedButton';
import StandardButton from 'module/components/buttons/StandardButton';
import CreateWorkoutModal from 'module/components/modals/CreateWorkoutModal';
import { getAllExercises } from 'redux/actions/data.actions';
import { useDispatch, useSelector } from 'react-redux';
import ChooseWorkoutModal from 'module/components/modals/ChooseWorkoutModal';
import DetailsModal from 'module/components/modals/DetailsModal';
import { headers, basicStyles } from 'styles';
import { setFetchCalendar } from 'redux/actions/vars.actions';
import { getAllWorkoutsFiltered, getSubscribedWorkout, getUserInfo, subscribeToWorkout } from '../../redux/actions/data.actions';
import { stateIsLoaded } from '../../services/stateHelpers';
import LegendComponent from 'module/components/LegendComponent';

export default function CalendarScreen({ history }) {
    const [createWorkoutModalOpen, setCreateWorkoutModalOpen] = useState(false);
    const [chooseWorkoutModalOpen, setChooseWorkoutModalOpen] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);
    const [detailsPropObj, setDetailsPropObj] = useState({});
    const allExercises = useSelector(state => state.allExercises);
    const fetchCalendar = useSelector(state => state.globalVars.data.fetchCalendar);
    const dispatch = useDispatch();
    // const []

    const workoutSubscribed = useSelector(state => state.workoutsSubscribed.data);
    const userDetails = useSelector(state => state.workoutsSubscribed.data);

    useEffect(() => {
        // console.log('fetch calendar', fetchCalendar);
        if (fetchCalendar) {
            dispatch(getSubscribedWorkout());
            dispatch(setFetchCalendar(false));
        }
    }, [fetchCalendar]);

    // getAllExercises;
    useEffect(() => {
        dispatch(getAllExercises());
        // dispatch(subscribeToWorkout(2));
        // dispatch(getAllWorkoutsFiltered(3, 'hard'));
    }, []);

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    function onChangeMonth(month, year) {
        dispatch(getSubscribedWorkout(month, year));
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={[basicStyles.scrollView]}>
                <View style={{ flexDirection: 'row', padding: 90, paddingBottom: 0, paddingTop: 40 }}>
                    <View style={{ flex: 1, justifyContent: 'flex-end', paddingLeft: 30 }}>
                        <Text style={[headers.H2(colors.secoundaryText(), 'Light'), { marginBottom: 12 }]}>Workout plan</Text>
                        {workoutSubscribed.name && <Text style={[headers.H1(colors.primaryText(), 'Light')]}>{workoutSubscribed.name} </Text>}
                        {!workoutSubscribed.name && (
                            <Text style={[headers.H3(colors.primaryText(), 'Light')]}>
                                You have not yet subscribed to any of the workout plans for this month!{' '}
                            </Text>
                        )}
                    </View>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <StandardButton
                            hasShadow={true}
                            title={'Create workout'}
                            color={colors.themeActive()}
                            titleStyle={headers.H5('white', 'Black-Cond')}
                            style={{ borderRadius: 5, paddingLeft: 40, paddingRight: 40, paddingTop: 12, paddingBottom: 12, marginBottom: 15 }}
                            onPress={() => setCreateWorkoutModalOpen(true)}
                        ></StandardButton>
                        <StandardButton
                            hasShadow={true}
                            title={'Choose workout'}
                            color={colors.themeActive()}
                            titleStyle={headers.H5('white', 'Black-Cond')}
                            style={{ borderRadius: 5, paddingLeft: 40, paddingRight: 40, paddingTop: 12, paddingBottom: 12 }}
                            onPress={() => setChooseWorkoutModalOpen(true)}
                        ></StandardButton>
                    </View>
                </View>

                <View style={{ padding: 90, paddingTop: 40 }}>
                    <Calendar
                        onChangeMonth={onChangeMonth}
                        detailsModal={detailsModal}
                        setDetailsModal={setDetailsModal}
                        workoutSubscribed={workoutSubscribed}
                    ></Calendar>
                    <LegendComponent></LegendComponent>
                </View>
            </ScrollView>

            {createWorkoutModalOpen && (
                <CreateWorkoutModal setCreateWorkoutModalOpen={setCreateWorkoutModalOpen} exercises={allExercises}></CreateWorkoutModal>
            )}
            {chooseWorkoutModalOpen && (
                <ChooseWorkoutModal
                    detailsModal={detailsModal}
                    setDetailsModal={setDetailsModal}
                    setChooseWorkoutModalOpen={setChooseWorkoutModalOpen}
                    detailsPropObj={detailsPropObj}
                    setDetailsPropObj={setDetailsPropObj}
                ></ChooseWorkoutModal>
            )}
            {detailsModal && <DetailsModal detailsModal={detailsModal} setDetailsModal={setDetailsModal}></DetailsModal>}
        </SafeAreaView>
    );
}
