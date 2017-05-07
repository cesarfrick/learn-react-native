/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  View
} from 'react-native';

import Main from './App/Components/Main';

export default class githubNotetaker extends Component {
  render() {
    return (
      <NavigatorIOS
          style={styles.container}
          initialRoute={{
              title: 'Github Notetaker',
              component: Main
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111'
  }
})

AppRegistry.registerComponent('githubNotetaker', () => githubNotetaker);
