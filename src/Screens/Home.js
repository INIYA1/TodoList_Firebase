import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenStyle } from '../styles/HomeScreenStyle';

import { db } from '../../config'; // Import the Firebase database instance from your config.js file

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [addData, setAddData] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const todoRef = firebase.database().ref('todos'); // Use the database reference from your config.js file
    todoRef.on('value', (snapshot) => {
      const todosData = snapshot.val();
      if (todosData) {
        const todosArray = Object.entries(todosData).map(([id, data]) => ({
          id,
          ...data,
        }));
        setTodos(todosArray);
      }
    });
  }, []);

  const deleteTodo = (id) => {
    const todoRef = firebase.database().ref(`todos/${id}`); // Use the database reference from your config.js file
    todoRef
      .remove()
      .then(() => {
        alert('Deleted Successfully');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const addTodo = () => {
    if (addData && addData.length > 0) {
      const todoRef = firebase.database().ref('todos'); // Use the database reference from your config.js file
      const newTodoRef = todoRef.push();
      newTodoRef
        .set({
          heading: addData,
        })
        .then(() => {
          setAddData(''); // Clear the input field after adding a new todo
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={HomeScreenStyle.formContainer}>
        <TextInput
          style={HomeScreenStyle.input}
          placeholder="Add a New Todo"
          placeholderTextColor="black"
          onChangeText={(text) => setAddData(text)} // Update the setAddData function argument to 'text'
          value={addData}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={HomeScreenStyle.button} onPress={addTodo}>
          <Text style={HomeScreenStyle.buttonText}> ADD </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos}
        numColumns={1}
        renderItem={({ item }) => (
          <View style={HomeScreenStyle.container}>
            <FontAwesome
              name="trash-o"
              color="red"
              onPress={() => deleteTodo(item.id)}
              style={HomeScreenStyle.todoIcon}
            />
            <TouchableOpacity
              style={HomeScreenStyle.arrowbtn}
              onPress={() => navigation.navigate('Details', { item })}
            >
              <Text> {"=>"} </Text>
            </TouchableOpacity>
            <View style={HomeScreenStyle.innerContainer}>
              <Text style={HomeScreenStyle.itemHeading}>
                {item.heading[0].toUpperCase() + item.heading.slice(1)}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Home;
