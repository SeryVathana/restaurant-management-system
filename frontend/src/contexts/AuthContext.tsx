import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id?: string; // Optional property for user ID (if applicable)
  email: string;
  name?: string; // Optional property for user name
}

interface CurrentUserContextType {
  user: User | null; // Define a stricter type for user
  setUser: (user: User | null) => void;
}

const UserContext = createContext<CurrentUserContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null); // Initial state: not logged in

  // Simulate fetching user data from an API (replace with your actual logic)
  useEffect(() => {
    // const fetchUserData = async () => {
    //   try {
    //     const response = await fetch(/* API endpoint for user data */);
    //     const data = await response.json();
    //     setUser(data.user); // Update user state with fetched data
    //   } catch (error) {
    //     console.error("Error fetching user data:", error);
    //     // Handle errors (e.g., display error message)
    //   }
    // };
    // fetchUserData();
    setUser({ id: "1", email: "yooseryvathana@gmail.com", name: "Vathana" });
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};

// Login and logout functions (replace with your implementation)
export const login = async (/* credentials */) => {
  // try {
  //   const response = await fetch(/* API endpoint for login */);
  //   const data = await response.json();
  //   setUser(data.user); // Update user state on successful login
  // } catch (error) {
  //   console.error("Error logging in:", error);
  //   // Handle errors (e.g., display error message)
  // }
};

export const logout = () => {
  // setUser(null); // Clear user state on logout
};
