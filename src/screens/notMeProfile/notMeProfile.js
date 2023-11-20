import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db, auth } from '../../firebase/config';


import Post from '../../components/Post';
import React from 'react';

class notMeProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userInfo: [],
        userPosts: [],
        loader: true,
        userEmail: '',
        password: '',
        error: false,
      }
    }
        
getUserData(){

    let user = this.props.route.params.user
    // if (this.props.route.params) {
    //   this.setState({reloadedProfile:true})
    //   user = this.props.route.params.user
    // } else {
    //   user = auth.currentUser.email
    // } console.log(user)
    db.collection("user").where("owner", '==', user)
    .onSnapshot((docs) => {
      let userInfo = [];
      docs.forEach((doc) => {
        userInfo.push({
          data: doc.data(),
        })
      });
      this.setState({
        userInfo: userInfo,
        userEmail: user,
        loader: false
      });
      this.getUserPosts(user)
    });
}

getUserPosts(user) {
    db.collection("posts").where("owner", '==', user).orderBy('createdAt', 'desc').onSnapshot((docs) => {
      let userPosts = [];
      docs.forEach((doc) => {
        userPosts.push({
          id: doc.id,
          data: doc.data()
        })
      });
      this.setState({
        userPosts: userPosts,
        loader: false
      });
    });
  }

  
componentDidMount(){
  this.getUserData()
}

 backToHome(){
    this.props.navigation.navigate('Home')
  }

render() {
  console.log(this.state),
  console.log('props',this.props.route.params)

  return ( 
    
      <View>
        <Text style={styles.texto}>{this.state.userInfo[0]?.data.username}</Text>
        <Text style={styles.texto}>{this.state.userInfo[0]?.data.owner}</Text>
   
        <Text style={styles.texto}>Posts: {this.state.userPosts.length}</Text>
    
        {this.state.userPosts.length == 0 ? (
          <Text>No hay posteos</Text>
        ) : (
          <FlatList
            data={this.state.userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Post
                propsNav={this.props}
                postInfo={item}
              />
            )}
          />
        )}
        <TouchableOpacity onPress={()=> this.backToHome()}><Text>Volver a home</Text></TouchableOpacity>

      </View>
  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageTitle: {
    color: 'white',
    fontSize: 40,
    padding: 15,
    backgroundColor: '#5c0931',
    alignItems: 'center',
    justifyContent: 'center'
  },
  outFunct: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    delete: {
    }
  },
  imagen: {
    height: 100,
    width: 100,
    borderRadius: 10,
    borderColor: 'white'
  },
  texto: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 17,
    bio: {
      fontWeight: 'normal',
      color: 'white',
      fontSize: 15
    }
  },
  activity: {
    marginTop: 250
  },
  field: {
    borderWidth: 1,
    backgroundColor: 'white',
    color: '#535353',
    borderRadius: 2,
    paddingLeft: 10,
    shadowOpacity: 20,
  },
  submit: {
    padding: 10,
    color: 'white',
    backgroundColor: 'red',
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 6
  },
  error: {
    color: 'red',
    backgroundColor: 'grey',
    borderRadius: 50,
    marginBottom: 10
  },
  nothingText: {
    textAlign: 'center',
    color: '#5c0931',
    paddingVertical: 20
  },
  borrar: {
  flexDirection: 'row',
  marginBottom: 10,
  justifyContent: 'flex-end'
  }
})



export default notMeProfile