import React from 'react';
import { View, Text, Image } from 'react-native';
import ProfilePic from 'assets/icons-for-web/photo-1511367461989-f85a21fda167.jpeg';
import { headers } from 'styles';
export default function ProfileDetails({ history, image, name, style, source }) {
    return (
        <View style={[{ justifyContent: 'center', alignItems: 'center' }, style]}>
            <Image
                style={{
                    resizeMode: 'cover',
                    width: 150,
                    height: 135,
                    borderRadius: '40%',
                    marginBottom: 25,
                    boxShadow: '-5px 3px 6px -1px rgba(0,0,0,0.23)',
                }}
                source={source}
                alt={'profile img'}
            ></Image>
            <Text style={[headers.H2('white')]}> {name ? name : 'Default name'}</Text>
        </View>
    );
}
