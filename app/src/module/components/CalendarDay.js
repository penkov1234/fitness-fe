import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { headers, colors } from 'styles';
import WhiteOutlinedButton from 'module/components/buttons/WhiteOutlinedButton';
import color from '@material-ui/core/colors/amber';

export default function CalendarDay({
    style,
    currentDay,
    empty,
    date,
    done,
    failed,
    rest,
    workoutTitle,
    currentWeek,
    prototype,
    el,
    detailsModal,
    setDetailsModal,
}) {
    let backgroundColor = colors.background(!currentDay ? (currentWeek ? 30 : 20) : 40);

    if (rest) {
        backgroundColor = colors.themeDull(!currentDay ? (currentWeek ? 30 : 10) : 50);
    }

    if (!done && !rest) {
        backgroundColor = colors.themeActive2(!currentDay ? (currentWeek ? 30 : 15) : 50);
    }
    if (empty) {
        backgroundColor = 'white';
    }
    if (failed) {
        backgroundColor = colors.workoutFailed(!currentDay ? (currentWeek ? 30 : 20) : 50);
    }
    return (
        <View
            style={[
                {
                    padding: 15,
                    backgroundColor: backgroundColor,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: colors.primaryText(),
                    height: currentWeek ? 220 : 'auto',
                },
                style,
            ]}
        >
            <View style={{ borderBottomWidth: 1, marginBottom: 15, borderColor: colors.primaryText(15), opacity: empty ? 0 : 1 }}>
                <Text style={[headers.H2('black', 'Bold')]}> {date ? date : 1} </Text>
            </View>
            <View style={{ flex: 1, marginBottom: 10 }}>
                {
                    <View
                        style={{
                            paddingBottom: currentWeek ? 15 : 0,
                            flex: 1,
                            opacity: empty ? 0 : 1,
                            minHeight: 40,
                            maxHeight: 140,
                            overflow: 'auto',
                        }}
                    >
                        <Text style={[headers.H5('black', currentDay ? 'Regular' : 'Thin'), { lineHeight: '1.3' }]}>
                            {rest
                                ? 'Rest day'
                                : currentWeek || prototype || rest
                                ? workoutTitle
                                : workoutTitle
                                ? `${workoutTitle.substring(0, 15)}...`
                                : ''}
                        </Text>
                    </View>
                }
            </View>

            {!rest && !empty && !prototype && (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', opacity: empty ? 0 : 1 }}>
                    <WhiteOutlinedButton
                        title={'Details'}
                        color={colors.themeActive2()}
                        onPress={() => {
                            setDetailsModal(el);
                        }}
                        titleStyle={headers.H5(colors.themeActive2(), 'Medium')}
                        style={{ flex: 1 }}
                    ></WhiteOutlinedButton>
                </View>
            )}
        </View>
    );
}
