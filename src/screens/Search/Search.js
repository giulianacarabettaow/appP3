import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase';
import { db ,auth } from '../../firebase/config';
import User from '../../components/User';

class Search extends Component {
    constructor(){
        super()
        this.state={
           usuarios:[],
           usuariosFiltrados:[],
           getData: false,
           search: false,
           inputSearch:'',
           usersErr: false
        },console.log(this.state)
    }

    componentDidMount() {
        db.collection('user').onSnapshot(
            docs => {
                let users = [];

                docs.forEach(oneUser => {
                    users.push({
                        id: oneUser.id,
                        data: oneUser.data() })
                })
                this.setState({ usuarios: users, getData: true })
            }
        )
    }

    textEntry(event){
         this.setState({ inputSearch: event.target.value })
        if (event.target.value === '') {
            this.setState({ usuariosFiltrados: [] })
        }
        else {
            let filteredUsers = this.state.usuarios?.filter((user) => user.data.username?.toLowerCase().includes(event.target.value.toLowerCase()));
            this.setState({ usuariosFiltrados: filteredUsers })
            if (filteredUsers.length === 0 ) {
                this.setState({
                    usersError: true
                })
            } else {
                this.setState({
                    usersError: false
                })
            }
        }
    }

    render(){
         console.log('filtrados:',this.state.usuariosFiltrados)
        return(
          <View style={styles.background}>
            <Text style={styles.formContainer}>Buscá usuarios...</Text>
          <TextInput style={styles.input}
              keyboardType='default'
              placeholder='Filter by username or email '
              onChangeText={text => this.setState({ inputSearch: text })}
              value={this.state.inputSearch}
              onChange={(event) => this.textEntry(event)}
          />

          <FlatList
                    data={this.state.usuariosFiltrados}
                    keyExtractor={user => user.id.toString()}
                    renderItem={({ item }) =>  <User user={item}  propsNav={this.props} />  }
                />
          </View>

        )
    }
}
const styles = StyleSheet.create({
    background:{
        backgroundColor: '#E0E0E0'
    },
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 10,
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


export default Search;