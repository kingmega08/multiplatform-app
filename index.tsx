
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function HomeScreen() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Study Mathematics', done: false },
    { id: 2, title: 'Complete Web Assignment', done: true },
    { id: 3, title: 'Read Computer Science', done: false },
  ]);

  // Add a task
  const addTask = () => {
    if (task.trim() === '') return;

    setTasks([
      ...tasks,
      { id: Date.now(), title: task, done: false },
    ]);

    setTask('');
  };

  // Complete a task
  const completeTask = (id: number) => {
    setTasks(
      tasks.map(item =>
        item.id === id
          ? { ...item, done: !item.done }
          : item
      )
    );
  };

  // Delete a task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(item => item.id !== id));
  };

  const completed = tasks.filter(item => item.done).length;
  const pending = tasks.length - completed;

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.welcome}>WELCOME TO STUDYMATE</Text>
        <Text style={styles.name}>Hello, student!</Text>
        <Text style={styles.subtitle}>Let's study smarter today.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>My Progress</Text>
        <Text style={styles.number}>
          {tasks.length === 0
            ? 0
            : Math.round((completed / tasks.length) * 100)}%
        </Text>

        <Text style={styles.info}>
          {completed} Completed | {pending} Pending
        </Text>
      </View>

      <View style={styles.statistics}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{tasks.length}</Text>
          <Text>Total Tasks</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{completed}</Text>
          <Text>Completed</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{pending}</Text>
          <Text>Pending</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Add New Task</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your study task"
          value={task}
          onChangeText={setTask}
        />

        <Pressable style={styles.button} onPress={addTask}>
          <Text style={styles.buttonText}>+ Add Task</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>My Study Tasks</Text>

        {tasks.map(item => (
          <View style={styles.taskBox} key={item.id}>

            <Pressable
              style={styles.taskInfo}
              onPress={() => completeTask(item.id)}
            >
              <Text style={styles.check}>
                {item.done ? '☑' : '☐'}
              </Text>

              <Text
                style={[
                  styles.taskText,
                  item.done && styles.finished,
                ]}
              >
                {item.title}
              </Text>
            </Pressable>

            <Pressable onPress={() => deleteTask(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </Pressable>

          </View>
        ))}

        {tasks.length === 0 && (
          <Text style={styles.info}>No tasks yet. Add one above!</Text>
        )}
      </View>

      <Text style={styles.footer}>StudyMate © 2026</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },

  header: {
    backgroundColor: '#172554',
    padding: 30,
    paddingTop: 65,
    paddingBottom: 50,
  },

  welcome: {
    color: '#93C5FD',
    fontSize: 13,
  },

  name: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },

  subtitle: {
    color: 'white',
    marginTop: 8,
  },

  card: {
    backgroundColor: 'white',
    margin: 18,
    padding: 20,
    borderRadius: 15,
  },

  heading: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#172554',
    marginBottom: 15,
  },

  number: {
    fontSize: 35,
    color: '#2563EB',
    fontWeight: 'bold',
  },

  info: {
    color: '#64748B',
    marginTop: 8,
  },

  statistics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 12,
  },

  statBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },

  statNumber: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  section: {
    margin: 18,
  },

  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  taskBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  taskInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  check: {
    fontSize: 22,
    marginRight: 10,
    color: '#2563EB',
  },

  taskText: {
    flex: 1,
    color: '#172554',
  },

  finished: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },

  delete: {
    color: 'red',
    marginLeft: 8,
  },

  footer: {
    textAlign: 'center',
    color: '#64748B',
    margin: 25,
  },
});
