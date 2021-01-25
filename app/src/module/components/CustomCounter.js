import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { headers, colors } from 'styles';

export default function CustomCounter({ value, setValue, style }) {
    // const [value, setValue] = useState(1);
    let handleInputChange = type => {
        if (type === '-') {
            if (value > 1) {
                setValue(value - 1);
            }
        } else if (type === '+') {
            setValue(value + 1);
        }
    };
    return (
        <View style={{ flexDirection: 'row', borderColor: colors.borderGrayColor(), borderWidth: 1, padding: 5, borderRadius: 5, ...style }}>
            <TouchableOpacity
                style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightGreen() }}
                onPress={() => handleInputChange('-')}
            >
                <Text>-</Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
                <Text>{value}</Text>
            </View>
            <TouchableOpacity
                style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightGreen() }}
                onPress={() => handleInputChange('+')}
            >
                <Text>+</Text>
            </TouchableOpacity>
        </View>
    );
}
