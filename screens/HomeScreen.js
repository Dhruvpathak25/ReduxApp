import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {CheckBox, Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Delete from 'react-native-vector-icons/Entypo';
import Update from 'react-native-vector-icons/Entypo';
import Button from '../components/Button';
import TaskModal from '../components/TaskModal';
import {logout} from '../redux/actions/authActions';
import {
  addTodo,
  updateTodo,
  deleteTodo,
  loadTodos,
  toggleCheckbox,
  updateTaskDescription,
} from '../redux/actions/todoActions';
import {format} from 'date-fns';

const HomeScreen = () => {
  const navigation = useNavigation();
  const currentUser = useSelector(state => state.auth.currentUser);
  const todos = useSelector(state => state.todo.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');
  const [updatedText, setUpdatedText] = useState('');
  const [focusedTodoId, setFocusedTodoId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const createdAt = Date.now();
      const todo = {text: newTodo, email: currentUser?.email, createdAt};
      dispatch(addTodo(todo));
      setNewTodo('');
    }
  };

  const handleUpdateTodo = (id, text) => {
    setUpdatedText(text);
    setFocusedTodoId(id);
  };

  const handleUpdateTextChange = text => {
    setUpdatedText(text);
  };

  const handleUpdateTodoConfirm = id => {
    if (updatedText.trim() !== '') {
      dispatch(updateTodo(currentUser.email, id, updatedText));
      setFocusedTodoId(null);
    }
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(currentUser.email, id));
  };

  const handleCheckboxToggle = id => {
    dispatch(toggleCheckbox(currentUser?.email, id));
  };

  const openModal = task => {
    if (!task.updatedAt) {
      const updatedTask = {...task, updatedAt: Date.now()};
      setSelectedTask(updatedTask);
    } else {
      setSelectedTask(task);
    }
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };

  const handleUpdateDescription = () => {
    if (selectedTask?.id) {
      dispatch(
        updateTaskDescription(
          currentUser?.email,
          selectedTask.id,
          updatedText,
          () => {
            setUpdateSuccess(true);
          },
        ),
      );
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (updateSuccess) {
        closeModal();
        setUpdateSuccess(false);
      }
    });

    return unsubscribe;
  }, [navigation, updateSuccess]);

  const showMenu = () => {
    Alert.alert('Menu', null, [
      {
        text: 'Profile',
        onPress: () => handleProfilePress(),
      },
      {
        text: 'Logout',
        onPress: () => handleLogout(),
      },
    ]);
  };

  const handleProfilePress = () => {
    Alert.alert('Profile', `Hello ${currentUser.fullName}!`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={showMenu}>
          <View style={styles.headerContent}>
            <Text style={styles.headerText}>{currentUser?.fullName}</Text>
            <Image
              source={require('../assets/images/user.png')}
              style={styles.userImage}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.newTaskContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo....."
          placeholderTextColor={'#9B9B9B'}
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <Button addtodoIcon onPress={handleAddTodo} />
      </View>
      <ScrollView>
        <View style={styles.content}>
          {todos
            .filter(todo => currentUser && todo.email === currentUser.email)
            .map(todo => (
              <TouchableOpacity
                key={todo.id}
                style={styles.todoItem}
                onPress={() => openModal(todo)}>
                <View style={styles.rowContainer}>
                  <CheckBox
                    checked={todo.checked}
                    onPress={() => handleCheckboxToggle(todo.id)}
                    size={32}
                    checkedColor="purple"
                    uncheckedColor="purple"
                  />
                  {focusedTodoId === todo.id ? (
                    <TextInput
                      style={styles.todoText}
                      value={updatedText}
                      onChangeText={handleUpdateTextChange}
                      onBlur={() => handleUpdateTodoConfirm(todo.id)}
                      autoFocus={true}
                    />
                  ) : (
                    <Text style={styles.todoText}>{todo.text}</Text>
                  )}
                  <Update
                    name="pencil"
                    size={25}
                    color="green"
                    style={styles.actionIcon}
                    onPress={() => handleUpdateTodo(todo.id, todo.text)}
                  />
                  <Delete
                    name="trash"
                    size={25}
                    color="red"
                    style={styles.actionIcon}
                    onPress={() => handleDeleteTodo(todo.id)}
                  />
                </View>
                <View>
                  <Text style={styles.createdAtText}>
                    {`Created at ${format(
                      new Date(todo.createdAt),
                      'hh:mm a  dd-MM-yyyy',
                    )}`}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>

      <TaskModal
        visible={modalVisible}
        closeModal={closeModal}
        task={selectedTask || {}}
        updateDescription={handleUpdateDescription}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AAC3FF',
  },
  header: {
    padding: 20,
    alignItems: 'flex-end',
    marginTop: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5C4FFD',
    marginTop: 10,
    fontFamily: 'DaysOne-Regular',
    shadowColor: '#fff',
    shadowOpacity: 20,
  },
  userImage: {
    width: 50,
    height: 50,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
  todoItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 8,
    marginVertical: 5,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#674188',
    width: '90%',
    borderRadius: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  todoText: {
    marginLeft: -6,
    flex: 1,
    fontSize: 20,
    fontFamily: 'DaysOne-Regular',
  },
  actionIcon: {
    paddingRight: 10,
  },
  input: {
    height: 70,
    borderColor: '#674188',
    borderWidth: 2,
    paddingHorizontal: 20,
    marginTop: 10,
    flexGrow: 1,
    marginRight: 15,
    marginLeft: '2%',
    backgroundColor: '#FFFBF5',
    borderRadius: 20,
    fontSize: 23,
    fontFamily: 'DaysOne-Regular',
  },
  newTaskContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  createdAtText: {
    fontSize: 14,
    color: '#9B9B9B',
    marginBottom: 10,
    fontFamily: 'DaysOne-Regular',
    marginLeft: 20,
  },
});

export default HomeScreen;
