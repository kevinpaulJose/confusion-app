import React from 'react';
import { Card, Text, ListItem } from 'react-native-elements';
import { StyleSheet, ScrollView, FlatList, View } from 'react-native';
import { LEADERS } from '../shared/leaders';

class About extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            leaders: LEADERS
        }
    }


    render() {

        const History = () => {
            return(
                <View>
                    <Card
                    title="Our History">
                    <Text style={styles.addressInfo}>
                    Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                    </Text>
                    
                    <Text style={styles.addressInfo}>
                    The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
                    </Text>
                    </Card>     
                </View>
                
            );
            
        }
        const RenderLeader = ({item, index}) => {
            return(
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    leftAvatar={{source: require('./images/alberto.png')}}
                    />
            )
        }
        const RenderLeaders = () => {
            return(
                    <Card title="Corporate Leadership">
                        <FlatList
                            data={this.state.leaders}
                            renderItem={RenderLeader}
                            keyExtractor={item => item.id.toString()}
                        >

                        </FlatList>
                    </Card>
            )
        }
        return(
            <ScrollView style={styles.background}>
                <History />
                <RenderLeaders />
            </ScrollView>

        ) 
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

export default About;