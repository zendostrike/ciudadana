import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAuth() {
  const USERS_KEY = "users";

  const getStoredUsers = async () => {
    const jsonValue = await AsyncStorage.getItem(USERS_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  };

  const saveUsers = async (users: any[]) => {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const signIn = async (email: string, password: string) => {
    const users = await getStoredUsers();
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );
    return user || null;
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const users = await getStoredUsers();

    const userExists = users.some((u: any) => u.email === email);
    if (userExists) {
      return null;
    }

    const newUser = {
      id: users.length + 1,
      fullName,
      email,
      password,
    };

    const updatedUsers = [...users, newUser];
    await saveUsers(updatedUsers);
    return newUser;
  };

  return { signIn, signUp };
}
