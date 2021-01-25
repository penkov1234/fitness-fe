import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, Button, Dimensions, TouchableOpacity, Image } from 'react-native';

import CloseButton from 'module/components/buttons/CloseButton';

import ModalTitle from 'module/components/modals/components/ModalTitle';

import { useDispatch } from 'react-redux';
import { headers, colors } from 'styles';

export default function TextAndPicture({ text, imageSource, style, title, textStyle, titleStyle }) {
    // console.log(text);
    // console.log(imageSource.replace('imgur', 'i.imgur') + '.png');

    return (
        <View style={[{ paddingBottom: 0, flex: 1, borderColor: colors.borderGrayColor(), borderWidth: 1 }, style]}>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20, paddingTop: 10, paddingBottom: 10 }}>
                <Text style={[headers.H3(), { textAlign: 'center' }, titleStyle]}>{title ? title : 'Title'}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, padding: 20, marginBottom: 10 }}>
                    <Text style={[headers.H6('black'), textStyle]}>{text} </Text>
                </ScrollView>
                {imageSource && (
                    <Image
                        source={{ uri: imageSource.replace('imgur', 'i.imgur') + '.png' }}
                        style={{ flex: 1, resizeMode: 'cover', justifyContent: 'center', alignItems: 'center' }}
                    ></Image>
                )}
            </View>
        </View>
    );
}
