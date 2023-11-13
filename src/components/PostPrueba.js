import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class PostPrueba extends Component {

    render(){
        return(
            <View>
                <TouchableOpacity></TouchableOpacity>
            </View>
        )
    }
}

export default PostPrueba;