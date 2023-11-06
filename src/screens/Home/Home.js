import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { auth } from '../../firebase/config';

class Home extends Component {
    constructor(){
        super()
        this.state={
      
        }
    }

    // logout(){
    //     auth.signOut();
    //      Redirigir al usuario a la home del sitio.
    //      this.props.navigation.navigate('Login')
    // }



    render(){
        return(
            <View>
                {console.log('estoy en home')}
                <Text style={styles.input}>HOME</Text>
                <TouchableOpacity onPress={()=>this.logout()}>
                    <Text>Logout</Text>
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


export default Home;