import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../Redux/store';
import {addTodo, fetchTodos, updateTodo, deleteTodo, Todo} from '../Redux/todoSlice';
import Icon from 'react-native-vector-icons/AntDesign';

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState<string>('');
  const {todos, loading} = useSelector((state: RootState) => state.todos);
  const [task, setTask] = useState<string>('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTodo(task));
      setTask('');
    }
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );

  const renderItem = ({item}:{item:Todo}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          borderBottomWidth: 1,
            alignItems: 'center',
        }}>
        <View style={{width: '80%',}}>
          <Text
            style={{
              textDecorationLine: item.completed ? 'line-through' : 'none',
              color: 'black',
            }}>
            {item.title}
          </Text>
        </View>
        <View style={{flexDirection: 'row', width: '20%', justifyContent:'space-between', paddingHorizontal:10}}>
          <TouchableOpacity onPress={() => dispatch(updateTodo(item.id))}>
            <Icon name="check" size={20} color="green" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
            <Icon name="close" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  if(loading){
    return(
      <ActivityIndicator size="large" color="blue"  style={{justifyContent:'center', alignItems:'center', flex:1, backgroundColor:'white'}}/>
    )
  }
  return (
    <View style={{flex: 1, padding: 20, backgroundColor: 'white'}}>
      <TextInput
        placeholder="Search tasks..."
        value={search}
        onChangeText={setSearch}
        style={{borderWidth: 1, padding: 8, marginBottom: 10, color: 'black', borderRadius:8}}
        placeholderTextColor={'black'}
      />

      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:10}}>
        <TextInput
        placeholder="Add tasks..."
        value={task}
        onChangeText={setTask}
        style={{borderWidth: 1, padding: 8, marginBottom: 10, color: 'black', width:'80%', borderRadius: 8}}
        placeholderTextColor={'black'}/>
        <TouchableOpacity onPress={handleAddTask} style={{backgroundColor:'black', paddingHorizontal:4, paddingVertical:8, alignSelf:'flex-start', borderRadius:8}} activeOpacity={0.7}>
        <Text style={{color:'white', fontWeight:'800'}}>Add Task</Text>
      </TouchableOpacity>
      </View>

      

      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id.toString()}
        renderItem={item => renderItem(item)}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
});
