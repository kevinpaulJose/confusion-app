import React, { Component } from 'react';
import { Platform, Image, StyleSheet, ScrollView, View } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';

import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen({navigation}) {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
                options={{headerLeft: () => (
                <Icon name='menu' size={24} color='white' style={{marginLeft: 10}} 
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
                )
                }}

            />
            <MenuNavigator.Screen
                name="DishDetail"
                component={DishDetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();

function HomeNavigatorScreen({navigation}) {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Home"
                component={Home}
                options={{
                    headerLeft: () => (
                        <Icon name='menu' size={24} color='white' style={{marginLeft: 10}} 
                        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
                        )
                }}
            />
           
        </MenuNavigator.Navigator>
    );
}

const ContactNavigator = createStackNavigator();
function ContactNavigatorScreen({navigation}) {
    return(
        <ContactNavigator.Navigator
            initialRouteName='Contact'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <ContactNavigator.Screen
                name="Contact"
                component={Contact}
                options={{headerTitle: "Contact Us",
                            headerLeft: () => (
                                <Icon name='menu' size={24} color='white' style={{marginLeft: 10}} 
                                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
                                )}}
            />
           
        </ContactNavigator.Navigator>
    );
}

const AboutNavigator = createStackNavigator();
function AboutNavigatorScreens({navigation}) {
    return(
        <AboutNavigator.Navigator
            initialRouteName='About'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <AboutNavigator.Screen
                name="About"
                component={About}
                options={{headerTitle: "About Us",
                        headerLeft: () => (
                            <Icon name='menu' size={24} color='white' style={{marginLeft: 10}} 
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
                            )
                }}
            />
           
        </AboutNavigator.Navigator>
    );
}

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInsert={{ top: 'always', horizontal: 'never'}}>
                <View style={styles.drawheader} >

                </View>
                <DrawerItemList {...props} />
        </SafeAreaView>
    </ScrollView>
)

const MainNavigator = createDrawerNavigator();
function MainNavigatorDrawer() {
    return(
        <MainNavigator.Navigator 
            initialRouteName="Home"
            drawerStyle={{
                backgroundColor:'#D1C4E9'
            }}
        >
            <MainNavigator.Screen name="Home"
                                  component={HomeNavigatorScreen}
                                  options={{
                                      drawerIcon: ({ tintColor }) => (
                                          <Icon name='home' size={24} type='font-awesome' color={tintColor} />
                                      )
                                  }} />
            <MainNavigator.Screen name="About Us" 
                                    component={AboutNavigatorScreens}
                                    options={{
                                        drawerIcon: ({ tintColor }) => (
                                            <Icon name='info-circle' size={24} type='font-awesome' color={tintColor} />
                                        )
                                    }} />
            <MainNavigator.Screen name="Menu" 
                                    component={MenuNavigatorScreen}
                                    options={{
                                        drawerIcon: ({ tintColor }) => (
                                            <Icon name='list' size={24} type='font-awesome' color={tintColor} />
                                        )
                                    }} />
            <MainNavigator.Screen name="Contact Us" 
                                        component={ContactNavigatorScreen}
                                        options={{
                                            drawerIcon: ({ tintColor }) => (
                                                <Icon name='address-card' size={22} type='font-awesome' color={tintColor} />
                                            )
                                        }} />

        </MainNavigator.Navigator>
    );
}


class Main extends Component {

  render() {
 
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <MainNavigatorDrawer/>           
            </NavigationContainer>
        </SafeAreaProvider>

    );
  }
}
  
export default Main;