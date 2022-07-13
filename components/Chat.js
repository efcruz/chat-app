/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
const firebase = require('firebase');
require('firebase/firestore');
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            loggedInText: 'Waiting...'
        }

        // Connect to Firestore
        const firebaseConfig = {
            apiKey: "AIzaSyBZfWSkkCZA9zwE8wubdLw_wAqLPup56Dg",
            authDomain: "chat-app-a11d2.firebaseapp.com",
            projectId: "chat-app-a11d2",
            storageBucket: "chat-app-a11d2.appspot.com",
            messagingSenderId: "670611442434",
            appId: "1:670611442434:web:c18ffd7da0871fa292501b",
            measurementId: "G-2SXZQCCHS7"
          }
        
        if (!firebase.apps.length){
          firebase.initializeApp(firebaseConfig);
          }
        
          this.referenceChatMessagesUser = null;
    }

    componentDidMount() {
        //get the user name to put in the apps title
        const { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });

        
        //reference to desired collection
        this.referenceChatMessages = firebase.firestore().collection("messages");
      
        // listen to authentication events
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
              await firebase.auth().signInAnonymously();
            }

            //update user state with currently active user data
            this.setState({
                _id: user._id,
                messages: [],
            });
            this.unsubscribe = this.referenceChatMessagesUser
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);

        // create a reference to the active user's documents (messages)
        this.referenceChatMessagesUser = firebase.firestore().collection('messages').where("_id", "==", this.state._id);
        // listen for collection changes for current user
        this.unsubscribeChatMessagesUser = this.referenceChatMessagesUser.onSnapshot(this.onCollectionUpdate);
        });
    }
    
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000'
                    },
                }}
            />
        );
    }

    //function called when sending a message
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    //retrieve the current data in “messages” collection and store it in state
    onCollectionUpdate = (querySnapshot) => {
        const messages = [];
        // go through each document
        querySnapshot.forEach((doc) => {
          // get the QueryDocumentSnapshot's data
          let data = doc.data();
          messages.push({
            _id: data._id,
            text: data.text,
            createdAt: data.createdAt.toDate(),
            user: data.user
          });
        });
        this.setState({
          messages,
        });
      };

      //add lists to database
    addMessages() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            _id: message._id,
            text: message.text,
            createdAt: message.createdAt,
            user: message.user
        });
    }

    componentWillUnmount() {
        this.authUnsubscribe();
        this.unsubscribe();
        
     }
     

    render() {
        let name = this.props.route.params.name;
        this.props.navigation.setOptions({ title: name });
        const { backgroundColor } = this.props.route.params;

        return (
            <View style={{ flex: 1, backgroundColor: backgroundColor }}>

                {/*  
                <Button
                    title="Go to Start"
                    onPress={() => this.props.navigation.navigate('Start')}
                /> */}
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
            </View>
        )
    }

}