import React from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, Input } from 'react-native-elements';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { postFavorite } from '../redux/ActionCreators';
import { Rating, AirbnbRating } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

  const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

class RenderDish extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            author: '',
            comment: '',
            rating: 5
        }
    }
    closeModal() {
        this.setState({
            showModal: false
        })
    }

    openModal() {
        this.setState({
            showModal: true
        })
    }

    handleViewRef = ref => this.view =ref;

    render(){
        const dish = this.props.dish;



        const recogonizeDrag = ({moveX, moveY, dx, dy}) => {
            if(dx < -200)
                return true;
            else
                return false;
        };
        const recognizeComment = ({moveX, moveY, dx, dy}) => {
            if(dx > +200){
                console.log("Right Drag")
                return true;

            }
            else
                return false;
        };
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => {
                return true;
            },
            onPanResponderGrant: () => {
                this.view.rubberBand(2000)
                    .then(endState => console.log());
            },
            onPanResponderEnd: (e, gestureState) => {
                if (recogonizeDrag(gestureState))
                    Alert.alert(
                        'Add to facavorites',
                        'Are you wish to add '+dish.name+' to favorites',
                        [
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel'
                            },
                            {
                                text: 'OK',
                                onPress: () => this.props.favorite ? alert('Already Fav') : this.props.onPress()
                            }
                        ],
                        {cancelable: false}
                    )
                if(recognizeComment(gestureState)){
                    console.log("executed");
                    this.setState({showModal: true})
                }
                return true;
            }
        });
        const RenderModal = () => {
            return(
                <Modal
                    animationType={'slide'}
                    presentationStyle="fullScreen"
                    visible={this.state.showModal}
                    onDismiss={() => {this.setState({showModal: false})}}
                    onRequestClose={() => {this.setState({showModal: false})}} >
                        <View style={styles.modal}>
                            <Rating style={{marginTop: 70}}
                                    imageSize={40} startingValue={5}
                                    showRating
                                    onFinishRating={(value) => this.setState({rating: value})}   />
                            <Text style={{color: '#512DA8', alignSelf:'center', fontSize: 10}}>Slide to change Ratings</Text>
                            <View style={{marginTop: 20}}>
                                <Input placeholder="Author"
                                        onChangeText={value => this.setState({author: value})}
                                        leftIcon={
                                            <Icon name='user-o' type='font-awesome' style={{marginRight: 10}} />
                                        } 
                                />
                                <Input placeholder="Comment"
                                        onChangeText={value => this.setState({comment: value})}
                                        leftIcon={
                                            <Icon name='comment-o' type='font-awesome' style={{marginRight: 10}} />
                                        } 
                                />
                                <Button 
                                    title='Submit' 
                                    color='#522DA8'
                                    onPress={() => {
                                        this.props.postComment(dish.id, this.state.rating, this.state.author, this.state.comment);
                                        this.setState({showModal: false});
                                    }}
                                    accessibilityLabel='Learn More' />
                                <Button 
                                    style= {{marginTop: 20}}
                                    title='Cancel' 
                                    color='#808080'
                                    onPress={() => this.setState({showModal: false})}
                                    accessibilityLabel='Learn More' />
                            </View>
                        </View>
                </Modal>
            )
        }
        if(dish != null) {
            return(
                <Animatable.View animation='fadeInDown' duration={500} delay={100}
                                ref={this.handleViewRef}
                                {...panResponder.panHandlers}>
                    <Card
                        featuredTitle={dish.name}
                        image={{uri: baseUrl + dish.image}}
                        >
                        <Text style={
                            {margin: 10}
                        }>
                            {dish.description}
                        </Text>
                        <View style={{justiftyContent:"center", alignItems:"center"}}>
                            <View style={{justiftyContent:"center", alignItems:"center", flexDirection: 'row'}}>
                                <Icon
                                    raised
                                    reverse
                                    name={this.props.favorite ? 'heart' : 'heart-o'}
                                    type='font-awesome'
                                    color='#f50'
                                    onPress={() => this.props.favorite ? alert('Already Fav') : this.props.onPress()} />
                                <Icon
                                    raised
                                    reverse
                                    name='pencil'
                                    type='font-awesome'
                                    color='#512DA8'
                                    onPress={() => {this.openModal()}} />
                            </View>
                        </View>
                        <RenderModal />
                        
        
                    </Card>
                </Animatable.View>
            );
        }else {
            return(
                <View></View>
            );
        }
    }


}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <View style={{justiftyContent:"left", alignItems:"left", marginTop: 6, marginBottom: 6 }}>
                    <Rating imageSize={14} readonly startingValue={item.rating}  />
                </View>

                <Text style={{fontSize: 12}} >{'-- '+ item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return(
        <Animatable.View animation='fadeInUp' duration={500} delay={300}>
            <Card title='Comments'>
                <FlatList data={comments} renderItem={renderCommentItem} keyExtractor={item => item.id.toString()} />
            </Card>
        </Animatable.View>
    );
}

class DishDetail extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            showModal: false
        }
    }



    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    postCommentfn(dishId, rating, author, comment) {
        this.props.postComment(dishId, rating, author, comment);
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
                    onPress={() => this.markFavorite(dishId)}
                    showModal={this.state.showModal}
                    postComment={(dishId, rating, author, comment) => this.postCommentfn(dishId, rating, author, comment)}
                     />
                }
                ListFooterComponent={
                    <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                }
                style={{backgroundColor: "#E9E9EF"}}
            />

                

        )
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

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);