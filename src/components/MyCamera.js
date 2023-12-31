import React, {Component} from "react";
import { Camera } from "expo-camera";
import { db, storage } from '../firebase/config';
import { TouchableOpacity, View, } from "react-native";


class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state = {
            permission: false, //permisos de acceso a la camara del dispositivo
            photo: '', //url temporal de la foto (la interna)
            showCamera: true,
        }

        this.cameraMethods = '' //referenciar a los metodos internos del componente camera. es una variable vacía

    }


    componentDidMount(){
        //que pida permiso para usar la camara del dispositivo
        Camera.requestCameraPermissionsAsync() //metodo asincronico que ya viene con el componente camera
            .then( () => {
                this.setState({
                    permission: true
                })
            }) 
            .catch(e => console.log(e))
    }

    render(){
        return(
            <View>
            <Camera
            type={Camera.Constants.Type.front}
            ref= {cameraMethods => this.cameraMethods = cameraMethods}
            style= {styles.camera}/>
            <TouchableOpacity>
                <Text> Tomar foto</Text>
            </TouchableOpacity>
            </View>

        )
    }
    

}
    // const styles= StyleSheet.create({
    //      camera:{
    //          display: 'flex',
    //          height:50,
    //      }
    //  })

export default MyCamera;
