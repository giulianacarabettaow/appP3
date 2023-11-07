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
            howMuchLikes: this.props.postInfo.data.likes.length, 
            myLike: false,
        }
    }

    componentDidMount(){
        // chequar si Mylike es true o false
        if (this.props.postInfo.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                myLike: true
            })
        }console.log(this.state)
    }

    like(){
        db.collection('posts').doc(this.props.postInfo.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                myLike: true,
                howMuchLikes: this.state.howMuchLikes + 1 })
            })
            .then(()=> console.log(this.state))
            .catch(e => console.log(e))
    }

    dislike(){
        db.collection('posts').doc(this.props.postInfo.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
            .then(() => {
                this.setState({
                    myLike: false,
                    howMuchLikes: this.state.howMuchLikes - 1
                })
            })
            .then(()=> console.log(this.state))
            .catch(e => console.log(e))
    }
    render(){

        return(
          
           <View>
            <Text>Datos del Post</Text>
            <Text>{this.state.email}</Text>
            <Text>{this.state.texto}</Text>
            <Text style={styles.input}># likes: {this.state.howMuchLikes.length}</Text>


            {this.state.myLike  ?  
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