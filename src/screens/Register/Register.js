import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Register extends Component {
    constructor(){
        super()
        this.state= {
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

    login (email,pass){
        auth.signInWithEmailAndPassword(email,pass)
        .then(()=>{
            this.setState({
                loggedIN:true
            })
          })
        .then(() => (
             this.state.password != '' && this.state.email != ''  ? this.props.navigation.navigate('Menu') : false    
        )) 
        .catch( error => {
            this.setState({errorMessage: error.message},()=>console.log(this.state, error))
        })
    }


    register (email,pass){
    auth.createUserWithEmailAndPassword(email,pass)
    .then(()=>{
        this.setState({
            registered:true
        })
      })
    // .then(() => (
    //      this.state.password != '' && this.state.email != '' && this.state.username  ? this.props.navigation.navigate('Login') : false    
    // ))
    
    .then(()=>this.login(this.state.email,this.state.password))

    .catch( error => {
        this.setState({errorMessage: error.message},()=>console.log(this.state, error))
    })
    }           



    render(){
        return(
            <View>
                <View style={styles.formContainer}>
                <Text>Register</Text>
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
                                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password)}>
                                    <Text> Enviar </Text>
                                </TouchableOpacity>
                                {this.state.errorMessage !== ''? <Text >Completa todos los campos obligatorios</Text> : false}
                        </View>
                                :
                        <View style={styles.input}>
                                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password)} >
                                    <Text> Enviar </Text>
                                </TouchableOpacity>
                                {this.state.errorMessage ? <Text >{this.state.errorMessage}</Text> : false}
                                {console.log('Registrado', this.state.registered)}
                                
                        </View>
                }
                <View style={styles.input}>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Login')} >
                    <Text> Ya tengo cuenta. Ir a Login </Text>
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


export default Register