import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import firebase from 'firebase';
import { db, auth } from '../firebase/config';


class User extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
   
    render(){
        console.log("props", this.props)
        return(
          
            <View > 
            <Text>Resultado de busqueda</Text>

            <View>
            <TouchableOpacity onPress={()=> this.props.propsNav.navigation.navigate('notMeProfile', {user:this.props.user.data.owner})} style={styles.commentBox.commentOwner}>
            <Text>{this.props.user.data.username}</Text>
            </TouchableOpacity>
            <Text>{this.props.user.data.owner}</Text>
            <Text>{this.props.user.data.bio}</Text>
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
})


export default User;