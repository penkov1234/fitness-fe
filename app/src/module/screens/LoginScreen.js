import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { colors } from 'styles';
import { Button, TextField } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { ImageBackground } from 'react-native-web';
import Background from 'assets/haramara yoga shared.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { passwordLoginAction, registerStartedAction } from '../../redux/actions/auth.actions';
import { stateHasFailed, stateIsLoaded } from '../../services/stateHelpers';
import StandardButton from 'module/components/buttons/StandardButton';
import { Redirect } from 'react-router-dom';
import { headers } from 'styles';
import { getUserInfo } from '../../redux/actions/data.actions';
export default function LoginScreen({ history }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);

    const login = () => {
        if (!username.length) {
            setUsernameError(true);
            setUsernameErrorMessage('username cannot be empty');
        }
        if (!password.length) {
            setPasswordError(true);
            setPasswordErrorMessage('password cannot be empty');
        } else {
            setPasswordError(false);
            setUsernameError(false);
            dispatch(passwordLoginAction(username, password));
        }
    };

    const toRegister = () => {
        history.push('/register');
    };

    if (stateIsLoaded(authState) && authState.persisted) {
        history.replace('/menu');
    }
    if (stateHasFailed(authState)) {
        if (!usernameError) {
            setUsernameError(true);
            setUsernameErrorMessage('invalid credentials');
        }
        if (!passwordError) {
            setPasswordError(true);
            setPasswordErrorMessage('invalid credentials');
        }
    }
    return (
        <ImageBackground
            source={Background}
            imageStyle={{ opacity: '60%' }}
            style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
        >
            <View style={{ width: 400, padding: 20, backgroundColor: '#FFFFFF', boxShadow: '-10px 12px 15px -1px' + ' rgba(0,0,0,0.4)' }}>
                <Text
                    style={[
                        headers.H1('black'),
                        { textAlign: 'center', borderBottomWidth: 1, borderBottomColor: colors.borderGrayColor(50), paddingBottom: 20 },
                    ]}
                >
                    Login to continue
                </Text>
                <TextField
                    name={'username'}
                    variant="outlined"
                    label={'Username'}
                    color={'secondary'}
                    error={usernameError}
                    helperText={usernameErrorMessage}
                    onChange={event => setUsername(event.target.value)}
                    value={username}
                    style={{ marginTop: 40, marginLeft: 20, marginRight: 20, ...headers.H5() }}
                ></TextField>
                <TextField
                    name={'password'}
                    variant="outlined"
                    label={'Password'}
                    color={'secondary'}
                    type={'password'}
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                    style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}
                ></TextField>
                <Link onClick={toRegister} style={{ fontSize: 13, textAlign: 'center', marginTop: 30, ...headers.H5() }}>
                    Not registered yet? Click <Text>here to register</Text>.
                </Link>
                <StandardButton
                    variant="contained"
                    title={'Login'}
                    style={{
                        alignSelf: 'flex-end',
                        marginTop: 20,
                        backgroundColor: colors.themeActive(),
                        padding: 10,
                        paddingRight: 20,
                        paddingLeft: 20,
                    }}
                    onPress={() => {
                        login();
                    }}
                ></StandardButton>
            </View>
        </ImageBackground>
    );
}
