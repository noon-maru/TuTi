import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "redux/userSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // 로그아웃 처리 후 사용자 정보 초기화
    dispatch(logout());
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={handleLogout}
        style={{ backgroundColor: "limegreen", padding: 40, borderRadius: 5 }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          로그아웃
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
