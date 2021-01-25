import React, { useEffect, useContext, createContext } from "react";
import axios from "axios";

type AuthProps = {
  signin: (email: any, password: any) => Promise<void>;
  signup: (email: any, password: any) => Promise<void>;
};

const authContext = createContext<Partial<AuthProps> | any>({});
export function ProvideAuth({ children }: any) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}> {children} </authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

const baseUrl = "http://localhost:8001";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

function useProvideAuth() {
  const signin = async (email: any, password: any) => {
    const userData = {
      email: email,
      password: password,
    };
    await axios
      .post(`${baseUrl}/login`, userData, config)
      //responseが返ってこない。。
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const signup = async (email: any, password: any) => {
    const userData = {
      email: email,
      password: password,
    };
    await axios
      .post(`${baseUrl}/users`, userData, config)
      //responseが返ってこない。。
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err))
      .then((res) => {
        console.log(res);
      });
  };

  return {
    signin,
    signup,
  };
}
