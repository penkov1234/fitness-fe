import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Routes } from './Routes';
import { Provider } from 'react-redux';
import store from 'redux/config/store';
import { tokenHelper } from 'services/tokenHelpers';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import GlobalFonts from 'styles/fonts';
import { backgroundColorStyles } from 'styles';
export default function App() {
    return (
        <Provider store={store}>
            <View style={[backgroundColorStyles.background, { flexGrow: 1 }]}>
                <Routes />
            </View>
        </Provider>
    );
}
