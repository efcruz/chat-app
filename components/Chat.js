/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
const firebase = require('firebase');
require('firebase/firestore');
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            amIConnected: false,
            messages: [],
            user: {
                _id:'',
                name: '',
            },
            loggedInText: 'Waiting...'
        }

        //Firestore Credentials
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

    //Retrieve messages from async storage
    async getMessages() {
        let messages = '';
        let userID = '';
        try {
          messages = (await AsyncStorage.getItem('messages')) || [];
          userID = (await AsyncStorage.getItem("userID")) || '';
          this.setState({
            messages: JSON.parse(messages),
            userID,
          });
        } catch (error) {
          console.log(error.message);
        }
      };

    
    componentDidMount() {
        //get the user name to put in the apps title
        const { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });

        
        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                this.setState({
                    amIConnected: true,
                });
                  console.log("online");
            } else {
                this.setState({
                    amIConnected: false,
                });
                console.log('offline');
            }
        

        if(this.state.amIConnected === true) {
 
        //reference to desired collection
        this.referenceChatMessages = firebase.firestore().collection("messages");
        
        //collection listener
        this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate);
      
        //listen to authentication events
        this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (!user) {
                await firebase.auth().signInAnonymously();
            }

            //update user state with currently active user data
            this.setState({
                messages: [],
                userID: user.uid,
                user: {
                _id: user.uid,
                name: name
                },
                loggedInText: 'Hello there'
            });
            this.unsubscribe = this.referenceChatMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);
        });
        } else {
            this.setState({
                amIConnected: false,
              });
              console.log("offline");
            this.getMessages();
        }
    });
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
            user: data.user,
          });
        });
        this.setState({
          messages,
        });
        this.saveMessages();
      };

     

    componentWillUnmount() {
        
       
        this.unsubscribe();
        this.authUnsubscribe();
    }
        
    

     

      //function called when sending a message
    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
            
        }),
        
        () => {
            this.addMessages();
            this.saveMessages();
         
        }
        );
    }

    //Save messages to the async storage
    async saveMessages() {
        try {
          await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch (error) {
          console.log(error.message);
        }
      }

    
    //add lists to Firestore database
    addMessages() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            _id: message._id,
            text: message.text,
            createdAt: message.createdAt,
            //user: message.user,
            user: this.state.user,
        });
    }

    async deleteMessages() {
        try {
          await AsyncStorage.removeItem('messages');
          this.setState({
            messages: []
          })
        } catch (error) {
          console.log(error.message);
        }
      }

    

    renderInputToolbar(props) {
        if (this.state.isConnected == false) {
        } else {
          return(
            <InputToolbar
            {...props}
            />
          );
        }
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
     

    render() {
        let name = this.props.route.params.name;
        //this.props.navigation.setOptions({ title: name });
        const { backgroundColor } = this.props.route.params;

        return (
            <View style={{ flex: 1, backgroundColor: backgroundColor }}>
                <Text>{this.state.loggedInText}</Text>

                {/*  
                <Button
                    title="Go to Start"
                    onPress={() => this.props.navigation.navigate('Start')}
                /> */}
                <GiftedChat
                    renderBubble={this.renderBubble.bind(this)}
                    renderInputToolbar={this.renderInputToolbar.bind(this)}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: this.state.userID,
                      }}
                />
            </View>
        )
    }

}