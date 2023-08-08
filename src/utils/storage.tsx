import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Data saved successfully");
  } catch (error) {
    console.log("Error saving data: ", error);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log("Data found: ", value);
      return value;
    } else {
      console.log("Data not found");
      return null;
    }
  } catch (error) {
    console.log("Error retrieving data: ", error);
    return null;
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log("Data removed successfully");
  } catch (error) {
    console.log("Error removing data: ", error);
  }
};
