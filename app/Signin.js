import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { Octicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import{useAuth} from '../context/authContext'



export default function Signin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {login} =useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign In', "Pleacse fill the all field!");
      return;
    }

    setLoading(true);

    const response=await login(emailRef.current,passwordRef.current);
    setLoading(false);
    console.log('sign in proccess: ',response);
    if(!response.success){
      Alert.alert('Sign In', response.msg);
    }

  }


  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 ">
        <View className="items-center">
          <Image style={{ height: hp(30) }} resizeMode='contain' source={require('../assets/images/logo.png')} />
        </View>
        <View className='gap-10'>

          <View className="gap-10">
            <Text style={{ fontSize: hp(4) }} className='font-bold justify-center tracking-wider text-center text-natural-800' >SignIn</Text>
            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl" >
              <Octicons name='mail' size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={value => emailRef.current = value}
                style={{ fontSize: hp(2) }}
                className="flex-1  font-semibold text-neutral-700"
                placeholder='Email Address'
                placeholderTextColor={'gray'}
              />
            </View>
            <View className='gap-3'>
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
              <Text style={{ fontSize: hp(1.8) }} className='font-semibold text-right text-neutral-500'>Forgot Passwrod?</Text>

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
                      Sing In
                    </Text>
                  </TouchableOpacity>

                )
              }

            </View>
            


            <View className="flex-row justify-center">
              <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Don't have an account? </Text>
              <Pressable onPress={() => router.push('Signup')}>
                <Text style={{ fontSize: hp(1.8) }} className="font-bold text-black">Sign Up</Text>
              </Pressable>

            </View>
          </View>
        </View>


      </View>

    </CustomKeyboardView>
    
  );
}