import { View, Button } from "react-native";

const ModalScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* SafeAreaView를 넘어서 구현할 UI */}
      <Button title="Close Modal" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ModalScreen;
