import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { headers, colors } from 'styles';

export default function WhiteOutlinedButton({ color, style, title, onPress, titleStyle, opacity }) {
    return (
        <TouchableOpacity
            style={[
                {
                    borderWidth: 2,
                    borderColor: color ? color : colors.themeActive(),
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 6,
                    paddingLeft: 10,
                    paddingRight: 10,
                    borderRadius: 5,
                },
                style,
            ]}
            onPress={onPress}
        >
            <Text style={[headers.H5(color ? color : colors.themeActive()), titleStyle]}> {title} </Text>
        </TouchableOpacity>
    );
}
