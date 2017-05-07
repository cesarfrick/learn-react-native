import React from 'react';

import {
    View,
    StyleSheet
} from 'react-native';

const Separator = () => (
    <View style={styles.separator} />
);

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#e4e4e4',
        flex: 1,
        marginLeft: 15
    }
});

export default Separator;