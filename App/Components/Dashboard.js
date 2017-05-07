import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';

import { getRepos, getNotes } from '../utils/api';
import Profile from './Profile';
import Repositories from './Repositories';
import Notes from './Notes';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.goToProfile = this.goToProfile.bind(this);
        this.goToRepos = this.goToRepos.bind(this);
        this.goToNotes = this.goToNotes.bind(this);
    }

    makeBackground(btn) {
        const backgrounds = ['#48bbec', '#e77aae', '#758bf4'];
        const obj = {
            flexDirection: 'row',
            alignSelf: 'stretch',
            justifyContent: 'center',
            flex: 1
        }

        return Object.assign(obj, { 'backgroundColor': backgrounds[btn] });
    }

    goToProfile() {
        this.props.navigator.push({
            title: 'Profile Page',
            component: Profile,
            passProps: { userInfo: this.props.userInfo }
        });
    }

    goToRepos() {
        getRepos(this.props.userInfo.login)
            .then(res => {
                this.props.navigator.push({
                    title: 'Repos',
                    component: Repositories,
                    passProps: { 
                        userInfo: this.props.userInfo,
                        repos: res
                    }
                });
            });
    }

    goToNotes() {
        getNotes(this.props.userInfo.login)
            .then( res => {
                this.props.navigator.push({
                    component: Notes,
                    title: 'Notes',
                    passProps: {
                        notes: res || {},
                        userInfo: this.props.userInfo
                    }
                })
            });
    }
    render() {
        const { userInfo } = this.props;

        return (
            <View style={styles.container}>
                <Image source={{uri: userInfo.avatar_url}} style={styles.image} />
                <TouchableHighlight
                    style={this.makeBackground(0)}
                    onPress={this.goToProfile}
                    underlayColor='#88d4f5'
                >
                    <Text style={styles.buttonText}> View Profile </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={this.makeBackground(1)}
                    onPress={this.goToRepos}
                    underlayColor='#88d4f5'
                >
                    <Text style={styles.buttonText}> View Repos </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={this.makeBackground(2)}
                    onPress={this.goToNotes}
                    underlayColor='#88d4f5'
                >
                    <Text style={styles.buttonText}> View Notes </Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});