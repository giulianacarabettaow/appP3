import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';


class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            email: this.props.postInfo.data.owner,
            texto: this.props.postInfo.data.post,
            howManyLikes: this.props.postInfo.data.likes.length, 
            howManyComments:this.props.postInfo.data.comments.length,
            myLike: false,
            comment: '',
            userInfo:[],
            userLoggedInfo:[], 
            emptyComment:''
        }
    }

    componentDidMount(){
        // chequar si Mylike es true o false
        if (this.props.postInfo.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                myLike: true
            })
        }console.log(this.state.howManyLikes)
// Lo usamos para traer el nombre de usuario del creador de cada posteo
        db.collection("user").where("owner", '==', this.state.email).onSnapshot((docs) => {
            let userInfo = [];
            docs.forEach((doc) => {
              userInfo.push({
                data: doc.data()
              })
            });
            this.setState({
              userInfo: userInfo,
            });
        }); console.log(this.state)
// Lo usamos para traer el nombre de usuario logueado. Para que aparezca el nombre del usuario que hizo el comentario, en el obj lit del comentario dentro del documento del post
        db.collection("user").where("owner", '==', auth.currentUser.email).onSnapshot((docs) => {
            let userLoguedInfo = [];
            docs.forEach((doc) => {
            userLoguedInfo.push({
                data: doc.data()
            })
            });
            this.setState({
            userLoguedInfo: userLoguedInfo,
            });
        });       
    }

    like(){
        db.collection('posts').doc(this.props.postInfo.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                myLike: true,
                howManyLikes: this.state.howManyLikes  })
            })
            .then(()=> console.log('likes',this.state.myLike))
            .catch(e => console.log(e))
    }

    dislike(){
        db.collection('posts').doc(this.props.postInfo.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
            .then(() => {
                this.setState({
                    myLike: false,
                    howManyLikes: this.state.howManyLikes 
                })
            })
            .then(()=> console.log('dislike',this.state.myLike))
            .catch(e => console.log(e))
    }
    comment(comment){
        if (comment !== ''){
            const commentToSave = {
              ownerUsername: this.state.userLoguedInfo[0]?.data.username,
              email: auth.currentUser.email,
              createdAt: Date.now(),
              texto: comment
            }
            db.collection('posts').doc(this.props.postInfo.id).update({
                comments: firebase.firestore.FieldValue.arrayUnion(commentToSave)
            })
            .then(() => {
                  this.setState({
                  comment: '',
                  howManyComments: this.state.howManyComments + 1
              });
            })
            .then(()=> console.log('andan los comentarios',this.state.comment))
          .catch(e => console.log(e))
        }else{
            this.setState({emptyComment: 'No puedes enviar un comentario vacío'})
        }
    }
    render(){
        console.log(this.state.myLike)
        return(
          
           <View>
            <Text>Datos del Post</Text>
            <Text>{this.state.email}</Text>
            <Text>{this.state.texto}</Text>
            <Text>{this.state.userInfo[0]?.data.username}</Text>

            <Text style={styles.input}># likes: {this.state.howManyLikes.length}</Text>
            <Text style={styles.input}># Comentarios: {this.state.howManyComments.length}</Text>
            

            {this.state.myLike  ?  
            <TouchableOpacity onPress={()=> this.dislike()}>
                Dislike
            </TouchableOpacity> 
            
            :
            
            <TouchableOpacity onPress={()=> this.like()}>
                Like
            </TouchableOpacity>
            }
            <View>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='Escribir comentario...'
                    onChangeText={ text => this.setState({comment:text}) }                        
                    value={this.state.comment}
                    />
                
                <TouchableOpacity onPress={() => this.comment(this.state.comment)}>
                    <Text style={styles.boton}>Comment</Text>
                </TouchableOpacity>
                {this.state.emptyComment != '' ? <Text>{this.state.emptyComment}</Text>: false}
            </View>
                {/* No anda la redireccion a Comments! */}
            <View style={styles.input}>
             <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Comments')} >
                    <Text> Leer comentarios... </Text>
            </TouchableOpacity>
            </View>

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