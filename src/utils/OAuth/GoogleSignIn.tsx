import { View } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "785213727290-7oabnbha5ph1dp7prtf9mm6rhrc2blk3.apps.googleusercontent.com",
  iosClientId:
    "785213727290-3u5j999or02njgumpf0qfec0tvvtt6li.apps.googleusercontent.com",
  offlineAccess: true,
});

const GoogleSignIn = () => {
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then((result) => {
        console.log(result);
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert("User cancelled the login flow !");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Signin in progress");
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("Google play services not available or outdated !");
        // play services not available or outdated
      } else {
        console.log(error);
      }
    }
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={googleSignIn}
    />
  );
};

export default GoogleSignIn;
