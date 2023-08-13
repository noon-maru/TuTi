import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import styled from "styled-components/native";
import Voice from "@react-native-voice/voice";

const STT = ({
  setSearchText,
}: {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isListening, setIsListening] = useState<boolean>(false);

  const startVoiceRecognition = async () => {
    try {
      await Voice.start("ko-KR");
      setIsListening(true);
      setSearchText("");
      // 타이머가 시작하고 3초 뒤에 자동으로 종료
      setTimeout(() => {
        stopVoiceRecognition();
      }, 3000);
    } catch (error) {
      console.error("음성 인식 시작 오류:", error);
    }
  };

  const stopVoiceRecognition = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error("음성 인식 정지 오류:", error);
    }
  };

  const onSpeechResultsHandler = (event: any) => {
    const results = event.value;
    setSearchText(results.join(" "));
  };

  Voice.onSpeechResults = onSpeechResultsHandler;

  return (
    <Container
      onPress={isListening ? stopVoiceRecognition : startVoiceRecognition}
    >
      <Icon name="microphone" size={17} color={isListening ? "red" : "gray"} />
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export default STT;
