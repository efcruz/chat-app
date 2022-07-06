import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, Image, TouchableOpacity, Pressable } from 'react-native';


export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', backgroundColor: "white" };
    }

    changeBackgroundColor = (newColor) => {
        this.setState({ backgroundColor: newColor });
    };

    render() {

        const imageBackground = require("../img/background-image.png");
        const userIcon = require("../img/icon.svg");
        const colors = {
            color1: "#090C08",
            color2: "#474056",
            color3: "#8A95A5",
            color4: "#B9C6AE",
        };



        return (
            <View style={styles.container}>
                <ImageBackground source={imageBackground} resizeMode="cover" style={styles.imageBackground}>
                    <Text style={styles.title}>Chat App</Text>
                    <View style={styles.startContainer}>
                        <View style={styles.inputContainer}>
                            <Image source={userIcon} style={styles.userIcon} />
                            <TextInput
                                style={styles.input}
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                                placeholder='Your Name'
                            />
                        </View>
                        <View style={styles.themeContainer}>
                            <Text style={styles.themeText}>Choose Background Color</Text>
                            <View style={styles.colorsContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.changeBackgroundColor(colors.color1);
                                    }}
                                    style={styles.colorSelection}
                                >
                                    <View style={styles.Circle1Box}></View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.changeBackgroundColor(colors.color2);
                                    }}
                                    style={styles.colorSelection}
                                >
                                    <View style={styles.Circle2Box}></View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.changeBackgroundColor(colors.color3);
                                    }}
                                    style={styles.colorSelection}
                                >
                                    <View style={styles.Circle3Box}></View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.changeBackgroundColor(colors.color4);
                                    }}
                                    style={styles.colorSelection}
                                >
                                    <View style={styles.Circle4Box}></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Button
                            style={styles.button}
                            title='Start Chatting'
                            onPress={() =>
                                this.props.navigation.navigate('Chat', { name: this.state.name, backgroundColor: this.state.backgroundColor })
                            }
                        />
                        <Text style={styles.buttonText}>Start Chatting</Text>

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
        marginRight: "auto",
        width: "88%",
    },
    themeText: {
        fontSize: 16,
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
    colorSelection: {
        alignSelf: "center",
        borderRadius: 40,
        borderWidth: 2,
        borderColor: "grey",
        padding: 5,
        margin: 6,
    },
    Circle1Box: {
        flexDirection: "row",
        backgroundColor: "#090C08",
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 3,

    },
    Circle2Box: {
        flexDirection: "row",
        backgroundColor: "#474056",
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 3,
    },
    Circle3Box: {
        flexDirection: "row",
        backgroundColor: "#8A95A5",
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 3,
    },
    Circle4Box: {
        flexDirection: "row",
        backgroundColor: "#B9C6AE",
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 3,
    },
    button: {
        flexDirection: "column",
        backgroundColor: "red",
        width: "88%",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FFFFFF",
        textAlign: "center",
        padding: 20,
    },


})

