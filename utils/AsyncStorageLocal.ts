import AsyncStorage from "@react-native-async-storage/async-storage";

export const AsyncStorageLocal = {
  async get(name: string) {
    try {
      const value = await AsyncStorage.getItem(name);
      console.log(value);
      return value;
    } catch (error) {
      console.error(`Error getting cookie '${name}':`, error);
    }
  },
  async getAll() {
    try {
      const value = await AsyncStorage.getAllKeys();
      console.log(value);
      return value;
    } catch (error) {
      console.error(`Error getting all cookie`, error);
    }
  },
  async set(name: string, value: string) {
    try {
      await AsyncStorage.setItem(name, value);
      console.log(`Cookie '${name}' set successfully`);
    } catch (error) {
      console.error(`Error setting cookie '${name}':`, error);
    }
  },
  async remove(name: string) {
    try {
      await AsyncStorage.removeItem(name);
      console.log("Remove cookie", name);
    } catch (error) {
      console.error("Error clearing cookies:", error);
    }
  },
  async clear() {
    try {
      await AsyncStorage.clear();
      console.log("All cookies cleared");
    } catch (error) {
      console.error("Error clearing cookies:", error);
    }
  },
};
