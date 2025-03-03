import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: any;
}

const initialState: TodoState = {
    todos:[],
    loading: false,
    error: null,
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async()=>{
    const response = await axios.get(`${BASE_URL}todos?_limit=10`);
    return response.data;
})

export const addTodo = createAsyncThunk('todos/addTodo', async(title: string)=>{
    const response = await axios.post(`${BASE_URL}todos`,{
        title,
        completed: false,
    });
    return response.data;
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async(id: number)=>{
    const response = await axios.put(`${BASE_URL}todos/${id}`,{
        completed: true,
    });
    return response.data;
})

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async(id: number)=>{
    await axios.delete(`${BASE_URL}todos/${id}`);
    return id;
})

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchTodos.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchTodos.fulfilled, (state, action)=>{
            state.loading = false;
            state.todos = action.payload;
        })
        .addCase(fetchTodos.rejected, (state)=>{
            state.loading = false;
            state.error = 'Failed to load Tasks';
        })
        .addCase(addTodo.fulfilled, (state, action)=>{
            const newTask ={
                ...action.payload,
                id: state.todos.length+1,
            };
            state.todos.push(newTask);
        })
        .addCase(updateTodo.fulfilled, (state, action)=>{
            const index = state.todos.findIndex((todo)=> todo.id == action.payload.id);
            if(index !== -1) state.todos[index].completed = true;
        })
        .addCase(deleteTodo.fulfilled, (state, action)=>{
            state.todos = state.todos.filter((todo)=> todo.id !== action.payload)
        })
    }
})

export default todoSlice.reducer;