import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import firebase from 'firebase';
import { db, auth } from '../../firebase/config';
import React from 'react';


class Comments extends Component {
    constructor(props){
        super(props)
        this.state={
        comentarios:[],
        userLoggedInfo:[], 
        comment:'',
        emptyComment:''
        }
    }

    componentDidMount() {

        db.collection('posts')
          .doc(this.props.route.params.id)
          .onSnapshot(doc => {
            this.setState({
              comentarios:doc.data().comments
            }, () => console.log(this.state.comentarios))
          })

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

      comment(comment){
        if (comment !== ''){
            const commentToSave = {
              ownerUsername: this.state.userLoguedInfo[0]?.data.username,
              email: auth.currentUser.email,
              createdAt: Date.now(),
              texto: comment
            }
            db.collection('posts').doc(this.props.route.params.id).update({
                comments: firebase.firestore.FieldValue.arrayUnion(commentToSave)
            })
            .then(() => {
                  this.setState({
                  comment: '',
              });
            })
            .then(()=> console.log('andan los comentarios',this.state.comment))
          .catch(e => console.log(e))
        }else{
            this.setState({emptyComment: 'No puedes enviar un comentario vacío'})
        }
    }
    backToHome(){
      this.props.navigation.navigate('Home')
    }
    render(){
    console.log(this.state.comentarios)
        return(
          <React.Fragment>
            <View style={styles.comentarios}>
              <Text>comentarios</Text>
              <FlatList
                  data={this.state.comentarios.sort((a, b) => b.createdAt - a.createdAt)}
                  keyExtractor={( item ) => item.createdAt.toString()}
                  renderItem={({item}) => 
                      <View style={styles.commentBox}>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Profile', {user:item.email})} style={styles.commentBox.commentOwner}>
                        <Text>{item.ownerUsername}</Text>
                        </TouchableOpacity>
                        <Text>{item.texto}</Text>
                      </View>} 
              />                  
            </View>
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
        <TouchableOpacity onPress={()=> this.backToHome()}><Text>Volver a home</Text></TouchableOpacity>
        </React.Fragment>
        )
      }
    

}

const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        alignItems:'center',
        paddingHorizontal:10,
        marginTop: 20,
    },
    comentarios:{
      textAlign: 'center',
      border: '1px solid #5c0931',
      width: '100%',
      backgroundColor: 'white'
    },
    commentBox:{
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-start',
      padding: 5,
      commentOwner: {
          width: 'auto',
          textAlign: 'start',
          owner: {
              fontWeight: 550,
              fontSize: 15
          }
      },
      texto: {
          width: 'auto',
          textAlign: 'start',
          fontSize: 15
      }
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
        color: '#fff',
        fontSize: 10,
        backgroundColor:'#348AA7',
    }

})


export default Comments;