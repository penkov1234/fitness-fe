import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { headers, colors } from 'styles';

export default function StandardButton({ style, title, color, onPress, titleStyle, disabled, hasShadow }) {
    let backgroundColor = color ? color : colors.themePrimary();
    if (disabled) {
        backgroundColor = colors.disabled();
    }
    return (
        <TouchableOpacity
            style={[
                {
                    backgroundColor: backgroundColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3,
                    paddingLeft: 10,
                    paddingRight: 10,
                    boxShadow: hasShadow ? '-4px 2px 6px -1px rgba(0,0,0,0.23)' : '',
                },
                style,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[{ color: 'white' }, titleStyle]}> {title} </Text>
        </TouchableOpacity>
    );
}
