import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, TextField } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { passwordLoginAction, registerNextStepAction } from '../../../redux/actions/auth.actions';
import { useDispatch, useSelector } from 'react-redux';
import { stateIsLoaded } from '../../../services/stateHelpers';
import StandardButton from 'module/components/buttons/StandardButton';
import { headers, colors } from 'styles';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },

    cssLabel: {
        color: 'green',
    },

    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `${theme.palette.primary.main} !important`,
        },
    },

    cssFocused: {},

    notchedOutline: {
        borderWidth: '1px',
        borderColor: 'green !important',
    },
});

export default function FirstStep({ history }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [repeatPasswordError, setRepeatPasswordError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [repeatPasswordErrorMessage, setRepeatPasswordErrorMessage] = useState('');
    const firstStepState = useSelector(state => state.register.firstStepData);
    console.log(firstStepState);
    if (stateIsLoaded(firstStepState)) {
        if (!username && !password) {
            setUsername(firstStepState.data.data.username);
            setPassword(firstStepState.data.data.password);
        }
    }
    const dispatch = useDispatch();
    const toNextStep = () => {
        if (!username.length) {
            setUsernameError(true);
            setUsernameErrorMessage('username cannot be empty');
        } else if (!password.length) {
            setPasswordError(true);
            setPasswordErrorMessage('password cannot be empty');
        } else if (password !== repeatPassword) {
            setRepeatPasswordError(true);
            setRepeatPasswordErrorMessage("the passwords don't match");
        } else {
            dispatch(registerNextStepAction({ username: username, password: password }));
        }
    };

    return (
        <View>
            <TextField
                name={'username'}
                variant="outlined"
                label={'Username'}
                color={'secondary'}
                error={usernameError}
                helperText={usernameErrorMessage}
                onChange={event => setUsername(event.target.value)}
                value={username}
                style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}
            ></TextField>
            <TextField
                name={'password'}
                variant="outlined"
                label={'Password'}
                color={'secondary'}
                error={passwordError}
                type={'password'}
                helperText={passwordErrorMessage}
                onChange={event => setPassword(event.target.value)}
                value={password}
                style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}
            ></TextField>
            <TextField
                name={'repeatPassword'}
                variant="outlined"
                label={'Repeat password'}
                color={'secondary'}
                type={'password'}
                error={repeatPasswordError}
                helperText={repeatPasswordErrorMessage}
                onChange={event => setRepeatPassword(event.target.value)}
                value={repeatPassword}
                style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}
            ></TextField>
            <Link to={'/register'} style={{ fontSize: 13, color: '#999999', textAlign: 'center', marginTop: 30 }}>
                <Text style={[headers.H6()]}> Already have an acoount? Click here to log in. </Text>
            </Link>
            <StandardButton
                title={'Next step'}
                // disabled={}
                color={'#E4365E'}
                style={{
                    alignSelf: 'flex-end',
                    marginTop: 20,
                    padding: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    // backgroundColor: colors.themePrimary(),
                }}
                onPress={() => toNextStep()}
            ></StandardButton>
        </View>
    );
}
