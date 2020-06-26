import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon, Input, CheckBox, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Asset } from 'expo-asset';
import * as ImageManipulator from "expo-image-manipulator";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { baseUrl } from '../shared/baseUrl';
import { DrawerActions } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';


export class LoginTab extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false,
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if(userinfo) {
                    this.setState({username: userinfo.username, password: userinfo.password, remember: true});
                }
            });
    }



    handleLogin() {
        console.log(JSON.stringify(this.state));
        if(this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username: this.state.username, password: this.state.password})
            )
            .then(console.log('Saved'))
            .catch((error) => console.log('Could not Save user '+error));
        }else{
            SecureStore.deleteItemAsync('userinfo')
            .then(console.log('Deleted'))
            .catch((error) => console.log('Could not Delete user '+error));
        }
    }


    static navigationOptions = ({navigation}) => ({
        title: 'Login Details',
        headerLeft: ()=> (
            <Icon name='menu' size={24} color='white' style={{marginLeft: 10}} 
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
            ),
        tabBarIcon: ({tintColor}) => (
            <Icon 
                name='sign-in'
                type='font-awesome'
                size={24}
                iconStyle={{color: tintColor}} />
        )
    })


    render() {
        return(
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(username) => this.setState({username: username})}
                    value={this.state.username}
                    containerStyle={styles.formInput} />
                <Input
                    placeholder="Password"
                    leftIcon={{type: 'font-awesome', name: 'key'}}
                    onChangeText={(password) => this.setState({password: password})}
                    value={this.state.password}
                    containerStyle={styles.formInput} />
                <CheckBox 
                    title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckBox} />
                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.handleLogin()}
                        title='Login'
                        icon={<Icon name='sign-in' type='font-awesome' color='white' />}
                        size={24}
                        buttonStyle={{backgroundColor: "#512DA8"}}  />
                </View>
                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.props.navigation.navigate('RegisterTab')}
                        title='Register'
                        clear
                        icon={<Icon name='user-plus' type='font-awesome' color='blue' />}
                        size={24}
                        titleStyle={{
                            color: "blue"
                        }}  />
                </View>
            </View>
        );
    }

}

export class RegisterTab extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl +'images/logo.png'
        }
    }
    static navigationOptions = ({navigation}) => ({
        title: 'Register',
        headerLeft: ()=> (
            <Icon name='menu' size={24} color='white' style={{marginLeft: 10}} 
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
            ),
        tabBarIcon: ({tintColor}) => (
            <Icon 
                name='user-plus'
                type='font-awesome'
                size={24}
                iconStyle={{color: tintColor}} />
        ),

    });

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if(cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3]
            });

            if(!capturedImage.cancelled){
                this.processImage(capturedImage.uri);
            }
        }
    }

    getImageFromGallery = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if(cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3]
            });

            if(!capturedImage.cancelled){
                this.processImage(capturedImage.uri);
            }
        }

    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                { resize: { width: 400 }}
            ],
            {format: 'png'}
        );
        this.setState({imageUrl: processedImage.uri});
    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if(this.state.remember){
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({username: this.state.username, password: this.state.password})
            )
            .then(console.log('Saved'))
            .catch((error) => console.log('Could not Save user '+error));
        }
    }

    render() {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Text style={{flex: 1}}>
                        <Image 
                            source={{uri: this.state.imageUrl}}
                            loadingIndicatorSource={require('./images/logo.png')}
                            style={styles.image} />
                        </Text>

                        <Button 
                            title='Camera'
                            onPress={this.getImageFromCamera} />
                         <Button 
                            title='Gallery'
                            onPress={this.getImageFromGallery} />
                    </View>
                    <Input
                        placeholder="Username"
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(username) => this.setState({username: username})}
                        value={this.state.username}
                        containerStyle={styles.formInput} />
                    <Input
                        placeholder="Password"
                        leftIcon={{type: 'font-awesome', name: 'key'}}
                        onChangeText={(password) => this.setState({password: password})}
                        value={this.state.password}
                        containerStyle={styles.formInput} />
                    <Input
                        placeholder="First Name"
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(firstname) => this.setState({firstname: firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput} />
                    <Input
                        placeholder="Last Name"
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(lastname) => this.setState({lastname: lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput} />
                    <Input
                        placeholder="Email"
                        leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
                        onChangeText={(email) => this.setState({email: email})}
                        value={this.state.email}
                        containerStyle={styles.formInput} />
                    <CheckBox 
                        title="Remember Me"
                        center
                        checked={this.state.remember}
                        onPress={() => this.setState({remember: !this.state.remember})}
                        containerStyle={styles.formCheckBox} />
                    <View style={styles.formButton}>
                        <Button 
                            onPress={() => this.handleRegister()}
                            title='Register'
                            icon={<Icon name='user-plus' type='font-awesome' color='white' />}
                            size={24}
                            buttonStyle={{backgroundColor: "#512DA8"}}  />
                    </View>
                </View>
            </ScrollView>
        );
    }


}

const tabNavigator = createBottomTabNavigator();

export default function Login() {
    return(
        <NavigationContainer independent={true}>
            <tabNavigator.Navigator
                initialRouteName='Login'
                tabBarOptions={{
                    activeBackgroundColor: '#9575CD',
                    inactiveBackgroundColor: '#D1C4E9',
                    activeTintColor: '#ffffff',
                    inactiveTintColor: 'gray'
                }}>
                <tabNavigator.Screen 
                name='LoginTab' 
                component={LoginTab}
                options={{
                    title: 'Login',
                    tabBarIcon:({ tintColor }) => (
                        <Icon
                          name='sign-in'
                          type='font-awesome'            
                          size={24}
                          iconStyle={{ color: tintColor }}
                        />
                      )
                }}
                />
                <tabNavigator.Screen 
                    name='RegisterTab' 
                    component={RegisterTab}
                    options={{
                        title: 'Register',
                        tabBarIcon:({ tintColor }) => (
                            <Icon
                              name='user-plus'
                              type='font-awesome'            
                              size={24}
                              iconStyle={{ color: tintColor }}
                            />
                          )
                    }}
                />
            </tabNavigator.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            margin: 20
        },
        imageContainer: {
            flex: 1,
            flexDirection: 'row',
            margin: 20,
            justifyContent: 'center'
        },
        image:{
            margin: 10,
            width:80,
            height: 60
        },
        formInput: {
            margin: 6
        },
        formCheckBox: {
            margin: 20,
            backgroundColor: null
        },
        formButton: {
            margin: 60
        }
})