import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { useNavigation } from '@react-navigation/native';
import { DetailsScreenStyle } from '../styles/DetailsScreenStyle';

const Details = ({ route }) => {
  const todoRef = firebase.database().ref('todos');
  const [textHeading, setTextHeading] = useState(route.params.item.heading);
  const navigation = useNavigation();

  const updateTodo = () => {
    if (textHeading && textHeading.length > 0) {
      const todoId = route.params.item.id;
      todoRef.child(todoId).update({
        heading: textHeading,
      })
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        alert(error.message);
      });
    }
  };

  return (
    <View style={DetailsScreenStyle.container}>
      <TextInput
        style={DetailsScreenStyle.textField}
        onChangeText={setTextHeading}
        value={textHeading}
        placeholder="Update todo"
      />
      <TouchableOpacity style={DetailsScreenStyle.buttonUpdate} onPress={updateTodo}>
        <Text>UPDATE TODO</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;


