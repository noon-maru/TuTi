import { useState } from "react";
import { Modal, Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";

import { useSelector } from "react-redux";

import styled from "styled-components/native";
import { BoldStyledText, StyledText } from "@styles/globalStyles";

import { RootState } from "@redux/reducers";
import GradientText from "@components/GradientText";
import { useNavigation } from "@react-navigation/native";

interface CourseRegistrationModalProps {
  handleCourseRegistration: (
    userId: string,
    courseName: string
  ) => Promise<any>;

  children: React.ReactNode;
}

const CourseRegistrationModal = ({
  handleCourseRegistration,
  children,
}: CourseRegistrationModalProps) => {
  const navigation = useNavigation();
  const { id } = useSelector((state: RootState) => state.user);

  const [visible, setVisible] = useState<boolean>(false);
  const [isRegistrationClicked, setIsRegistrationClicked] =
    useState<boolean>(false);
  const [courseName, setCourseName] = useState<string>("");

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        style={{
          alignSelf: "flex-end",
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        {children}
      </Pressable>
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        statusBarTranslucent
      >
        <Container
          onPress={() => {
            setVisible(false);
            setIsRegistrationClicked(false);
          }}
        >
          {isRegistrationClicked ? (
            <View style={{ alignItems: "center", gap: 10 }}>
              <Logo source={require("@assets/icon/logo/logo(white).png")} />
              <BoldStyledText style={{ color: "white" }}>
                {"코스 등록 성공!"}
              </BoldStyledText>
              <Pressable
                onPress={() => {
                  setVisible(false);
                  setIsRegistrationClicked(false);
                  navigation.navigate("Box" as never);
                }}
                style={{
                  borderRadius: 10,
                  backgroundColor: "white",
                  paddingHorizontal: 17,
                  paddingVertical: 7,
                }}
              >
                <StyledText>{"보관함으로"}</StyledText>
              </Pressable>
            </View>
          ) : (
            <ModalWindowContainer>
              <ExitButton onPress={() => setVisible(false)}>
                <Icon name={"x"} size={17} color={"#7B7B7B"} />
              </ExitButton>
              <GradientText
                colors={["#5395FD", "#68E9D3"]}
                style={{ fontFamily: "SpoqaHanSansNeo-Bold", marginTop: 7 }}
              >
                {"등록할 코스의 이름을 정해주세요!"}
              </GradientText>
              <CourseNameInput
                placeholder={"ex) 맑은 날 한강공원 나들이"}
                placeholderTextColor={"#3C3C43"}
                onChangeText={(text: string) => setCourseName(text)}
                value={courseName}
              />
              <Pressable
                onPress={() => {
                  (async () => {
                    await handleCourseRegistration(id, courseName);
                    setIsRegistrationClicked(true);
                  })();
                }}
              >
                <RegistrationButton
                  colors={["#91C2F9", "#99E0DA"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <StyledText>{"등록"}</StyledText>
                </RegistrationButton>
              </Pressable>
            </ModalWindowContainer>
          )}
        </Container>
      </Modal>
    </>
  );
};

const Container = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);
`;

const Logo = styled.Image`
  width: 50px;
  height: 50px;
`;

const ModalWindowContainer = styled.Pressable`
  justify-content: center;
  align-items: center;

  border-radius: 30px;
  border-width: 0.5px;
  border-color: #efeff0;

  padding: 30px;

  gap: 20px;

  background-color: white;
`;

const ExitButton = styled.Pressable`
  position: absolute;
  top: -7px;
  right: -7px;

  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;

  border-radius: 15px;

  background-color: #d9d9d9;
`;

const CourseNameInput = styled.TextInput`
  font-family: "SpoqaHanSansNeo-Regular";
  font-size: 15px;

  width: 250px;

  border-radius: 20px;

  background-color: #e4e4e4;

  padding: 10px 15px;
`;

const RegistrationButton = styled(LinearGradient)`
  justify-content: center;
  align-items: center;

  padding: 7px 30px;

  border-radius: 12px;
`;

export default CourseRegistrationModal;
