import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { Feather, Octicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';



export default function Signup() {
  const router = useRouter();
  const {register} =useAuth();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  const profiledRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current || !userNameRef.current || ! profiledRef.current) {
      Alert.alert('Sign Up', "Pleacse fill the all field!");
      return;
    }
    setLoading(true);

    let response=await register(emailRef.current,passwordRef.current,userNameRef.current,profiledRef.current );
    setLoading(false);

    console.log('got result: ',response);
    if(!response.success){
      Alert.alert('Sign up ',response.msg);
    }




  }


  return (
    <CustomKeyboardView >
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }} className="flex-1 ">
        <View className="items-center">
          <Image style={{ height: hp(27) }} resizeMode='contain' source={require('../assets/images/logo.png')} />
        </View>
        <View className='gap-10'>

          <View className="gap-10">
            <Text style={{ fontSize: hp(4) }} className='font-bold justify-center tracking-wider text-center text-natural-800' >Sign Up</Text>
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl" >
              <Feather name='user' size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value => userNameRef.current = value}
                style={{ fontSize: hp(2) }}
                className="flex-1  font-semibold text-neutral-700"
                placeholder='username'
                placeholderTextColor={'gray'}
              />
            </View>
            
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl" >
              <Octicons name='mail' size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value => emailRef.current = value}
                style={{ fontSize: hp(2) }}
                className="flex-1  font-semibold text-neutral-700"
                placeholder='Email address'
                placeholderTextColor={'gray'}
              />
            </View>



            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl" >
              <Octicons name='lock' size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value => passwordRef.current = value}
                style={{ fontSize: hp(2) }}
                className="flex-1  font-semibold text-neutral-700"
                placeholder='Password'
                secureTextEntry
                placeholderTextColor={'gray'}
              />
            </View>


            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl" >
              <Feather name='image' size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value => profiledRef.current = value}
                style={{ fontSize: hp(2) }}
                className="flex-1  font-semibold text-neutral-700"
                placeholder='Profile url'
                placeholderTextColor={'gray'}
              />
            </View>


            <View>
              {
                loading ? (
                  <View className="flex-row justify-center">
                    <Loading size={wp(20)} />
                  </View>

                ) : (

                  <TouchableOpacity onPress={handleLogin} style={{ height: hp(6.5) }} className="bg-black rounded-xl justify-center items-center">
                    <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider ">
                      Sing Up
                    </Text>
                  </TouchableOpacity>

                )
              }

            </View>



            <View className="flex-row justify-center">
              <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Already have an account? </Text>
              <Pressable onPress={() => router.push('Signin')}>
                <Text style={{ fontSize: hp(1.8) }} className="font-bold text-black">Sign In</Text>
              </Pressable>

            </View>
          </View>
        </View>


      </View>

    </CustomKeyboardView>

  );
}