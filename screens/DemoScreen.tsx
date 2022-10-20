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

interface AdaptiveTextProps {
  minFontSize: number;
  maxTextLines: number;
  children?: React.ReactNode;
}

const AdaptiveText = (props: AdaptiveTextProps) => {
  const [hasHitBoundary, setHasHitBoundary] = useState(false);
  
  const [fontSize, setFontSize] = useState(props.minFontSize);
  const inflate = () => void setFontSize((fontSize) => fontSize + 2);
  const deflate = () => void setFontSize((fontSize) => fontSize - 1);

  return (
    <Text
      onTextLayout={(event: NativeSyntheticEvent<TextLayoutEventData>) => {
        const lines: TextLayoutLine[] = event.nativeEvent.lines;
        setTimeout(() => {
          if (!hasHitBoundary) {
            if (lines.length <= props.maxTextLines) {
              inflate();
            } else {
              setHasHitBoundary(true);
            }
          }
          if (lines.length > props.maxTextLines) {
            deflate();
          }
        }, 200);
      }}
      style={{
        fontSize,
        fontWeight: "bold",
        color: "#00A82D",
      }}
    >
      {props.children}
    </Text>
  );
};

export default function DemoScreen() {
  return (
    <View style={styles.container}>
      <AdaptiveText minFontSize={10} maxTextLines={2}>
        This is a line of sample Evernote copy.
      </AdaptiveText>

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
});
