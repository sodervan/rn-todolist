import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Animated,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import AllTasks from "./AllTasks";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [datePicker, setDatePicker] = useState(false);
  const [selection, setSelection] = useState("");
  const slideAnim = useRef(new Animated.Value(100)).current;
  const [visible, setVisible] = useState(false);
  const allTasksRef = useRef(null);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);
  const [fontsLoaded] = useFonts({
    "CustomFont-Regular": require("../assets/Fonts/LibreBaskerville-Regular.ttf"),
    "CustomFont-Bold": require("../assets/Fonts/LibreBaskerville-Bold.ttf"),
    "Poppins-Regular": require("../assets/Fonts/Poppins-Regular.ttf"),
  });

  const handleToggleModal = (prop) => {
    setVisible(prop);
  };

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const handleSelection = (details) => {
    setSelection(details);
    if (details.length > 0) {
      setVisible(true);
    } else {
      handleClose();
    }
    console.log(selection);
  };
  const handleShowDatePicker = () => {
    setDatePicker(!datePicker);
  };

  const handleDeleteItem = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };
  const markCompletedHandler = () => {
    const updatedTasks = tasks.filter((_, index) => !selection.includes(index));
    setTasks(updatedTasks);
    setSelection([]);
    if (allTasksRef.current) {
      allTasksRef.current.clearSelection();
    }
    handleClose();
  };

  const addTask = () => {
    if (taskTitle && taskDate) {
      const newTask = { title: taskTitle, date: taskDate };
      setTasks([...tasks, newTask]);
      setTaskTitle("");
      setTaskDate("");
      setModalVisible(false);
      setSelection([]); // Reset selection when adding a new task
    }
  };

  return (
    <View style={styles.container}>
      {visible && (
        <TouchableOpacity
          onPress={markCompletedHandler}
          style={{
            width: "100%",
            position: "absolute",
            bottom: 20,
            alignItems: "center",
            marginLeft: 20,
            justifyContent: "center",
          }}
        >
          <Animated.View
            style={{
              width: "80%",
              maxWidth: 300,
              backgroundColor: "white",
              borderRadius: 20,
              paddingVertical: 20,
              alignItems: "center",
              transform: [{ translateY: slideAnim }],
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Mark as Completed</Text>
          </Animated.View>
        </TouchableOpacity>
      )}

      <View style={styles.searchContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <View style={{ marginLeft: 3 }}>
            <Ionicons name="search" size={30} color="white" />
          </View>
          <View>
            <TextInput
              placeholder="Try to find tasks"
              placeholderTextColor="#ccc"
              style={{color: "white"}}
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
        <AllTasks
          ref={allTasksRef}
          tasks={tasks}
          onDeleteItem={handleDeleteItem}
          onSelectionChange={handleSelection}
        />
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
