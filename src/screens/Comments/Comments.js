import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import firebase from 'firebase';
import { db, auth } from '../../firebase/config';


class Comments extends Component {
    constructor(props){
        super(props)
        this.state={
        comentarios:[],
        comment:'',
        }
    }

    componentDidMount() {
        db.collection('posts')
          .doc(this.props.route.params.id)
          .onSnapshot(doc => {
            this.setState({
              data: doc.data(),
              comentarios:doc.data().comments.sort((a, b) => a.createdAt - b.createdAt).reverse() //esto es para que los comentarios aparezcan de manera ascendente
            }, () => console.log(this.state.data))
          })

          db.collection("users").where("email", '==', auth.currentUser.email).onSnapshot((docs) => {
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

      comment(comentario) {
        const commentAGuardar = {
          ownerUsername: this.state.userLoguedInfo[0]?.data.userName,
          ownerEmail: auth.currentUser.email,
          createdAt: Date.now(),
          description: comentario
        }
    
        db.collection('posts').doc(this.props.route.params.id).update({
          comments: firebase.firestore.FieldValue.arrayUnion(commentAGuardar)
        })
          .then(() => {
            this.setState({
              comment: '',
              commentCount: this.state.commentCount + 1
            });
          })
          
      }
    
      
    render(){

        return(
            <View >
            <View >
              {this.state.commentCount == 0 ? 
                  <Text>No comments yet...</Text>
                : <>
                  <Text >
                    {this.state.commentCount} 
                  </Text>
                  <FlatList
                        style={styles.flat}
                        data={this.state.comentarios.sort((a, b) => b.createdAt - a.createdAt)}
                        keyExtractor={( item ) => item.createdAt.toString()}
                        renderItem={({item}) => 
                                    <>
                                        <View >
                                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('Go Back', {user: item.ownerEmail})}>
                                                <Text >{item.ownerUsername}: </Text>
                                            </TouchableOpacity> 
                                            <Text >{item.description}</Text>
                                        </View>
                                    </>                  
                                }/> 
                </>
              }
              <View >
                  <TextInput
                   
                    keyboardType='default'
                    placeholder='Your comment!'
                    onChangeText={ text => this.setState({comment:text}) }
                    value={this.state.comment} />
                  <TouchableOpacity onPress={() => this.comment(this.state.comment)}>
                    <Text >
                      Up Load
                    </Text>
                  </TouchableOpacity>
              </View>
    
    
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


export default Comments;