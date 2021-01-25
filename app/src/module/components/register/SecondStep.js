import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { Button, TextField } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { passwordLoginAction, previousStepAction, registerUserAction } from '../../../redux/actions/auth.actions';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import { stateIsLoaded } from '../../../services/stateHelpers';
import TitledGroupBox from '../TitledGroupBox';
import { headers, colors } from 'styles';
import bodyfatSvg from 'assets/icons-for-web/bodyfat.svg';
import heightSvg from 'assets/icons-for-web/height.svg';

import kgSvg from 'assets/icons-for-web/kg.svg';

export default function FirstStep({ history }) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bodyFat, setBodyFat] = useState('');
    const [registerDone, setRegisterDone] = useState(false);
    const dispatch = useDispatch();
    let firstStepData = useSelector(state => state.register.firstStepData).data.data;
    let registerState = useSelector(state => state.register.status);
    let authState = useSelector(state => state.auth);
    const previousStep = () => {
        dispatch(previousStepAction());
    };
    const finish = () => {
        dispatch(registerUserAction(firstStepData, name, lastName, weight, height, bodyFat));
    };

    if (stateIsLoaded(registerState) && !registerDone) {
        setRegisterDone(true);
        dispatch(passwordLoginAction(firstStepData.username, firstStepData.password));
    }
    if (stateIsLoaded(authState) && authState.persisted) {
        history.replace('/menu');
    }
    return (
        <View>
            <TextField
                name={'name'}
                variant="outlined"
                label={'Name'}
                color={'secondary'}
                onChange={event => setName(event.target.value)}
                value={name}
                style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}
            ></TextField>
            <TextField
                name={'lastName'}
                variant="outlined"
                label={'Last name'}
                color={'secondary'}
                onChange={event => setLastName(event.target.value)}
                value={lastName}
                style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}
            ></TextField>

            <TitledGroupBox titleStyle={[headers.H4('black', 'Light')]} title={'Body details'} style={{ margin: 20, marginTop: 40 }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'space-around', marginTop: 25 }}>
                    <FormControl style={{ flex: 1, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={kgSvg} style={{ width: 50, height: 50 }}></Image>
                        <FormHelperText id="standard-weight-helper-text" style={{ paddingBottom: 10 }}>
                            Weight
                        </FormHelperText>
                        <Input
                            id="standard-adornment-weight"
                            value={weight}
                            onChange={event => setWeight(+event.target.value ? +event.target.value : '')}
                            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                        />
                    </FormControl>
                    <FormControl style={{ flex: 1, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={heightSvg} style={{ width: 50, height: 50 }}></Image>
                        <FormHelperText id="standard-weight-helper-text" style={{ paddingBottom: 10 }}>
                            Height
                        </FormHelperText>
                        <Input
                            id="standard-adornment-height"
                            value={height}
                            onChange={event => setHeight(+event.target.value ? +event.target.value : '')}
                            endAdornment={<InputAdornment position="end">Cm</InputAdornment>}
                            aria-describedby="standard-height-helper-text"
                            inputProps={{
                                'aria-label': 'height',
                            }}
                        />
                    </FormControl>
                    <FormControl style={{ flex: 1, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={bodyfatSvg} style={{ width: 50, height: 50 }}></Image>
                        <FormHelperText id="standard-weight-helper-text" style={{ paddingBottom: 10 }}>
                            Body fat
                        </FormHelperText>
                        <Input
                            id="standard-adornment-body-fat"
                            value={bodyFat}
                            onChange={event => setBodyFat(+event.target.value ? +event.target.value : '')}
                            endAdornment={<InputAdornment position="end">%</InputAdornment>}
                            aria-describedby="standard-body-fat-helper-text"
                            inputProps={{
                                'aria-label': 'body-fat',
                            }}
                        />
                    </FormControl>
                </View>
            </TitledGroupBox>

            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                }}
            >
                <View style={{ flex: 1 }}>
                    <Button variant="contained" color={'secondary'} style={{ alignSelf: 'flex-start', marginTop: 20 }} onClick={previousStep}>
                        Back
                    </Button>
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        disabled={name.length < 1 || lastName.length < 1 || weight.length < 1 || height.length < 1 || bodyFat.length < 1}
                        variant="contained"
                        color={'secondary'}
                        style={{ alignSelf: 'flex-end', marginTop: 20 }}
                        onClick={finish}
                    >
                        finish
                    </Button>
                </View>
            </View>
        </View>
    );
}
