import { View, Text, TouchableOpacity, Image } from "react-native";
import GoogleSignIn from "utils/OAuth/GoogleSignIn";
import KakaoSignIn from "utils/OAuth/KakaoSignIn";
import NaverSignIn from "utils/OAuth/NaverSignIn";

const SignInMethodScreen = () => {
  return (
    <View>
      <GoogleSignIn />
      <KakaoSignIn />
      <NaverSignIn />
    </View>
  );
};

export default SignInMethodScreen;
