import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
// import { FontAwesome } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';
// import { Entypo } from '@expo/vector-icons';


class PostDos extends Component {
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
            emptyComment:'',
            comentarios:[]
        },console.log(this.state)
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
        db.collection('posts')
          .doc(this.props.postInfo.id)
          .onSnapshot(doc => {
            this.setState({
              comentarios:doc.data().comments
            }, () => console.log(this.state.comentarios))
          })
    }

    like(){
        db.collection('posts').doc(this.props.postInfo.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => {
            this.setState({
                myLike: true,
                howManyLikes: this.state.howManyLikes +1 })
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
                    howManyLikes: this.state.howManyLikes -1
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


    navegarComment(){
        this.props.propsNav.navigation.navigate('Comments', {id: this.props.postInfo.id, commentsData: this.props.postInfo.data.comments})
    }

    deletePost() {
        if (confirm('Borrar posteo') === true){
            db.collection('posts').doc(this.props.postInfo.id).delete()
        } else {
            false
        }
    }

    render(){
        console.log(this.props)
        console.log('id',this.props.postInfo.id)

        return(
          
           <View >
                
                <Text>{this.state.email}</Text>
                <Text>{this.state.texto}</Text>
                <Text>{this.state.userInfo[0]?.data.username}</Text>
                
                <View style={styles.botoncitos}>
                    <Text style={styles.input} ># likes: {this.state.howManyLikes}</Text>
                    <Text style={styles.input}># Comentarios: {this.state.howManyComments}</Text>
                </View>
                

                {this.state.myLike  ?  
                <TouchableOpacity onPress={()=> this.dislike()} >
                </TouchableOpacity> 
                
                :
                
                <TouchableOpacity onPress={()=> this.like()}>
                <Text> Like </Text>
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
                
                    <FlatList
                        data={this.state.comentarios.sort((a, b) => b.createdAt - a.createdAt).slice(0,4)}
                        keyExtractor={( item ) => item.createdAt.toString()}
                        renderItem={({item}) => 
                      <View >
                        <TouchableOpacity onPress={()=> this.props.propsNav.navigation.navigate('notMeProfile', {user:item.email})} >
                        <Text>{item.ownerUsername}</Text>
                        </TouchableOpacity>
                        <Text>{item.texto}</Text>
                      </View>} 
              />                  
                </View>
                    {/* No anda la redireccion a Comments! */}
                <View style={styles.input}>
                <TouchableOpacity style={styles.button} onPress={()=>this.navegarComment()} >
                        <Text style={styles.textButton}> Leer comentarios... </Text>
                </TouchableOpacity>
                </View>
                {
                auth.currentUser.email === this.props.postInfo.data.owner ?
                        <TouchableOpacity onPress={() => this.deletePost()}><Text>Borrar posteo</Text>
                        </TouchableOpacity>
                        :
                    false
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
    botoncitos:{
        display: 'flex',
        flexDirection: 'row'
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
        margin:50,
        backgroundColor:'#846C5B',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:15,
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#443742'
    },
    textButton:{
        color: 'white'
    }

})


export default PostDos;