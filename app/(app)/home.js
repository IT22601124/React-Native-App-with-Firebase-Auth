import { View, Text, Pressable } from 'react-native'
import React from 'react'
import {useAuth,user} from '../../context/authContext'

export default function home() {
  const {logout} =useAuth();
  const handleLogout = async()=>{
    await logout();
  }
  console.log('user data :',user);
  return (
    <View>
    <Pressable onPress={handleLogout}>
      <Text>Sign Out</Text>
    </Pressable>
      <Text>home</Text>
    </View>
  )
}