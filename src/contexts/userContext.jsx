// impliment user context with new backebd

// example from different project 1:

/* import { useNavigate } from "react-router";
import { createContext, useState, useEffect } from "react";

export const AccountContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({
    loggedIn: null,
    token: localStorage.getItem("token"),
  });
  const navigate = useNavigate();

    const logout = () => {
    localStorage.removeItem("sid");
    setUser({ loggedIn: null, token: null });
    navigate("/");
  }

  const [logout, setLogout] = useState(null);

  useEffect(() => {
    //${process.env.REACT_APP_SERVER_URL}
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
      credentials: "include",
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    })
      .catch((err) => {
        setUser({ loggedIn: false });
        return;
      })
      .then((r) => {
        if (!r || !r.ok || r.status >= 400) {
          setUser({ loggedIn: false });
          return;
        }
        return r.json();
      })
      .then((data) => {
        if (!data) {
          setUser({ loggedIn: false });
          return;
        }
        setUser({ ...data });
        navigate("/home");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};

export default UserContext; */

// example from different project 2:

/* import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext({});

// For auth check and user info / data

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  });

  const signUp = ({ firstName, lastName, email, password }) => {
    setUser({
      firstName,
      lastName,
      email,
      password,
    });

    localStorage.setItem(
      "user",
      JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      })
    );
  };

  const logOut = () => {
    setUser({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    });

    localStorage.removeItem("user");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, []);

  const auth = useMemo(
    () => ({
      user,
      signUp,
      logOut,
    }),
    [user]
  );

  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
export default UserProvider;
 */