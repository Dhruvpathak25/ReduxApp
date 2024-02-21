import AsyncStorage from '@react-native-async-storage/async-storage';
import {formatDistance} from 'date-fns';
import ImagePicker from 'react-native-image-crop-picker';

export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const TOGGLE_CHECKBOX = 'TOGGLE_CHECKBOX';
export const LOAD_TODOS = 'LOAD_TODOS';
export const UPDATE_TASK_DESCRIPTION = 'UPDATE_TASK_DESCRIPTION';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';

export const addTodo = todo => {
  return async (dispatch, getState) => {
    try {
      const currentState = getState();
      const currentUser = currentState.auth.currentUser;

      const id = new Date().getTime().toString();
      const createdAt = new Date();
      const newTodo = {id, ...todo, email: currentUser.email, createdAt};

      const updatedTodos = [...currentState.todo.todos, newTodo];

      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));

      dispatch({type: ADD_TODO, payload: newTodo});
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
};

export const updateTodo = (email, id, text) => {
  return async (dispatch, getState) => {
    try {
      const currentState = getState();
      const updatedTodos = currentState.todo.todos.map(todo =>
        todo.id === id && todo.email === email
          ? {...todo, text, updatedAt: Date.now()}
          : todo,
      );

      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));

      dispatch({type: UPDATE_TODO, payload: {id, text}});
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
};

export const deleteTodo = (email, id) => {
  return async (dispatch, getState) => {
    try {
      const currentState = getState();

      const updatedTodos = currentState.todo.todos.filter(
        todo => !(todo.id === id && todo.email === email),
      );

      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));

      dispatch({type: DELETE_TODO, payload: id});
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };
};

export const toggleCheckbox = (email, id) => {
  return async (dispatch, getState) => {
    try {
      const currentState = getState();

      const updatedTodos = currentState.todo.todos.map(todo =>
        todo.id === id && todo.email === email
          ? {...todo, checked: !todo.checked}
          : todo,
      );

      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));

      dispatch({type: TOGGLE_CHECKBOX, payload: id});
    } catch (error) {
      console.error('Error toggling checkbox:', error);
    }
  };
};

export const loadTodos = () => {
  return async dispatch => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');

      if (storedTodos !== null) {
        const parsedTodos = JSON.parse(storedTodos);
        dispatch({type: LOAD_TODOS, payload: parsedTodos});
      }
    } catch (error) {
      console.error('Error loading todos from storage:', error);
    }
  };
};
export const updateTaskDescription = (email, id, description, imageUrl) => {
  return async (dispatch, getState) => {
    try {
      const currentState = getState();

      const updatedTodos = currentState.todo.todos.map(todo =>
        todo.id === id && todo.email === email
          ? {...todo, description, imageUrl} // Include imageUrl in the update
          : todo,
      );

      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));

      dispatch({
        type: UPDATE_TASK_DESCRIPTION,
        payload: {id, description, imageUrl},
      });

      dispatch({type: 'TASK_UPDATE_SUCCESS'});
    } catch (error) {
      console.error('Error updating task description:', error);
    }
  };
};

export const uploadImage = (email, id, imageUrl) => {
  return async (dispatch, getState) => {
    try {
      const currentState = getState();

      const updatedTodos = currentState.todo.todos.map(todo =>
        todo.id === id && todo.email === email ? {...todo, imageUrl} : todo,
      );

      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));

      dispatch({type: UPLOAD_IMAGE, payload: {id, email, imageUrl}});

      dispatch({type: 'IMAGE_UPLOAD_SUCCESS'});
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
};
