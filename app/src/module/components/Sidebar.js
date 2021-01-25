import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Picker, TouchableOpacity, Image, Animated } from 'react-native';
import ProfileDetails from './ProfileDetails';
import { headers, colors } from 'styles';
import Modal from 'react-modal';
import { MenuItem as MenuItemCustom } from './MenuItem';
import workoutIcon from 'assets/icons-for-web/gym-512.png';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Icon } from '@material-ui/core';
import { PersonalInfo } from './PersonalInfo';
import { useDispatch, useSelector } from 'react-redux';
import { stateIsLoaded } from '../../services/stateHelpers';
import { logoutAction } from '../../redux/actions/auth.actions';
import rightArrowPNG from 'assets/right.png';
import leftArrowPNG from 'assets/left.png';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
export default function Sidebar({ history, view, setView, sideBarActive }) {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [personalInfoModalOpen, setPersonalInfoModalOpen] = useState(false);
    const userInfoState = useSelector(state => state.userInfo);
    let flexAnim = useRef(new Animated.Value(1)).current;

    const anim = flexAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0.5%', '25%'],
    });
    const anim2 = flexAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 275],
    });
    useEffect(() => {
        if (sideBarActive) {
            Animated.timing(flexAnim, { toValue: 1, duration: 500 }).start();
        } else {
            Animated.timing(flexAnim, { toValue: 0, duration: 500 }).start();
        }
    }, [sideBarActive]);

    let image = '';
    let name = '';
    let surname = '';
    let placeholderImage =
        'data:image/png;base64,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';
    if (stateIsLoaded(userInfoState)) {
        if (!image.length && userInfoState.data.data.profile_picture !== null) {
            image = 'data:image/png;base64,' + userInfoState.data.data.profile_picture;
        }
        if (!name.length) {
            name = userInfoState.data.data.name;
        }
        if (!surname.length) {
            surname = userInfoState.data.data.lastName;
        }
    }

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = el => {
        setView(el.name);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    function logout() {
        dispatch(logoutAction());
        history.replace('/login');
    }
    const mockMenu = [
        {
            name: 'Fitness plan',
            icon: workoutIcon,
        },
        {
            name: 'Statistics',
            icon: workoutIcon,
        },
        {
            name: 'Meal plan',
            icon: workoutIcon,
        },
        {
            name: 'Calorie tracker',
            icon: workoutIcon,
        },
        {
            name: 'Goals tracker',
            icon: workoutIcon,
        },
    ];
    function handleOpen() {
        handleClose();
        setPersonalInfoModalOpen(true);
    }
    return (
        <Animated.View
            style={{
                flexBasis: anim,
                minWidth: anim2,
                maxWidth: 300,
                height: '100%',
                borderRightWidth: 2,
                borderRightColor: colors.themeSecoundary(),
                backgroundColor: colors.themeSecoundary(40),
                overflow: 'hidden',
            }}
        >
            {/* <TouchableOpacity
                style={{
                    position: 'absolute',
                    justifyContent: 'flex-end',
                    alignSelf: 'flex-end',
                    backgroundColor: 'white',
                    right: -20,
                    borderRadius: '50%',
                    top: 20,
                }}
            >
                <Image source={leftArrowPNG} style={{ width: 40, height: 40 }}></Image>
            </TouchableOpacity> */}

            <View style={{ width: '50px' }}>
                <SettingsIcon
                    style={{ marginTop: 20, marginLeft: 20, height: '30px', width: '30px' }}
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    Open Menu
                </SettingsIcon>
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleOpen}>
                        <PersonIcon /> Personal details
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <ExitToAppIcon /> Logout
                    </MenuItem>
                </Menu>
                <Modal style={customStyles} ariaHideApp={false} isOpen={personalInfoModalOpen} onRequestClose={() => setPersonalInfoModalOpen(false)}>
                    <PersonalInfo name={name} surname={surname} setPersonalInfoModalOpen={setPersonalInfoModalOpen} />
                </Modal>
            </View>
            <ProfileDetails
                name={name + ' ' + surname}
                style={{ paddingTop: 60 }}
                source={image.length > 0 ? image : placeholderImage}
            ></ProfileDetails>
            <View style={{ alignItems: 'center', paddingTop: 75 }}>
                {mockMenu.map((el, index) => {
                    return (
                        <MenuItemCustom
                            key={index}
                            style={{ marginBottom: 11 }}
                            title={el.name}
                            image={el.icon}
                            active={el.name === view}
                            onClick={() => handleMenuClick(el)}
                        />
                    );
                })}
            </View>
        </Animated.View>
    );
}
