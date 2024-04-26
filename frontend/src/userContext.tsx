import React, { useContext, useEffect, useState } from "react";
import { User, getUser } from "./middlewares/user";
import { Cookies } from "react-cookie";
interface UserContext {
  user: User;
  isLoading: boolean;
}
const userContext = React.createContext<UserContext>({
  user: {
    email: "",
    username: "",
    createdAt: "",
    updatedAt: "",
    role: "",
  },
  isLoading: true,
});
const useAuth = () => {
  const initialUser = useContext(userContext);
  const [user, setUser] = useState(initialUser.user);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("access_token");

    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser(token);
        if (fetchedUser) {
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error("Could not fetch the user 🤒", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  console.log("before", user);
  return { user, isLoading };
};

export { userContext, useAuth };
