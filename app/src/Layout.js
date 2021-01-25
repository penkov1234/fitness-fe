import React, { useEffect, useState } from 'react';
import { Router, Switch, Route } from './router/index';
import Sidebar from 'module/components/Sidebar';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import CalendarScreen from 'module/screens/CalendarScreen';
import { tokenHelper } from './services/tokenHelpers';
import { Redirect } from 'react-router-dom';
import Menu from './Menu';
import rightArrowPNG from 'assets/right.png';
import leftArrowPNG from 'assets/left.png';
import { colors } from 'styles';
export default function Layout({ history }) {
    const [view, setView] = useState('Fitness plan');
    const [sideBarActive, setSideBarActive] = useState(true);

    if (!tokenHelper.auth) {
        return <Redirect to={'/login'}></Redirect>;
    }

    return (
        <View style={{ flexDirection: 'row', height: '100%', backgroundColor: colors.background(30) }}>
            <Sidebar history={history} view={view} setView={setView} sideBarActive={sideBarActive}></Sidebar>
            <TouchableOpacity
                style={{
                    // justifyContent: 'flex-end',
                    // alignSelf: 'flex-end',
                    zIndex: 0,
                    top: 20,
                    backgroundColor: colors.themePrimary(80),
                    borderColor: colors.themeSecoundary(),
                    borderWidth: 2,
                    // left: 0,
                    // position: 'absolute',
                    flexDirection: 'row',
                    borderRadius: '50%',
                    // zIndex: 20,
                    marginLeft: -22,
                    width: 44,
                    height: 44,
                    // top: 20,
                }}
                onPress={() => {
                    setSideBarActive(!sideBarActive);
                }}
            >
                <Image source={sideBarActive ? leftArrowPNG : rightArrowPNG} style={{ width: 40, height: 40 }}></Image>
            </TouchableOpacity>
            <Menu view={view}></Menu>
        </View>
    );
}
