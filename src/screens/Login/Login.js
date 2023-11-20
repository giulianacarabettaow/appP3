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
            this.setState({errorMessage: error.message},()=>console.log(this.state))
        })
    }

    render(){
        console.log(this.state.errorMessage);
        return(
            <View>
            <View style={styles.formContainer}>
            <Text style={styles.tituloPagina}>Login</Text>
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
                        <Text style={styles.button} > Enviar </Text>
                    </TouchableOpacity>
                    {this.state.errorMessage !== ''? <Text >Completa ambos campos</Text> : ''}
                </View>
                :
                <View style={styles.input}>
                    <TouchableOpacity style={styles.button} onPress={() => this.login(this.state.email, this.state.password)} >
                        <Text> Enviar </Text>
                    </TouchableOpacity>
                    {console.log('Logueado',this.state.loggedIN)}
                </View>

            }
        
            </View>
            
            {this.state.errorMessage !== ''? <Text style={styles.input}>{this.state.errorMessage}</Text> : ''}


            <View style={styles.input}>
             <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Register')} >
                    <Text style={styles.button}> No tengo cuenta. Ir a registrarme </Text>
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
        color: '#E0E0E',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }
})

export default Login