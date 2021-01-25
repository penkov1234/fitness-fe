import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { headers, colors } from 'styles';
import closeRed from 'assets/close-red.png';
export default function ExerciseEntry({ title, onClose }) {
    // active = true;
    return (
        <View style={{ flexDirection: 'row', padding: 3 }}>
            <View style={{ flex: 1 }}>
                <Text style={[headers.H5(), { flex: 1 }]}>{title}</Text>
            </View>
            <TouchableOpacity style={{ paddingRight: 10, paddingLeft: 5 }} onPress={onClose}>
                <Image style={{ width: 15, height: 15 }} source={closeRed}></Image>
            </TouchableOpacity>
        </View>
    );
}
