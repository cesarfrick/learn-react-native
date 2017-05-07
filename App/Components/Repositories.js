import React, { Component, PropTypes } from 'react';

import {
    Text,
    ScrollView,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import Badge from './Badge';
import WebView from './WebView';
import Separator from './Separator';

export default class Repositories extends Component {
    
    constructor(props){
    	super(props);
    	
        this.renderRepos = this.renderRepos.bind(this);
    }
    
    openPage(url) {
        this.props.navigator.push({
            component: WebView,
            title: 'Web View',
            passProps: { url }
        });
    }
    
    renderRepos() {
        const { repos } = this.props;
        
        return repos.map( (repo, index) => {
            return (
                <View key={index}>
                    <View style={styles.rowContainer}>
                        <TouchableHighlight
                            onPress={() => this.openPage(repo.html_url)}
                            underlayColor='transparent'
                        >
                            <Text style={styles.name}>{repo.name}</Text>
                        </TouchableHighlight>
                        <Text style={styles.stars}>Stars: {repo.stargazers_count}</Text>
                        {repo.description &&
                            <Text style={styles.description}>{repo.description}</Text>
                        }
                    </View>
                    <Separator />
                </View>
                );
            }
        );
    }
    
    render() {
        const {userInfo} = this.props;
        
        return (
            <ScrollView style={styles.container}>
                <Badge
                    avatar={userInfo.avatar_url}
                    name={userInfo.name}
                    username={userInfo.login}
                />

                {this.renderRepos()}
            </ScrollView>
        );
    }
}

Repositories.propTypes = {
    userInfo: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    rowContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    name: {
        color: '#48BBEC',
        fontSize: 18,
        paddingBottom: 5
    },
    stars: {
        color: '#48BBEC',
        fontSize: 14,
        paddingBottom: 5
    },
    description: {
        fontSize: 14,
        paddingBottom: 5
    }
});