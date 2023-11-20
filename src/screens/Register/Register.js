import react, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class Register extends Component {
    constructor(){
        super()
        this.state= {
            loader: true,
            email:'',
            username:'',
            password:'',
            bio:'',
            img:'',
            errorMessage: '',
            registered: false
        }
        console.log(this.state)
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            user !== null ? this.props.navigation.navigate('Menu') : this.setState({loader: false})
        },console.log('aca',this.state))
    }

    register (email, pass, username){
    auth.createUserWithEmailAndPassword(email,pass)
    .then(()=>(db.collection('user').add({
            owner: auth.currentUser.email,
            username: username,
            createdAt: Date.now(),
            bio: this.state.bio
        })
        ))

    .then( ()=>{this.setState({registered:true}) } )
    .then(()=>{this.setState({email:'', username:'',password:'',bio:'',img:''})})
    
    .catch( error => {
        this.setState({errorMessage: error.message},()=>console.log(this.state, error))})
    }           

    render(){
        return(
            <View>
            { this.state.loader === true ? 
                <ActivityIndicator  size='large' color='green'/>

                :

                <View>
                    <View style={styles.formContainer}>
                    <Text style={styles.tituloPagina}>Register</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.setState({email: text})}
                        placeholder='email           *obligatorio*'
                        keyboardType='email-address'
                        value={this.state.email}
                        />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.setState({username: text})}
                        placeholder='user name        *obligatorio*'
                        keyboardType='default'
                        value={this.state.userName}
                        />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.setState({password: text})}
                        placeholder='password         *obligatorio*'
                        keyboardType='email-address'
                        secureTextEntry={true}
                        value={this.state.password}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.setState({bio: text})}
                        placeholder='Biografia         *Opcional*'
                        keyboardType='default'
                        value={this.state.bio}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text)=>this.setState({img: text})}
                        placeholder='Imagen             *Opcional*'
                        keyboardType='default'
                        value={this.state.img}
                    />
                    
                    </View>
                    <View>
                    {
                    this.state.password === '' || this.state.email === '' ||  this.state.username === '' ?
                            <View style={styles.input}>
                                    <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password,this.state.username, this.state.bio)}>
                                        <Text> Enviar </Text>
                                    </TouchableOpacity>
                                    {this.state.errorMessage !== ''? <Text >Completa todos los campos obligatorios</Text> : false}
                            </View>
                                    :
                            <View style={styles.input}>
                                    <TouchableOpacity style={styles.button} onPress={()=>(this.register(this.state.email, this.state.password,this.state.username))}>
                                        <Text> Enviar </Text>
                                    </TouchableOpacity>
                                    {this.state.errorMessage ? <Text >{this.state.errorMessage}</Text> : false}
                                    {/* {console.log('Registrado', this.state)} */}
                                    
                            </View>
                    }
                    <View style={styles.input}>
                    <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Login')} >
                        <Text> Ya tengo cuenta. Ir a Login </Text>
                    </TouchableOpacity>
                    </View>

                    </View>
                </View>
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
    tituloPagina:{
        fontWeight: 'bold'
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
        backgroundColor:'#846C5B',
        // padding: 10,
        textAlign: 'center',
        height:25,
        borderWidth:1,
        borderRadius: 15,
        borderStyle: 'solid',
        borderColor: '#443742',
        display: 'flex',
    },
    textButton:{
        color: '#fff'
    }

})


export default Register