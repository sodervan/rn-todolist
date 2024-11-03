import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const RadioButton = ({ label, selected, onPress }) => (
  <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
    <View style={styles.radioCircle}>
      {selected && (
        <Ionicons name="radio-button-on" size={20} color="#4A90E2" />
      )}
    </View>
  </TouchableOpacity>
);

const AllTasks = ({ tasks, onDeleteItem }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Tasks</Text>
      {tasks && tasks.length > 0 ? (
        <FlatList
          data={tasks}
          renderItem={({ item, index }) => (
            <View style={styles.listItem}>
              <View style={{ flexDirection: "row" }}>
                <RadioButton />
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.dateContainer}>{item.date}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity onPress={() => onDeleteItem(index)}>
                  <Ionicons name="trash" size={25} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="create-outline" size={25} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.noTasksContainer}>
          <Text style={styles.noTasksText}>No tasks yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    marginBottom: 50,
    // height: "auto",
    // backgroundColor: "white"
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  listItem: {
    width: "100%",
    backgroundColor: "#202020",
    padding: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#898989",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  titleContainer: {
    marginLeft: 10,
  },
  dateContainer: {
    color: "#919191",
  },
  title: {
    color: "white",
    fontSize: 18,
    marginBottom: 6,
  },
  noTasksContainer: {
    alignItems: "center",
    // justifyContent: "center",
    marginTop: 50,
    height: "100%",
  },
  noTasksText: {
    color: "#ccc",
    fontSize: 16,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default AllTasks;
