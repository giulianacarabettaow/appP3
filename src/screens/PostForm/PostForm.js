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
                    <Text>Crea una nueva publicación</Text>
                    {/* <MyCamera style={styles.camera}/> */}
                    {/*Acá iria el campo de la foto y el preview etc */}
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.setState({Post: text})}
                        placeholder='Agrega un pie de foto'
                        keyboardType='default'
                        value={this.state.Post}
                    />
             </View>
                <TouchableOpacity style={styles.button} onPress={()=>this.crearPost(auth.currentUser.email,this.state.Post, Date.now() )}>
                    <Text style={styles.textButton}> Enviar </Text>
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
    botoncitos:{
        display: 'flex',
        flexDirection: 'row'
    },
    input:{
        // height:20,
        // paddingVertical:15,
        // paddingHorizontal: 10,
        // borderWidth:1,
        // borderColor: '#ccc',
        // borderStyle: 'solid',
        // borderRadius: 6,
        // marginVertical:10,
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        backgroundColor:  '#E0E0E0',
        borderStyle: 'solid',
        borderRadius: 10,
        marginVertical:10,
    },
    button:{
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
        color: '#fff',
        display: 'flex',
        justifyContent:'center',
        alignContent: 'center',
    },
    comentariosHome:{
        display: 'flex',
        flexDirection: 'row',
    },
    delete:{
        display: 'flex',
        justifyContent:'center',
        alignContent: 'center',
    }


})



export default PostForm;