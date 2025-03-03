import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screen/HomeScreen';
const Stack = createNativeStackNavigator();


const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{title:'To Do App', headerTitleAlign:'center'}}/>
    </Stack.Navigator>

  )
}

export default MainStack

const styles = StyleSheet.create({})