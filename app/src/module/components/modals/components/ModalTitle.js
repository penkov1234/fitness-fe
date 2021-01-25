import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { colors, headers } from 'styles';
export default function ModalTitle({ title }) {
    return (
        <View
            style={{
                marginLeft: 25,
                borderBottomWidth: 1,
                paddingTop: 10,
                paddingBottom: 10,
                borderBottomColor: colors.borderGrayColor(30),
                marginRight: 20,
            }}
        >
            <Text style={[headers.H1('black', 'Medium')]}> {title}</Text>
        </View>
    );
}
