import React from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Alert, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
// import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

class Reservation extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }
    calenderId = '';
    


    async obtainCalendarPermission() {
        await Permissions.askAsync(Permissions.CALENDAR);
    }


    async addReservationToCalendar(date) {
        
        await this.obtainCalendarPermission();
        
        let dateCurr = Date.parse(date);
        let endDate = new Date(dateCurr + 3600 * 2 * 1000);
        
        const defaultCalendarSource=Platform.OS==='ios'?await this.getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };
        
        const defaultCalendarId=await Calendar.createCalendarAsync({
            title: 'Your Reservation at Con Fusion',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source : defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });

        await Calendar.createEventAsync(defaultCalendarId, {
            title: 'Con Fusion Table Reservation',
            startDate: dateCurr,
            endDate: endDate,
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        });
    }

    // async test() {
    //     const { status } = await Calendar.requestCalendarPermissionsAsync();
    //   if (status === 'granted') {
    //     const calendars = await Calendar.getCalendarsAsync();
    //     console.log('Here are all your calendars:');
    //     console.log({ calendars });
    //   }
    // }

    
      async getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'iCloud');
        return defaultCalendars[0].source;
      }

    handleReservation() {
        // this.openModal();
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: '+ this.state.guests+'\nSmoking? '+this.state.smoking+
            '\nDate and Time: '+this.state.date,
            [
                {text: 'Cancel', onPress: () => this.resetForm(), style: 'cancel'},
                {text: 'Ok', onPress: () => {
                    // this.presentLocalNotification(this.state.date);
                    this.addReservationToCalendar(this.state.date);
                    this.resetForm();
                } }
            ],
            {cancelable: false}
        )
        
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        })
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if(permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if(permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notification');
            }
        }
        return permission;
    }

    // closeModal() {
    //     this.setState({
    //         showModal: false
    //     })
    // }
    // openModal() {
    //     this.setState({
    //         showModal: true
    //     })
    // }


    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+date+' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true
            }
        });
    }

    render() {
        return(
            <ScrollView>
                <Animatable.View animation='zoomIn' duration={500} delay={300}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Number of Guests
                        </Text> 
                        <Picker style={styles.formItem} 
                                selectedValue={this.state.guests}
                                onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                            <Picker.Item label='1' value='1'></Picker.Item>
                            <Picker.Item label='2' value='2'></Picker.Item>
                            <Picker.Item label='3' value='3'></Picker.Item>
                            <Picker.Item label='4' value='4'></Picker.Item>
                            <Picker.Item label='5' value='5'></Picker.Item>
                            <Picker.Item label='6' value='6'></Picker.Item>
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Smoking/Non-Smoking
                        </Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            trackColors='#512DA8'
                            onValueChange={(value) => this.setState({smoking: value})}>

                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Date and Time
                        </Text>
                        <DatePicker 
                            style={{flex: 2, marginRight: 20}}
                            date={this.state.date}
                            format=''
                            mode='datetime'
                            placeholder='select date and time'
                            minDate='2017-01-01'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => {this.setState({date: date})}} />
                    </View>
                    <View style={styles.formRow}>
                        <Button 
                            title='Reserve' 
                            color='#522DA8'
                            onPress={() => this.handleReservation()}
                            accessibilityLabel='Learn More' />
                    </View>

                    
                    {/* <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.showModal}
                        onDismiss={() => {this.closeModal(); this.resetForm()}}
                        onRequestClose={() => {this.closeModal(); this.resetForm()}} 
                    >
                        <View style={styles.modal}>
                            <Text style={styles.modalTitile}>Your Reservation</Text>
                            <Text style={styles.modalText}>Number of Huests: {this.state.guests}</Text>
                            <Text style={styles.modalText}>Smoking? {this.state.smoking ? 'Yes' : 'No'}</Text>
                            <Text style={styles.modalText}>Date and Time {this.state.date}</Text>
                            <Button
                                title='close'
                                onPress={() => {this.closeModal(); this.resetForm()}}
                                color='#512DA8' />
                        </View>
                        
                    </Modal> */}
                </Animatable.View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 0,
    },
    modalTitile: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20,
        paddingTop: 70,
        paddingBottom: 20,
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation;