import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  TOGGLE_CHECKBOX,
  LOAD_TODOS,
  UPDATE_TASK_DESCRIPTION,
  UPLOAD_IMAGE,
} from '../actions/todoActions';

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? {...todo, text: action.payload.text}
            : todo,
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case TOGGLE_CHECKBOX:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? {...todo, checked: !todo.checked} : todo,
        ),
      };
    case LOAD_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case 'UPDATE_TASK_DESCRIPTION':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? {
                ...todo,
                description: action.payload.description,
                imageUrl: action.payload.imageUrl, // Include imageUrl in the update
              }
            : todo,
        ),
      };
    case UPLOAD_IMAGE: {
      const {id, email, imageUrl} = action.payload;
      const updatedTodos = state.todos.map(todo =>
        todo.id === id && todo.email === email ? {...todo, imageUrl} : todo,
      );
      return {...state, todos: updatedTodos};
    }

    default:
      return state;
  }
};

export default todoReducer;
