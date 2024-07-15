import { View, Text, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import React from 'react';

const isIOS = Platform.OS === 'ios';

export default function CustomKeyboardView({ children }) {
  return (
    <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
