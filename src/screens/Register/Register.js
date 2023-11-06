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
            errorMessage: '',
            registered: false
        }
        console.log(this.state)
    }



register (email,pass){
    auth.createUserWithEmailAndPassword(email,pass)
    .then(()=>{
        this.setState({
            registered:true
        })
      })
    .then(() => (
         this.state.password != '' && this.state.email != '' && this.state.username  ? this.props.navigation.navigate('Login') : false    
         
    ))
    
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
                placeholder='email'
                keyboardType='email-address'
                value={this.state.email}
                />
            <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({username: text})}
                placeholder='user name'
                keyboardType='default'
                value={this.state.userName}
                />
            <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({password: text})}
                placeholder='password'
                keyboardType='email-address'
                secureTextEntry={true}
                value={this.state.password}
            />
            </View>
            <View>
            {
             this.state.password === '' || this.state.email === '' ||  this.state.username === '' ?
                    <View style={styles.input}>
                            <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password)}>
                                <Text> Enviar </Text>
                            </TouchableOpacity>
                            {this.state.errorMessage !== ''? <Text >Completa todos los campos</Text> : false}
                    </View>
                            :
                    <View style={styles.input}>
                            <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password)} >
                                <Text> Enviar </Text>
                            </TouchableOpacity>
                            {this.state.errorMessage ? <Text >{this.state.errorMessage}</Text> : false}
                            {console.log('Registrado', this.state.registered)}
                            {/* {this.state.registered ? <Text >Registrado correctamente!</Text> : ''} */}
                            
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