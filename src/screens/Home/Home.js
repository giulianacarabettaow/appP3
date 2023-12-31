import react, { Component } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { db, auth } from '../../firebase/config';
// // import Post from '../../components/Post';
import PostDos from '../../components/postDos'

class Home extends Component {
    constructor(){
        super()
        this.state={
            postList:[],
            loader: true
        }
    }
    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs => {
                let postsShown = [];

                docs.forEach(unPost=>{
                    postsShown.push({
                        id: unPost.id,
                        data: unPost.data()})
                })
            this.setState({ postList:postsShown, loader: false })
            })
    }



    // logut va en en el perfil
    //  logout(){
    //      auth.signOut();
    //     //   Redirigir al usuario a la home del sitio.
    //       this.props.navigation.navigate('Login')
    //  }


    render(){
        console.log('current user;',auth.currentUser)
        return(
          <View>
            { this.state.loader === true ? <ActivityIndicator  size='large' color='gray'/>
            :
                <View style={styles.generalContainer}>
                {console.log('estoy en home')}
                <Text style={styles.title}>Coffeegram</Text>

                <FlatList
                    data={this.state.postList}
                    keyExtractor={unPost => unPost.id.toString()}
                    renderItem={({item})=><PostDos propsNav={this.props} postInfo={item} style={styles.element} />}
                    // thispropsnavigation
                />
            
                </View>
            }
          </View>
        )
    }
}

const styles = StyleSheet.create({
    generalContainer:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexShrink: '0'
    },
    title:{
         color: '#443742',
         fontWeight: 'bold',
         fontSize: 40,
    },
    // flatList:{
    // },
    element:{
        display:'flex',
        flexDirection:'column',
        margin: 30,
        padding: 30,
        justifyContent: 'space-around',
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