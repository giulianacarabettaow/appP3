import react, { Component } from 'react';
import { auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class Login extends Component{
    constructor(){
        super()
        this.state= {
            password:'',
            email:'',
            loggedIN:false,
            errorMessage:'',
        }
        console.log(this.state)
    }

    
//no andan los setStates 
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

    render(){
        return(
            <View>
            <View style={styles.formContainer}>
            <Text>Login</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({email: text})}
                placeholder='email'
                keyboardType='email-address'
                value={this.state.email}
                />
            <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({password: text})}
                placeholder='password'
                keyboardType='default'
                secureTextEntry={true}
                value={this.state.password}
            />
            </View>

            <View>
            {
                this.state.password === '' || this.state.email === '' ?
                <View style={styles.input}>
                    <TouchableOpacity style={styles.button} onPress={() => this.login(this.state.email, this.state.password)} >
                        <Text > Enviar </Text>
                    </TouchableOpacity>
                    {this.state.errorMessage !== ''? <Text >Completa ambos campos</Text> : ''}
                </View>
                :
                <View style={styles.input}>
                    <TouchableOpacity onPress={() => this.login(this.state.email, this.state.password)} >
                        <Text> Enviar </Text>
                    </TouchableOpacity>
                    {this.state.errorMessage !== ''? <Text style={styles.input}>{this.state.errorMessage}</Text> : ''}
                    {console.log('Logueado',this.state.loggedIN)}
                </View>

            }
        
            </View>


            <View style={styles.input}>
             <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Register')} >
                    <Text> No tengo cuenta. Ir a registrarme </Text>
            </TouchableOpacity>
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

export default Login