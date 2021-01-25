import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function AbsoluteImage({ top, left, imageSource, imageWidth, imageHeight, style, opacity, rotation }) {
    // active = true;
    return (
        <View
            style={{
                position: 'absolute',
                transform: [{ rotate: rotation ? rotation + 'deg' : '0deg' }],
                top: top ? top : 0,
                left: left ? left : 0,
                opacity: opacity,
                ...style,
            }}
        >
            <Image style={{ width: imageWidth ? imageWidth : 100, height: imageHeight ? imageHeight : 100 }} source={imageSource}></Image>
        </View>
    );
}
