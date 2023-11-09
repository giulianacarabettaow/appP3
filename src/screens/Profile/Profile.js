import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { db, auth } from '../../firebase/config';


import Post from '../../components/Post';

class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        userInfo: [],
        userPosts: [],
        loader: true,
        userEmail: '',
        password: '',
        error: false,
        input: false,
      }
    }
        
getUserData(){
    let user = ''
    if (this.props.route.params) {
      user = this.props.route.params.user
    } else {
      user = auth.currentUser.email
    }
    db.collection("users").where("email", '==', user)
    .onSnapshot((docs) => {
      let userInfo = [];
      docs.forEach((doc) => {
        userInfo.push({
          data: doc.data(),
          id: doc.id
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



componentDidMount() {
    this.getUserData()
  }



render() {
    
  }
}
export default Profile