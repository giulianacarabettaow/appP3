import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons';
import Home from '../screens/Home/Home';
import PostForm from '../screens/PostForm/PostForm';
import Search from '../screens/Search/Search';
import Profile from '../screens/Perfil/Profile';

const Tab = createBottomTabNavigator();

function Menu (){

    return(
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false,  tabBarInactiveTintColor: '#5c0931' }}>
            <Tab.Screen name='Home' component={Home}  options={{tabBarIcon: () => <FontAwesome name="home" size={24} color="#5c0931" /> ,headerShown: false}}/>
            
            <Tab.Screen name='PostForm' component={PostForm} options={{tabBarIcon: () => <FontAwesome name="plus" size={24} color="#5c0931" /> ,headerShown: false}}/>

            <Tab.Screen name='Search' component={Search} options={{tabBarIcon: () => <FontAwesome name="searchengin" size={24} color="#5c0931" /> ,headerShown: false}}/>

            <Tab.Screen name='Profile' component={Profile} options={{tabBarIcon: () => <FontAwesome name="user" size={24} color="#5c0931" /> ,headerShown: false}}/>
            {/* //aca van todas las pantallas de la aplicacion */}
        </Tab.Navigator>
    )
}

export default Menu;