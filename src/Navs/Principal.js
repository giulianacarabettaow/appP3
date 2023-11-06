import react, { Component } from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import Menu from './Menu';
const Stack = createNativeStackNavigator();


class Principal extends Component {
    constructor(){
        super()
        this.state={
      
        }
    }
    
    render(){
        return(

            <NavigationContainer style={styles.container}>

            <Stack.Navigator>
              <Stack.Screen name='Register' component={Register} options={{headerShown :false}}  />
              <Stack.Screen name='Login' component={Login} options={{headerShown :false}} />
              <Stack.Screen name='Menu' component={Menu} options={{headerShown :false}} />
            </Stack.Navigator>
    
          </NavigationContainer>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Principal