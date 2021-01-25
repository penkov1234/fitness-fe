import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput } from 'react-native';
// import { TextField } from 'react-native-material-textfield';
import Input from '@material-ui/core/Input';
import { TextField } from '@material-ui/core';
import { colors } from 'styles';
import StandardButton from './buttons/StandardButton';
import { updateUserInfo } from '../../redux/actions/data.actions';
import { useDispatch } from 'react-redux';

export const PersonalInfo = ({ name, surname, setPersonalInfoModalOpen }) => {
    const dispatch = useDispatch();
    const [nameCurrent, setNameCurrent] = useState(name);
    const [surnameCurrent, setSurnameCurrent] = useState(surname);
    const [image, setImage] = useState('');
    function saveInfo() {
        // console.log(image);

        dispatch(updateUserInfo(nameCurrent, surnameCurrent, image));
        setPersonalInfoModalOpen(false);
    }
    return (
        <View style={{ flex: 2 }}>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Change personal info</Text>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    marginLeft: 50,
                    marginRight: 50,
                    marginBottom: 50,
                    marginTop: 50,
                }}
            >
                <TextField value={nameCurrent} onChange={event => setNameCurrent(event.target.value)} label="Name"></TextField>
                <TextField
                    value={surnameCurrent}
                    onChange={event => setSurnameCurrent(event.target.value)}
                    style={{ marginTop: 15 }}
                    label="Surname"
                ></TextField>
                <Text style={{ marginTop: 25, color: colors.secoundaryText(100), fontSize: 16 }}>Profile picture: </Text>
                <Input onChange={event => setImage(event.target.files[0])} type={'file'}></Input>
                <StandardButton
                    disabled={nameCurrent === name && surnameCurrent === surname && image.length < 1}
                    title={'Save'}
                    style={{ width: '100px', alignSelf: 'center', marginTop: 30 }}
                    onPress={saveInfo}
                ></StandardButton>
            </View>
        </View>
    );
};
