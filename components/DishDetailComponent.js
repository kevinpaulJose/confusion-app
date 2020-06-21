import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { postFavorite } from '../redux/ActionCreators';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})

function RenderDish(props) {
    const dish = props.dish;
    if(dish != null) {
        return(
            <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}
                >
                <Text style={
                    {margin: 10}
                }>
                    {dish.description}
                </Text>
                {/* <View style={{justiftyContent:"center", alignItems:"center"}}> */}
                    <Icon
                        raised
                        reverse
                        name={props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? alert('Already Fav') : props.onPress()} />
                {/* </View> */}


            </Card>
        );
    }else {
        return(
            <View></View>
        );
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating}</Text>
                <Text style={{fontSize: 12}} >{'-- '+ item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return(
        <Card title='Comments'>
            <FlatList data={comments} renderItem={renderCommentItem} keyExtractor={item => item.id.toString()} />
        </Card>
    );
}

class DishDetail extends React.Component {
    

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    // static navigationOptions = {
    //     title: 'Dish Details'
    // };
    render() {
        const dishId = this.props.route.params.dishId;
        return(
            <FlatList 
                ListHeaderComponent={
                    <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite = {this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} />
                }
                ListFooterComponent={
                    <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                }
                style={{backgroundColor: "#E9E9EF"}}
            />

                

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);