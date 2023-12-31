import react, { Component } from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';

import Login from '../screens/Login/Login';
import Register from '../screens/Register/Register';
import Menu from './Menu';
import Comments from '../screens/Comments/Comments';
import Profile from '../screens/Perfil/Profile';
import notMeProfile from '../screens/notMeProfile/notMeProfile';

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
              <Stack.Screen name='Comments' component={Comments} options={{headerShown :false}} />
              {/* <Stack.Screen name="Go Back" component={Profile} /> */}
              <Stack.Screen name="notMeProfile" component={notMeProfile} options={{headerShown :false}} />
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