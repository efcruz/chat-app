import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Image, TouchableOpacity, Pressable } from 'react-native';


export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', backgroundColor: 'white' };
    }

    changeBackgroundColor = (newColor) => {
        this.setState({ backgroundColor: newColor });
    };

    render() {

        const imageBackground = require("../img/background-image.png");
        const userIcon = require("../img/user-icon.png");
        const colors = {
            black: "#090C08",
            purple: "#474056",
            grey: "#8A95A5",
            green: "B9C6AE",
        };



        return (
            <View style={styles.container}>
                <ImageBackground source={imageBackground} resizeMode="cover" style={styles.imageBackground}>
                    <Text style={styles.title}>Chat App</Text>

                    {/* Start Container */}
                    <View style={styles.startContainer}>

                        {/* Input Container */}
                        <View style={styles.inputContainer}>
                            <Image source={userIcon} style={styles.userIcon} />
                            <TextInput
                                style={styles.input}
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                                placeholder='Your Name'
                            />
                        </View>

                        {/* Theme Container */}
                        <View style={styles.themeContainer}>
                            <Text style={styles.themeText}>Choose Background Color</Text>

                            {/* Colors Container */}
                            <View style={styles.colorsContainer}>
                                <TouchableOpacity
                                    style={styles.color1}
                                    onPress={() => {
                                        this.changeBackgroundColor(colors.black);
                                    }}

                                >
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.color2}
                                    onPress={() => {
                                        this.changeBackgroundColor(colors.purple);
                                    }}

                                >
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.color3}
                                    onPress={() => {
                                        this.changeBackgroundColor(colors.grey);
                                    }}

                                >
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.color4}
                                    onPress={() => {
                                        this.changeBackgroundColor(colors.green);
                                    }}
                                >
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Pressable
                            style={styles.button}
                            title='Start Chatting'
                            onPress={() =>
                                this.props.navigation.navigate('Chat', { name: this.state.name, backgroundColor: this.state.backgroundColor })
                            }
                        >

                            <Text style={styles.buttonText}>Start Chatting</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    imageBackground: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 45,
        fontWeight: "600",
        color: "#FFFFFF",
        textAlign: "center",
        padding: 20,
        marginTop: 2
    },
    startContainer: {
        marginBottom: 30,
        backgroundColor: "white",
        flexGrow: 1,
        flexShrink: 0,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10,
        height: 260,
        minHeight: 260,
        maxHeight: 300,
        height: "44%",
        width: "88%",
    },
    inputContainer: {
        flexDirection: "row",
        width: "88%",
        borderColor: "#757083",
        borderWidth: 1,
        padding: 10,
    },
    userIcon: {
        padding: 10,
        margin: 5,
        height: 20,
        width: 20,
        resizeMode: "stretch",
        alignItems: "center",
        opacity: 0.5,

    },
    input: {
        fontSize: 16,
        fontWeight: "300",
        color: "#757083"
    },
    themeContainer: {
        flexDirection: "column",
        padding: 20,
        margin: "auto",
        width: "88%"
    },
    themeText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: "300",
        color: "#757083",
        opacity: 1,
        padding: 5,
    },
    colorsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
    },
    color1: {
        backgroundColor: "#090C08",
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    color2: {
        backgroundColor: "#474056",
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    color3: {
        backgroundColor: "#8A95A5",
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    color4: {
        backgroundColor: "#B9C6AE",
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    button: {
        width: "88%",
        height: 70,
        borderRadius: 8,
        backgroundColor: "#757083",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },


})

