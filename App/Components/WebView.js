import React, { PropTypes } from 'react';

import {
    View,
    WebView as Web,
    StyleSheet
} from 'react-native';

const WebView = ({url}) => (
    <View style={styles.container}>
        <Web source={{uri: url}} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f6ef',
        flexDirection: 'column'
    }
});

WebView.propTypes = {
    url: PropTypes.string.isRequired
}

export default WebView;