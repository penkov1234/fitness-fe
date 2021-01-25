import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import ProfileDetails from './ProfileDetails';
import { headers, colors } from 'styles';
// import { TouchableOpacity } from 'react-native-web';

export function MenuItem({ title, image, active, style, onClick }) {
    // active = true;
    return (
        <TouchableOpacity
            style={[
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '80%',
                    backgroundColor: active ? colors.background() : colors.background(0),
                    paddingLeft: 50,
                    paddingRight: 20,
                    paddingTop: 5,
                    paddingBottom: 5,
                    borderRadius: 12,
                    borderBottomColor: colors.themeSecoundary(),
                    borderBottomWidth: active ? 2 : 1,
                },
                style,
            ]}
            onClick={onClick}
        >
            <Text style={[active ? headers.H4('white', 'Bold') : headers.H4('white'), { flex: 1 }]}>{title}</Text>
            <Image style={{ width: 35, height: 35 }} source={image}></Image>
        </TouchableOpacity>
    );
}
