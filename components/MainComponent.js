import React, { Component } from 'react';
import { Platform, Image, StyleSheet, View, Text, ScrollView } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';

import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';


import { fetchDishes, fetchComments, fetchLeaders, fetchPromos } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';


const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchPromos: () => dispatch(fetchPromos())
})
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

const ReservationNavigator = createStackNavigator();
function ReservationNavigatorScreen({navigation}) {
    return(
        <ReservationNavigator.Navigator
            initialRouteName='Reservation'
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
            <ReservationNavigator.Screen
                name="Reservation"
                component={Reservation}
                options={{headerTitle: "Reserve a Table",
                            headerLeft: () => (
                                <Icon name='menu' size={24} color='white' style={{marginLeft: 10}} 
                                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
                                )}}
            />
           
        </ReservationNavigator.Navigator>
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

const FavoriteNavigator = createStackNavigator();
function FavoriteNavigatorScreens({navigation}) {
    return(
        <FavoriteNavigator.Navigator
            initialRouteName='Favourites'
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
            <FavoriteNavigator.Screen
                name="Favourites"
                component={Favorites}
                options={{headerTitle: "Favourite Items",
                        headerLeft: () => (
                            <Icon name='menu' size={24} color='white' style={{marginLeft: 10}} 
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
                            )
                }}
            />
            <FavoriteNavigator.Screen
                name="DishDetail"
                component={DishDetail}
                options={{ headerTitle: "Dish Detail"}}
            /> 
           
        </FavoriteNavigator.Navigator>
    );
}

const LoginNavigator = createStackNavigator();
function LoginNavigatorScreens({navigation}) {
    return(
        <LoginNavigator.Navigator
            initialRouteName='Login'
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
            <LoginNavigator.Screen
                name="Login"
                component={Login}
                options={{headerTitle: "Login Details",
                        headerLeft: () => (
                            <Icon name='menu' size={24} color='white' style={{marginLeft: 10}} 
                            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} />
                            )
                }}
            />
           
        </LoginNavigator.Navigator>
    );
}

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        {/* <SafeAreaView style={styles.container} forceInsert={{ top: 'always', horizontal: 'never'}}> */}
                <View style={styles.drawerHeader} >
                        <View style={{flex: 1}} >
                            <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                        </View>
                        <View style={{flex: 2}}>
                            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                        </View>
                    
                </View>
                <DrawerItemList {...props} />
        {/* </SafeAreaView> */}
    </ScrollView>
)

const MainNavigator = createDrawerNavigator();
function MainNavigatorDrawer() {
    return(
        <MainNavigator.Navigator 
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContentComponent {...props} />}
            drawerStyle={{
                backgroundColor:'#D1C4E9',
                
            }}
        >
            <MainNavigator.Screen name="Login" 
                    component={LoginNavigatorScreens}
                    options={{
                        drawerIcon: ({ tintColor }) => (
                            <Icon name='user' size={24} type='font-awesome' color={tintColor} />
                    )
                }} />
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
            <MainNavigator.Screen name="My Favorites" 
                    component={FavoriteNavigatorScreens}
                    options={{
                        drawerIcon: ({ tintColor }) => (
                            <Icon name='heart' size={24} type='font-awesome' color={tintColor} />
                        )
                    }} />
            <MainNavigator.Screen name="Reserve Table" 
                    component={ReservationNavigatorScreen}
                    options={{
                        drawerIcon: ({ tintColor }) => (
                            <Icon name='cutlery' size={24} type='font-awesome' color={tintColor} />
                        )
                    }} />


        </MainNavigator.Navigator>
    );
}


class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

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

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 190,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 40,
        
    },
    drawerImage: {
        marginTop: 40,
        marginLeft:10,
        width: 80,
        height: 60
    }
})
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);