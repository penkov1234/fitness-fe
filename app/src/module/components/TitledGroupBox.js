import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { headers, colors } from 'styles';

export default function TitledGroupBox({ title, style, titleStyle, children, borderColor, backgroundColor }) {
    return (
        <SafeAreaView
            style={[{ borderWidth: 1, borderColor: borderColor ? borderColor : colors.borderGrayColor(100), borderRadius: 10, padding: 25 }, style]}
        >
            <View
                style={[
                    {
                        backgroundColor: backgroundColor ? backgroundColor : 'white',
                        position: 'absolute',
                        top: -10,
                        left: 15,
                        paddingLeft: 5,
                        paddingRight: 5,
                    },
                ]}
            >
                <Text style={[titleStyle ? titleStyle : headers.H4(null, 'Italic')]}>{title ? title : ''}</Text>
            </View>
            {children}
        </SafeAreaView>
    );
}
