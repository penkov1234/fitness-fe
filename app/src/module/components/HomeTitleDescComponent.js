import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, Button, Dimensions, TouchableOpacity, Image } from 'react-native';

import { headers, colors } from 'styles';

export default function HomeTitleDescComponent({ desc, title, width, style, children }) {
    return (
        <View style={{ width: '100%' }}>
            <View style={{ width: width ? width + '%' : '60%', ...style }}>
                <Text style={[headers.H1('white', null, 45), { textAlign: 'center' }]}> {title} </Text>
                <View style={{ paddingTop: 25 }}>
                    <Text style={[headers.H1('white'), { lineHeight: '1.5' }]}> {desc}</Text>
                </View>
            </View>
            {children}
        </View>
    );
}
