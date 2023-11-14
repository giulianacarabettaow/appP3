import react, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MyCamera } from '../../components/MyCamera';



class PostForm extends Component {
    constructor(){
        super()
        this.state= {
            Post:'',
            posted:false
        }
        console.log(this.state)
    }

    crearPost(owner,post, createdAt){
        db.collection('posts').add({
            owner: owner,
            post: post,
            likes:[],
            comments:[],
            createdAt: createdAt
        })

      .then(res => console.log(res), this.setState({posted:true}))
      .then(()=>{this.state.posted ? this.setState({Post:''}): false})
      .then(()=> console.log(this.state))
      .catch(e => console.log(e))
    }

    render(){
        return(
            <View>
             <View style={styles.formContainer}>
                    <Text>Nuevo post</Text>

                    {/* <MyCamera style={styles.camera}/> */}

                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.setState({Post: text})}
                        placeholder='Desc...'
                        keyboardType='default'
                        value={this.state.Post}
                    />
             </View>
                <TouchableOpacity style={styles.button} onPress={()=>this.crearPost(auth.currentUser.email,this.state.Post, Date.now() )}>
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
    // camera:{
    //     height: 100
    // },
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