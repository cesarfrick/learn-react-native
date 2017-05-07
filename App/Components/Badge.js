import React, { PropTypes } from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';

const Badge = ({avatar, name, username}) => (
    <View style={styles.container}>
        <Image style={styles.image} source={{ uri: avatar }} />
        {name && 
            <Text style={styles.name}>{name}</Text>
        }
        <Text style={styles.handle}>{username}</Text>
    </View>
);

Badge.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string,
    username: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#48BBEC',
        paddingBottom: 10
    },
    name: {
        alignSelf: 'center',
        fontSize: 21,
        marginTop: 10,
        marginBottom: 5,
        color: 'white'
    },
    handle: {
        alignSelf: 'center',
        fontSize: 16,
        color: 'white'
    },
    image: {
        height: 125,
        width: 125,
        borderRadius: 65,
        marginTop: 10,
        alignSelf: 'center'
    }
});

export default Badge;