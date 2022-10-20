import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  TextLayoutEventData,
  NativeSyntheticEvent,
  TextLayoutLine,
} from "react-native";

import { Text, View } from "../components/Themed";

export default function DemoScreen() {
  const [lines, setLines] = useState<TextLayoutLine[]>();
  return (
    <View style={styles.container}>
      <Text
        onTextLayout={(event: NativeSyntheticEvent<TextLayoutEventData>) => {
          setLines(event.nativeEvent.lines);
          console.log({ lines });
        }}
        style={styles.title}
      >
        This is a line of sample Evernote copy.
      </Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#00A82D",
  },
});
