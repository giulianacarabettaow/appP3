import react, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator} from 'react-native';

class PostForm extends Component {
    constructor(){
        super()
        this.state= {
            Post:''
        }
        console.log(this.state)
    }

    crearPost(post){
        db.collection('Post').add({
            owner: auth.currentUser.email,
            post: post,
            createdAt: Date.now()
        })

      .then(res => console.log(res))
      .catch(e => console.log(e))
    }

    render(){
        return(
            <View>
             <View style={styles.formContainer}>
                    <Text>POST FORM</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.setState({Post: text})}
                        placeholder='Desc...'
                        keyboardType='default'
                        value={this.state.Post}
                    />
             </View>
                <TouchableOpacity style={styles.button} onPress={()=>this.crearPost(this.state.Post)}>
                    <Text> Enviar </Text>
                </TouchableOpacity>
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


export default PostForm