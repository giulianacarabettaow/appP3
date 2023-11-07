import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import firebase from 'firebase';
import { db, auth } from '../firebase/config';


class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            email: this.props.postInfo.data.owner,
            texto: this.props.postInfo.data.post,
            // howMuchLikes: this.props.postInfo.data.likes.length, deberia andar este, no el de abajo. el de abajo es provisorio
            countLikes:[],
            myLike: false,
        }
    }

    componentDidMount(){
        // chequar si Mylike es true o false
    }

    like(){
        db.collection('posts').doc(this.props.postInfo.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
            .then(() => {
                this.setState({
                    myLike: true,
                    countLikes: this.state.countLikes + 1,
                    howMuchLikes: this.state.howMuchLikes + 1
                })
            })
            .catch(e => console.log(e))
    }

    dislike(){
        db.collection('posts').doc(this.props.postInfo.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
            .then(() => {
                this.setState({
                    myLike: false,
                    countLikes: this.state.countLikes - 1,
                    howMuchLikes: this.state.howMuchLikes - 1
                })
            })
            .catch(e => console.log(e))
    }
    render(){
        // console.log('en post', this.props)
        return(
          
           <View>
            <Text>Datos del Post</Text>
            <Text>{this.state.email}</Text>
            <Text>{this.state.texto}</Text>
            <Text>{this.state.countLikes}</Text>
            {/* Likear */}
            {this.state.myLike === true ?  
            <TouchableOpacity onPress={()=> this.dislike()}>
                Dislike
            </TouchableOpacity> 
            
            :
            
            <TouchableOpacity onPress={()=> this.like()}>
                Like
            </TouchableOpacity>
            }
          

           </View>
        )
    }
}
const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }

})


export default Post;