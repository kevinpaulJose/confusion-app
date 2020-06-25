import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}



class Menu extends React.Component {



    // static navigationOptions = {
    //     title: 'Menu'
    // };

    render() {
            //index is supplied from keyExtrator, item is from data
        const renderMenuItem = ({item, index}) => (
        <Animatable.View animation='fadeInRightBig' duration={500} delay={300}>
            <Tile 
                key={index}
                title={item.name}
                caption={item.description}
                featured
                imageSrc={{uri: baseUrl + item.image}}
                onPress={() => navigate('DishDetail', {dishId: item.id})}
                />
            </Animatable.View>
        )

        const { navigate } = this.props.navigation;

        if(this.props.dishes.isLoading){
            return(
                <Loading />

            );
        }else if(this.props.dishes.errMess){
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            )
        }else{
            return(
                <FlatList 
                data={this.props.dishes.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
            )
        }

    }

}

export default connect(mapStateToProps)(Menu);