import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { headers, colors } from 'styles';
import { calendar } from 'static/mockObjects';
import PlaceholderImage from 'assets/OE7GBE0.jpg';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CalendarDay from './CalendarDay';
import { TouchableOpacity } from 'react-native-web';

function createCalendar(workoutSubscribed) {
    if (workoutSubscribed === undefined) {
        return;
    }
    const calendarObj = [];
    const dayToIntegerMap = {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thrusday: 4,
        Friday: 5,
        Saturday: 6,
        Sunday: 7,
    };
    const NUM_OF_EMPTY_DAYS = dayToIntegerMap[workoutSubscribed.calendarDTO.firstDayName] - 1;
    let weekEndDates = [];
    let firstEndDayDate = 7 - NUM_OF_EMPTY_DAYS;

    for (let i = firstEndDayDate; i <= workoutSubscribed.calendarDTO.numOfDays; i += 7) {
        weekEndDates.push(i);
    }
    // console.log(weekEndDates);
    let hasTitleRange = [];
    for (let i = 0; i < weekEndDates.length; i++) {
        // console.log(workoutSubscribed.calendarDTO.currentDay, weekEndDates[i]);
        if (workoutSubscribed.calendarDTO.currentDay <= weekEndDates[i]) {
            if (i > 0) hasTitleRange = [weekEndDates[i - 1] + 1, weekEndDates[i]];
            else {
                hasTitleRange = [1, weekEndDates[i]];
            }
            break;
        }
    }
    // console.log(hasTitleRange);
    for (let i = 0; i < NUM_OF_EMPTY_DAYS; i++) {
        calendarObj.push({
            empty: true,
        });
    }
    for (let i = 1; i <= workoutSubscribed.calendarDTO.numOfDays; i++) {
        let singleCalendarDay = {
            dayInMonth: i,
            dailyWorkoutName: '',
            rest: true,
            isCompleted: false,

            currentDay: i === workoutSubscribed.calendarDTO.currentDay,
            hasTitle: i >= hasTitleRange[0] && i <= hasTitleRange[1],
        };
        calendarObj.push(singleCalendarDay);
    }
    for (let i = 0; i < workoutSubscribed.dailyWorkouts.length; i++) {
        let el = workoutSubscribed.dailyWorkouts[i];
        // console.log(
        //     workoutSubscribed.calendarDTO.currentDay,
        //     el.dayInMonth,
        //     el.isCompleted,
        //     workoutSubscribed.calendarDTO.currentDay >= el.dayInMonth && !el.isCompleted
        // );

        calendarObj[el.dayInMonth + (NUM_OF_EMPTY_DAYS - 1)] = {
            ...calendarObj[el.dayInMonth + (NUM_OF_EMPTY_DAYS - 1)],
            rest: false,
            failed: workoutSubscribed.calendarDTO.currentDay >= el.dayInMonth && !el.isCompleted,
            ...el,
        };
    }
    // console.log(calendarObj);
    return calendarObj;
}

export default function Calendar({ onChangeMonth, workoutSubscribed, setDetailsModal, detailsModal }) {
    // console.log(workoutSubscribed);
    // const calendarMock = calendar;

    function goBackInMonths() {
        let calendarDTO = workoutSubscribed.calendarDTO;
        // console.log(workoutSubscribed.calendarDTO);
        if (calendarDTO) {
            {
                if (calendarDTO.monthNum === 1) {
                    onChangeMonth(12, calendarDTO.year - 1);
                } else {
                    onChangeMonth(calendarDTO.monthNum - 1, calendarDTO.year);
                }
            }
        }
    }
    function goForwardInMonths() {
        let calendarDTO = workoutSubscribed.calendarDTO;
        // console.log(workoutSubscribed.calendarDTO);

        if (calendarDTO) {
            {
                if (calendarDTO.monthNum === 12) {
                    onChangeMonth(1, calendarDTO.year + 1);
                } else {
                    onChangeMonth(calendarDTO.monthNum + 1, calendarDTO.year);
                }
            }
        }
        // if (calendarDTO !== undefined && calendarDTO.monthNum === 12) {
        //     console.log(calendarDTO);
        //     onChangeMonth(1, calendarDTO.year + 1);
        // } else {
        //     onChangeMonth(calendarDTO.monthNum + 1);
        // }
    }
    let calendarObj;
    if (workoutSubscribed.id !== undefined && workoutSubscribed.id !== null) {
        // console.log(workoutSubscribed);
        calendarObj = createCalendar(workoutSubscribed);
    }

    let weekDays = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    return (
        <View
            style={{
                backgroundColor: 'white',
                justifyContent: 'flex-end',
                overflow: 'auto',
                borderRadius: 5,
                borderColor: colors.borderGrayColor(),
                borderWidth: 1,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    marginRight: 20,
                    marginLeft: 20,
                    borderBottomWidth: 1,
                    padding: 10,
                    borderBottomColor: colors.borderGrayColor(25),
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity>
                    <ArrowBackIosIcon onClick={goBackInMonths}></ArrowBackIosIcon>
                </TouchableOpacity>
                <Text style={[headers.H1('black'), { paddingRight: 10, minWidth: 100 }]}>
                    {' '}
                    {workoutSubscribed.calendarDTO !== undefined &&
                        workoutSubscribed.calendarDTO.monthName + ' ' + workoutSubscribed.calendarDTO.year}
                </Text>
                <TouchableOpacity style={{ transform: [{ rotate: '180deg' }] }}>
                    {/* <ArrowForwardIosIcon onClick={goForwardInMonths}></ArrowForwardIosIcon> */}
                    <ArrowBackIosIcon onClick={goForwardInMonths}></ArrowBackIosIcon>
                </TouchableOpacity>
            </View>
            {(workoutSubscribed.id === undefined || workoutSubscribed.id === null) && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    <ImageBackground style={{ flex: 1, height: 600 }} source={PlaceholderImage}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 30, color: '#000000' }}>No subscription found in this month</Text>
                        </View>
                    </ImageBackground>
                </View>
            )}
            {workoutSubscribed.id !== undefined && workoutSubscribed.id !== null && (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', minWidth: 840 }}>
                    {calendarObj.map((el, index) => {
                        return (
                            <View key={index} style={{ flexBasis: '12%', marginBottom: 20, marginLeft: '2%' }}>
                                {index < weekDays.length && (
                                    <View style={[{ alignItems: 'center', padding: 5 }]}>
                                        <Text style={[headers.H2(null, 'Thin')]}> {weekDays[index]} </Text>
                                    </View>
                                )}

                                <CalendarDay
                                    setDetailsModal={setDetailsModal}
                                    detailsModal={detailsModal}
                                    currentDay={el.currentDay}
                                    empty={el.empty}
                                    date={el.dayInMonth}
                                    done={el.isCompleted}
                                    rest={el.rest}
                                    failed={el.failed}
                                    el={el}
                                    workoutTitle={el.dailyWorkoutName}
                                    style={{ flex: 1 }}
                                    currentWeek={el.hasTitle}
                                ></CalendarDay>
                            </View>
                        );
                    })}
                </View>
            )}
        </View>
    );
}
