import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';
import AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from "expo-app-loading";

interface AuthContextProviderProps {
  children: ReactNode;
}

interface IGoogleResponse {
  params: {
    access_token: string;
  };
  type: string;
}

type User = {
  id: string;
  name: string;
  email: string;
  photo?: string;
} | null;

interface IAuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const { children } = props;

  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = process.env.CLIENT_ID;
      const REDIRECT_URI = process.env.REDIRECT_URI;
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `${process.env.GOOGLE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params: { access_token }, type } = await AuthSession.startAsync({ authUrl }) as IGoogleResponse;

      if (type === 'success') {
        const { data } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`);
        const userLogged = {
          email: data.email,
          id: data.id,
          photo: data.picture,
          name: `${data.given_name} ${data.family_name}`
        };
        setUser(userLogged)
        await AsyncStorage.setItem(process.env.USER_STORAGE_KEY!, JSON.stringify(userLogged));
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if (credential) {
        const name = `${credential.fullName?.givenName} ${credential.fullName?.familyName}`;
        const userLogged = {
          id: credential.user,
          email: credential.email!,
          name,
          photo: `https://ui-avatars.com/api/?name=${encodeURI(name)}`
        }

        setUser(userLogged);
        await AsyncStorage.setItem(process.env.USER_STORAGE_KEY!, JSON.stringify(userLogged));
      }

    } catch (error) {
      Promise.reject(error);
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem(process.env.USER_STORAGE_KEY!);
    setUser(null);
  }

  useEffect(() => {

    async function getStorageUser() {
      const userStringified = await AsyncStorage.getItem(process.env.USER_STORAGE_KEY!);
      const userLogged: User = userStringified ? JSON.parse(userStringified) : null;
      setUser(userLogged);
      setLoading(false);
    }
    getStorageUser();

  }, [])

  const values = useMemo(() => ({
    user,
    signInWithGoogle,
    signInWithApple,
    signOut
  }), [user]);

  return (
    <AuthContext.Provider value={values}>
      {loading ? <AppLoading /> : children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (typeof context === 'undefined') {
    throw new Error(
      `useAuth must be used within a AuthContextProvider`,
    );
  }
  return context;
}
