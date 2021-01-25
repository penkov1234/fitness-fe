import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { headers, colors } from 'styles';
import closeRed from 'assets/close-red.png';
export default function LegendItem({ title, color }) {
    // active = true;
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
            <View
                style={{
                    width: 50,
                    height: 20,
                    backgroundColor: color,
                    // borderColor: colors.borderGrayColor(),
                    borderWidth: 1,
                    marginRight: 20,
                }}
            ></View>
            <Text style={[headers.H5()]}> {title} </Text>
        </View>
    );
}
