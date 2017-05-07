import React, { Component, PropTypes } from 'react';

import {
    View,
    Text,
    ListView,
    TextInput,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import api from '../utils/api';
import Separator from './Separator';
import Badge from './Badge';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    button: {
        height: 60,
        backgroundColor: '#48BBEC',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        height: 60,
        padding: 10,
        fontSize: 18,
        color: '#111',
        flex: 10
    },
    rowContainer: {
        padding: 10
    },
    footerContainer: {
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
        flexDirection: 'row'
    }
});

export default class Notes extends Component {
    constructor(props){
    	super(props);
        
        this.ds = new ListView.DataSource({rowHasChanged: (row1, row2 ) => row1 !== row2});
    	this.state = {
            dataSource: this.ds.cloneWithRows(this.props.notes),
            note: '',
            error: ''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            note: event.nativeEvent.text
        })
    }
    
    handleSubmit() {
        const { note } = this.state;
        const { login } = this.props.userInfo;
        
        this.setState({note: ''});
        
        api.addNote(login, note)
            .then( data => {
                api.getNotes(login)
                    .then( data => {
                        this.setState({dataSource: this.ds.cloneWithRows(data)});
                    })
            }).catch( error => {
                console.log('Request failed', err);
                this.setState({error});
            })
    }
    
    footer() {
        return (
            <View style={styles.footerContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.note}
                    onChange={this.handleChange}
                    placeholder='New Note'
                />
                <TouchableHighlight
                    style={styles.button}
                    onPress={this.handleSubmit}
                    underlayColor='#88d4f5'
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>
            </View>
        );
    }
    
    renderRow(rowData) {
        return (
            <View>
                <View style={styles.rowContainer}>
                    <Text>{rowData}</Text>
                </View>
                <Separator />
            </View>
        )
    }
    
    renderHeader() {
        const { userInfo } = this.props;
        
        return (
            <Badge
                avatar={userInfo.avatar_url}
                name={userInfo.name}
                username={userInfo.login}
            />
        );
    }
    
    render(){
        const { userInfo } = this.props;
        
        return(
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderHeader={this.renderHeader}
                    enableEmptySections={true}
                />

                {this.footer()}
            </View>
        );
    }
}

Notes.propTypes = {
    userInfo: PropTypes.object.isRequired,
    notes: PropTypes.object.isRequired
}