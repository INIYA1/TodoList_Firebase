import { View, Text ,FlatList,StyleSheet,TextInput,TouchableOpacity,Keyboard} from 'react-native'
import React,{useState,useEffect} from 'react';
import {firebase} from '../../config';
import {FontAwesome} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const Home = () =>{

    const [todos,setTodos] = useState([]);
    const todoRef = firebase.firestore().collection('todos')
    const [ addData,setAddData] = useState('');
    const navigation = useNavigation ();

    // FETCH OR READ THE DATA FROM FIREBASE

    useEffect(()=>{
        todoRef
        .orderBy('createdAt','desc')
        .onSnapshot(
            querySnapshot =>{
                const todos =[]
                querySnapshot.forEach((doc)=>{
                    const {heading} = doc.data()
                    todos.push({
                        id:doc.id,
                        heading,
                    })
                })
                setTodos(todos)
            }
        )
    },[])
    // DELETE A TODO FROM FIRESTORE DB


    const deleteTodo = (todos)=>{
        todoRef
        .doc(todos.id)
        .delete()
        .then(()=>{
            alert('Deleted Successfully')
        })
        .catch(error=>{
            alert(error , 'error message')
        })
    }
// ADD TODO
const addTodo =()=>{
    // Check if we have a todo
    if (addData && addData.length>0){
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data ={
            heading : addData,
            createdAt : timestamp
        };
        todoRef
        .add(data)
        .then(()=>{
            setAddData('')
            // release Keyboard
            Keyboard.dismiss();   
        })
        .catch((error)=>{
            alert(error)
        })
    }
}
    // return(
    //     <View>
    //         <Text>hi</Text>
    //     </View>
    // )
}

export default Home