import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { db, auth } from '../../firebase/config';
import Post from '../../components/Post';


class perfil extends Component {
    constructor(props){
        super(props)
        this.state={
            db.collection('username','bio','img','email').onSnapshot(
                docs => {

                })
        }
        }   
}


export default perfil