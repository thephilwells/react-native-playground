import firebase from 'firebase';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Header, Button, CardSection, Spinner} from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state = {
        loggedIn: null
    };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyAmac2rxNv3r5oNYbVIXkeo7DNIiPFtpts',
            authDomain: 'authentication-93654.firebaseapp.com',
            databaseURL: 'https://authentication-93654.firebaseio.com',
            projectId: 'authentication-93654',
            storageBucket: 'authentication-93654.appspot.com',
            messagingSenderId: '9671311212'
        });

        firebase
            .auth()
            .onAuthStateChanged((user) => {
                if (user) {
                    this.setState({loggedIn: true});
                } else {
                    this.setState({loggedIn: false});
                };
            });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm/>;
            default:
                return <Spinner size="large"/>;
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication"/> 
                {this.renderContent()}

            </View>
        );
    }
}

export default App;