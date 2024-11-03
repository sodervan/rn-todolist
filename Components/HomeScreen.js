import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import AllTasks from "./AllTasks";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const HomeScreen = () => {
  const [fontsLoaded] = useFonts({
    "CustomFont-Regular": require("../assets/Fonts/LibreBaskerville-Regular.ttf"),
    "CustomFont-Bold": require("../assets/Fonts/LibreBaskerville-Bold.ttf"),
    "Poppins-Regular": require("../assets/Fonts/Poppins-Regular.ttf"),
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [datePicker, setDatePicker] = useState(false);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleShowDatePicker = () => {
    setDatePicker(!datePicker);
  };

  const handleDeleteItem = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };
  const addTask = () => {
    if (taskTitle && taskDate) {
      const newTask = { title: taskTitle, date: taskDate };
      setTasks([...tasks, newTask]);
      setTaskTitle("");
      setTaskDate("");
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/*SEARCH CONTAINER*/}

      <View style={styles.searchContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <View style={{ marginLeft: 3 }}>
            <Ionicons name="search" size={30} color="white" />
          </View>
          <View>
            <TextInput
              placeholder="Try to find tasks"
              placeholderTextColor="#ccc"
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "#995FF6",
              paddingVertical: 10,
              paddingHorizontal: 30,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "white" }}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*ADD AND CATEGORIES*/}

      <View style={styles.optionsContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.addContainer, styles.optionItem]}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={23} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.allTasks, styles.optionItem]}>
            <Text style={styles.taskText}>All Tasks</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.nonActiveCategory, styles.optionItem]}
          >
            <Text style={styles.nonActiveText}>Work</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.nonActiveCategory, styles.optionItem]}
          >
            <Text style={styles.nonActiveText}>Personal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.nonActiveCategory, styles.optionItem]}
          >
            <Text style={styles.nonActiveText}>Code</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.nonActiveCategory, styles.optionItem]}
          >
            <Text style={styles.nonActiveText}>School</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/*MODAL*/}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Task Title"
              value={taskTitle}
              onChangeText={setTaskTitle}
            />
            <View style={styles.enterDate}>
              <TextInput
                style={[styles.input, styles.dateInput]}
                placeholder="Task Date"
                value={taskDate}
                onChangeText={setTaskDate}
              />
              <TouchableOpacity
                onPress={handleShowDatePicker}
                style={styles.pickerBox}
              >
                <Ionicons name="calendar-outline" size={20} color="#4A90E2" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={addTask} style={styles.addTask}>
                <Text style={styles.addText}>Add Task</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeModal}
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Pass tasks as prop to AllTasks */}
      <View>
        <AllTasks tasks={tasks} onDeleteItem={handleDeleteItem}/>
      </View>
      {datePicker ? (
        <View>
          <RNDateTimePicker
            value={new Date()}
            minimumDate={new Date(2024, 0, 1)}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || taskDate;
              setDatePicker(false);
              setTaskDate(
                currentDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E0E",
    padding: 20,
  },
  optionItem: {
    marginRight: 7,
  },
  allTasks: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#FECB78",
  },
  addContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "rgba(124,124,124,0.58)",
    borderWidth: 1,
    paddingVertical: 4,
    width: 50,
    borderRadius: 20,
  },
  optionsContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 7,
    overflow: "scroll",
  },
  taskText: {
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  dateInput: {
    flex: 1,
    marginRight: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  addTask: {
    backgroundColor: "#000",
    borderRadius: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    marginRight: 5,
  },
  closeModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 5,
  },
  addText: {
    color: "white",
  },
  enterDate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerBox: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "rgba(124,124,124,0.58)",
    borderWidth: 1,
    marginBottom: 20,
    padding: 8,
    borderRadius: 30,
  },
  nonActiveCategory: {
    borderColor: "rgba(124,124,124,0.58)",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  nonActiveText: {
    color: "rgba(124,124,124,0.58)",
  },
});

export default HomeScreen;
