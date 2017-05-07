import React, { PropTypes } from 'react';

import {
    Text,
    View,
    StyleSheet,
    ScrollView
} from 'react-native';

import Badge from './Badge';
import Separator from './Separator';

const Profile = ({ userInfo }) => (
    <ScrollView style={styles.container}>
        <Badge
            avatar={userInfo.avatar_url}
            name={userInfo.name}
            username={userInfo.login}
        />
        {renderInfo(userInfo)}
    </ScrollView>
);

const getRowTitle = (user, item) => {
    const title = item === 'public_repos' ? item.replace('_', ' ') : item;

    return title[0] ? `${title[0].toUpperCase()}${title.slice(1)}` : title;
}

const renderInfo = data => {
    const topics = ['company', 'location', 'followers', 'following', 'email', 'bio', 'public_repos'];

    return topics.map((topic, index) => {
        if (data[topic]) {
            const title = getRowTitle(data, topic);

            return (
                <View key={index}>
                    <View style={styles.rowContainer}>
                        <Text style={styles.rowTitle}>{title}</Text>
                        <Text style={styles.rowContent}>{data[topic]}</Text>
                    </View>
                    <Separator />
                </View>
            )
        } else {
            return <View key={index} />;
        }
    })
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    rowContainer: {
        padding: 10
    },
    rowTitle: {
        color: '#48bbec',
        fontSize: 16
    },
    rowContent: {
        fontSize: 19
    }
});

Profile.propTypes = {
    userInfo: PropTypes.object.isRequired
}

export default Profile;