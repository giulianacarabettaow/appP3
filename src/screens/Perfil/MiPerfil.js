import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { db, auth } from '../../firebase/config';


import Register from '../Register/Register';

class perfil extends Component {
    constructor(props){
        super(props)
        this.state={
            db.register('username','bio','img','email').onSnapshot(
                docs => {

                })
        }
        }   
}


export default perfil