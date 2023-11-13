import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/Home/Home';
import PostForm from '../screens/PostForm/PostForm';
import Search from '../screens/Search/Search';
import Profile from '../screens/Perfil/Profile';
import Comments from '../screens/Comments/Comments';

const Tab = createBottomTabNavigator();

function Menu (){

    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home}  options={ { headerShown: false }}/>
            <Tab.Screen name='PostForm' component={PostForm} options={{headerShown:false}}/>

            <Tab.Screen name='Comments' component={Comments} options={{headerShown:false}}/>

            <Tab.Screen name='Search' component={Search} options={{headerShown:false}}/>

            <Tab.Screen name='Profile' component={Profile} options={{headerShown:false}}/>
            {/* //aca van todas las pantallas de la aplicacion */}
        </Tab.Navigator>
    )
}

export default Menu;