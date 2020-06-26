import React from 'react';
import { Card, Text, Button, Icon } from 'react-native-elements';
import { StyleSheet, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends React.Component {

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@test.com'],
            subject: 'Enquiry',
            body: 'To whom it may concern.'
        });
    }

    render() {
        return(
            <ScrollView style={styles.background}>
     
                <Animatable.View animation='fadeInDown' duration={500} delay={100}>
                    <Card
                        title="Contact Information"
                    >
                        <Text style={styles.addressInfo}>
                            121, Clear Water Bay Road
                        </Text>
                        <Text style={styles.addressInfo}>
                        Clear Water Bay, Kowloon
                        </Text>
                        <Text style={styles.addressInfo}>
                        HONG KONG
                        </Text>
                        <Text style={styles.addressInfo}>
                        Tel: +852 1234 5678
                        </Text>
                        <Text style={styles.addressInfo}>
                        Fax: +852 8765 4321
                        </Text>
                        <Text style={styles.addressInfo}>
                            Email:confusion@food.net
                        </Text>
                        <Button
                            title="Send Email"
                            buttonStyle={{backgroundColor: "#512DA8"}}
                            icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                            onPress={this.sendMail}
                            />
    
                    </Card>  
                </Animatable.View>      
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    addressInfo: {
        fontSize: 15,
        fontWeight: "400",
        padding: 10
    },
    background: {
        backgroundColor: "#E9E9EF"
    }
})

export default Contact;