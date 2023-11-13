import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import firebase from 'firebase';
import { db, auth } from '../../firebase/config';


class Comments extends Component {
    constructor(props){
        super(props)
        this.state={
         
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
      }
    
   
    render(){

        return(
          <Text>Comentarios</Text>

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