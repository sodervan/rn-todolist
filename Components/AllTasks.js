import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const RadioButton = ({ selected, onPress }) => (
  <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
    <View
      style={
        selected
          ? {
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
            }
          : styles.radioCircle
      }
    >
      {selected && (
        <Ionicons name="radio-button-on-outline" size={20} color="orange" />
      )}
    </View>
  </TouchableOpacity>
);

const AllTasks = forwardRef(
  ({ tasks, onDeleteItem, onSelectionChange }, ref) => {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [completeModal, setCompleteModal] = useState(false);
    const [indexToDelete, setIndexToDelete] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);

    const clearSelection = () => {
      setSelectedItems([]);
    };
    useImperativeHandle(ref, () => ({
      clearSelection,
    }));
    const deleteItem = () => {
      onDeleteItem(indexToDelete);
      selectedItems.filter((item) => item !== indexToDelete);
    };
    const handleSelectedItems = (prop) => {
      setSelectedItems((prevItems) => {
        const updatedItems = prevItems.includes(prop)
          ? prevItems.filter((item) => item !== prop)
          : [...prevItems, prop];

        onSelectionChange(updatedItems);

        return updatedItems;
      });
    };
    return (
      <>
        {/*CONFIRM MODAL*/}
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalIsVisible}
            onRequestClose={() => setModalIsVisible(false)}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <View
                style={{
                  width: "90%",
                  maxWidth: 400,
                  padding: 20,
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: 20,
                }}
              >
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    Are you sure you want to delete this list?
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "black",
                      borderRadius: 20,
                      paddingVertical: 20,
                      flex: 1,
                      alignItems: "center",
                    }}
                    onPress={() => {
                      deleteItem();
                      setModalIsVisible(false);
                    }}
                  >
                    <Text style={{ color: "white" }}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      borderColor: "#ccc",
                      borderWidth: 1,
                      borderRadius: 20,
                      paddingVertical: 20,
                      flex: 1,
                      alignItems: "center",
                    }}
                    onPress={() => {
                      setModalIsVisible(false);
                      setIndexToDelete("");
                    }}
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/*MAIN CONTENT*/}
        </View>
        <View style={styles.container}>
          <Text style={styles.header}>All Tasks</Text>
          {tasks && tasks.length > 0 ? (
            <FlatList
              data={tasks}
              renderItem={({ item, index }) => (
                <View style={styles.listItem}>
                  <View style={{ flexDirection: "row" }}>
                    <RadioButton
                      onPress={() => {
                        handleSelectedItems(index);
                        setCompleteModal(true);
                      }}
                      selected={selectedItems.includes(index)}
                    />
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.dateContainer}>{item.date}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <TouchableOpacity
                      onPress={() => {
                        setIndexToDelete(index);
                        setModalIsVisible(true);
                      }}
                    >
                      <Ionicons name="trash" size={25} color="white" />
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
      </>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    marginBottom: 50,
    height: "auto",
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
