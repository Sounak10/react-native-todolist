import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [textInput, setTextInput] = useState("");
  const [goals, setGoals] = useState([]);
  const [modalIsVisible, setModalVisibility] = useState(false);

  function startAddGoalHandler() {
    setModalVisibility(true);
  }
  function endAddGoalHandler() {
    setModalVisibility(false);
  }

  function goalInputHandler(input) {
    setTextInput(input);
  }

  function addGoalHandler() {
    setGoals((curr) => [
      ...curr,
      { text: textInput, id: Math.random().toString() },
    ]);
    setTextInput("");
    setModalVisibility(false);
  }

  function deleteGoalHandler(id) {
    setGoals((curr) => {
      return curr.filter((goal) => goal.id != id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add new goal"
          color="#5e0acc"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          addGoalHandler={addGoalHandler}
          goalInputHandler={goalInputHandler}
          textInput={textInput}
          visible={modalIsVisible}
          endAddGoalHandler={endAddGoalHandler}
        />

        <View style={styles.goalsContainer}>
          <FlatList
            data={goals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  deleteGoalHandler={deleteGoalHandler}
                  itemData={itemData}
                  id={itemData.item.id}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 5,
  },
});
