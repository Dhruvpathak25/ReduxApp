import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddIcon from 'react-native-vector-icons/MaterialIcons';

const Button = ({title, onPress, withBackIcon, addtodoIcon, nextbutton}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      {withBackIcon && (
        <Icon
          name="arrow-left-thick"
          size={25}
          color="white"
          style={styles.icon}
        />
      )}
      {nextbutton && (
        <Text
          style={{
            width: '85%',
            color: 'white',
            textAlign: 'center',
            fontFamily: 'DaysOne-Regular',
            fontSize: 25,
          }}>
          Next
        </Text>
      )}
      {addtodoIcon && <AddIcon name="add-task" size={30} color="white" />}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    backgroundColor: '#5c39a8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',

    fontFamily: 'DaysOne-Regular',
  },
  icon: {},
});

export default Button;
