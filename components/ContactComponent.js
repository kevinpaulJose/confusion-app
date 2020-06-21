import React from 'react';
import { Card, Text } from 'react-native-elements';
import { StyleSheet, ScrollView } from 'react-native';

export default function Contact() {
    return(
        <ScrollView style={styles.background}>
 
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

            </Card>        
        </ScrollView>
    );
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