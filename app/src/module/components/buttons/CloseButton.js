import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import { headers, colors } from 'styles';
import xCloseButtonPNG from 'assets/icons-for-web/embedding_matrix.png';
export default function CloseButton({ style, title, color, onPress, titleStyle, disabled, hasShadow }) {
    return (
        <TouchableOpacity
            style={[
                {
                    // backgroundColor: backgroundColor,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // padding: 3,
                    // paddingLeft: 10,
                    // paddingRight: 10,
                    // boxShadow: hasShadow ? '-4px 2px 6px -1px rgba(0,0,0,0.23)' : '',
                },
                style,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Image style={{ width: 50, height: 50 }} source={xCloseButtonPNG}></Image>
        </TouchableOpacity>
    );
}
