import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { headers, colors } from 'styles';
import closeRed from 'assets/close-red.png';
import LegendItem from './LegendItem';
export default function LegendComponent({}) {
    // active = true;
    return (
        <View style={{ paddingLeft: 10, marginTop: 30 }}>
            <Text style={[headers.H2(), { padding: 10 }]}> Legend </Text>
            <View style={{ paddingLeft: 10 }}>
                {/* <View style={{ width: 50, height: 20, backgroundColor: colors.workoutDone() }}> </View> */}
                <LegendItem title={'Finished workout'} color={colors.background(50)}></LegendItem>
                <LegendItem title={'Failed workout'} color={colors.workoutFailed(50)}></LegendItem>
                <LegendItem title={'Incoming workout days'} color={colors.themeActive2(50)}></LegendItem>
                <LegendItem title={'Rest days'} color={colors.themeDull(50)}></LegendItem>
            </View>
        </View>
    );
}
