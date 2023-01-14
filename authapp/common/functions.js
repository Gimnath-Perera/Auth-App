import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToLocalStorage = async (token, user) => {
  try {
    await AsyncStorage.setItem('@token', token);
    await AsyncStorage.setItem('@user', JSON.stringify(user));
  } catch (e) {
    // saving error
  }
};

export const getFromLocalStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('@token');
    const currentUser = await AsyncStorage.getItem('@user');

    return {
      token,
      currentUser: currentUser ? JSON.parse(currentUser) : null,
    };
  } catch (e) {
    // error reading value
  }
};

export const clearLocalStorage = async () => {
  try {
    await AsyncStorage.removeItem('@token');
    await AsyncStorage.removeItem('@user');
  } catch (e) {
    // error reading value
  }
};
