import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  secureTextEntry,
  autoCapitalize,
} from 'react-native';

const CustomInput = ({
  title,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  error,
  autoCapitalize,
  keyboardType,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={'#ccc'}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'DaysOne-Regular',
  },
  input: {
    height: 50,
    backgroundColor: '#F2F3F5',
    padding: 10,
    fontSize: 20,
    color: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: 350,
    borderRadius: 10,
    borderColor: '#f2f3f5',
    fontFamily: 'DaysOne-Regular',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'DaysOne-Regular',
  },
});

export default CustomInput;
