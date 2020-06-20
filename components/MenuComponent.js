import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Menu (props) {

    //index is supplied from keyExtrator, item is from data
    const renderMenuItem = ({item, index}) => (
        <ListItem 
            key={index}
            title={item.name}
            subtitle={item.description}
            hideChevron={true}
            leftAvatar={{source: require('./images/uthappizza.png')}}
            onPress={() => props.onPress(item.id)}
            />
    )
    return(
        <FlatList 
            data={props.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            />
    );
}

export default Menu;