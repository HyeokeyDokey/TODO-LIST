import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const App = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]); // todos 배열설정
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState('');
  const [starredIndexes, setStarredIndexes] = useState([]);

  const addTodo = () => {     // 할 일추가
    if (todo.trim() !== '') { // 공백 아닐시
      setTodos([...todos, { text: todo, completed: false }]);
      setTodo('');
    }
  };

  const toggleTodo = (index) => { //할 일의 완료 상태 전환, checked
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const removeTodo = (index) => { // 할 일 삭제
    const newTodos = [...todos];
    newTodos.splice(index, 1);    // splice index값 요소 1개 제거
    setTodos(newTodos);           // 배열 길이감소
  };

  const startEdit = (index, text) => { // 할 일 수정
    setEditIndex(index);               
    setEditText(text);                 
  };

  const cancelEdit = () => {           // 할 일 삭제 
    setEditIndex(-1);
    setEditText('');
  };

  const updateTodo = (index) => {      // 할 일 수정 업데이트
    const newTodos = [...todos];
    newTodos[index].text = editText;   // newTodo로 업데이트
    setTodos(newTodos);
    setEditIndex(-1);
    setEditText('');
  };

  const toggleStar = (index) => {     // 할 일 bold화 
    const newStarredIndexes = [...starredIndexes];
    const existingIndex = newStarredIndexes.indexOf(index);
    if (existingIndex !== -1) { // index 존재하지않으면 -1반환, 
      newStarredIndexes.splice(existingIndex, 1); // 배열에서 삭제 -> 중요도 해제(bold 해제)
    } else {
      newStarredIndexes.push(index); // 아닐경우 bold화
    }
    setStarredIndexes(newStarredIndexes);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To Do List✔️</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={todo}
          onChangeText={(text) => setTodo(text)}
          placeholder="add a new task"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}> 
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.todosContainer}>
        {todos.map((item, index) => (
          <View key={index} style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleTodo(index)}> 
              <View style={styles.checkbox}>
                {item.completed && <View style={styles.checked} />}
              </View>
            </TouchableOpacity>
            {editIndex === index ? (
              <>
                <TextInput
                  style={styles.editInput} 
                  value={editText}
                  onChangeText={(text) => setEditText(text)} // todo 수정
                />
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => updateTodo(index)} // todo 업뎃
                >
                  <Text style={styles.updateButtonText}>Edit</Text>
                </TouchableOpacity>                      
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={cancelEdit}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text
                  style={[
                    styles.todoText,
                    item.completed && styles.completedText,
                    starredIndexes.includes(index) && styles.starredText
                  ]}
                >
                  {item.text}
                </Text>
                <TouchableOpacity
                  style={[styles.starButton, starredIndexes.includes(index) && styles.starButtonActive]} 
                  onPress={() => toggleStar(index)} 
                >
                                  <Image
                    source={require('./assets/star.png')}
                    style={styles.buttonImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => startEdit(index, item.text)}
                >
                  <Image
                    source={require('./assets/edit.png')}
                    style={styles.buttonImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeTodo(index)}>
                  <Image
                    source={require('./assets/bin.png')}
                    style={styles.buttonImage}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { // 컨테이너 설정
    flex: 1,
    backgroundColor: '#333333',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  heading: { // head title
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  inputContainer: { // add input텍스트 박스
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: { // add input텍스트 박스
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: { // add버튼 설정
    backgroundColor: 'black',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  addButtonText: { // add버튼 텍스트 설정
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todosContainer: { // add박스 list박스 margintop간격
    marginTop: 10,
  },
  todoItem: { // todo list 박스
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  checkbox: { // 체크박스 설정
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: { // 체크박스(체크ON) 설정
    width: 14,
    height: 14,
    borderRadius: 2,
    backgroundColor: 'black',
  },
  todoText: { // todo텍스트 설정
    flex: 1,
    fontSize: 16,
  },
  completedText: { // 완료(체크)시 취소선, 텍스트 색변경
    color: 'gray', 
    textDecorationLine: 'line-through',
  },
  editInput: { // 수정 할 때 Input 설정값
    flex: 1,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
    fontSize: 16,
    marginRight: 4,
  },
  editButton: { //이미지(수정) 버튼
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center', 
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  updateButton: { // 수정 버튼
    backgroundColor: 'black',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginRight: 4, // '수정', '취소' 버튼사이에 마진간격
  },
  updateButtonText: { // 업데이트 텍스트
    color: 'white',
    fontSize: 14,
  },
  cancelButton: { // 취소 버튼
    backgroundColor: 'black',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  cancelButtonText: { // 취소 텍스트
    color: 'white',
    fontSize: 14,
  },
  buttonImage: {
    width: 20,
    height: 20,
  },
  starButton: { // star button 설정
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  starredText: { // star버튼 활성화시 bold
    fontWeight: 'bold'
  },
});

export default App;
