import React, { useState } from "react"; 
import { 
	View, 
	Text, 
	TextInput, 
	TouchableOpacity, 
	FlatList, 
	StyleSheet, 
} from "react-native"; 

// Import statements dari ang modules from react native

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const clearInput = () => setTask("");

  const addOrUpdateTask = () => {
    if (!task.trim()) {
      // Display an error or alert for an empty task
      return;
    }

    const updatedTasks = [...tasks];
    if (editIndex !== -1) {
      // Edit existing task
      updatedTasks[editIndex] = task;
    } else {
      // Add new task
      updatedTasks.push(task);
    }

    setTasks(updatedTasks);
    setEditIndex(-1);
    clearInput();
  };
  
  const handleEditTask = (index) => { 
	const taskToEdit = tasks[index]; 
	setTask(taskToEdit); 
	setEditIndex(index); 
}; 
  const deleteTask = (index) => {
    // Show confirmation dialog before deleting the task
    
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
    
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.task}>
      <Text style={styles.itemList}>{item}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => handleEditTask(index)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CRUD</Text>
      <Text style={styles.title}>ToDo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={addOrUpdateTask}>
        <Text style={styles.addButtonText}>
          {editIndex !== -1 ? "Update Task" : "Add Task"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

// Styles ninjas

const styles = StyleSheet.create({ 
	container: { 
		flex: 1, 
		padding: 40, 
		marginTop: 40, 
		background: { uri: './pics/your-image.jpg' },
		backgroundColor: ('red')
	}, 
	title: { 
		fontSize: 24, 
		fontWeight: "bold", 
		marginBottom: 20, 
	}, 
	heading: { 
		fontSize: 30, 
		fontWeight: "bold", 
		marginBottom: 7, 
		color: "white", 
	}, 
	input: { 
		borderWidth: 3, 
		borderColor: "#ccc", 
		padding: 10, 
		marginBottom: 10, 
		borderRadius: 10, 
		fontSize: 18, 
	}, 
	addButton: { 
		backgroundColor: "white", 
		padding: 10, 
		borderRadius: 5, 
		marginBottom: 10, 
	}, 
	addButtonText: { 
		color: "black", 
		fontWeight: "bold", 
		textAlign: "center", 
		fontSize: 18, 
	}, 
	task: { 
		flexDirection: "row", 
		justifyContent: "space-between", 
		alignItems: "center", 
		marginBottom: 15, 
		fontSize: 18, 
		backgroundColor: "white",
		borderRadius: 11,
	}, 
	itemList: { 
		marginLeft: 10,	
		fontSize: 19, 
		 
	}, 
	taskButtons: { 
		flexDirection: "row", 
		marginRight: 10,	
	}, 
	editButton: { 
		marginRight: 10, 
		color: "green", 
		fontWeight: "bold", 
		fontSize: 18, 
	}, 
	deleteButton: { 
		color: "red", 
		fontWeight: "bold", 
		fontSize: 18, 
	}, 
}); 

export default App;
