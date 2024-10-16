import axios, { HttpStatusCode } from "axios";

export const TRANSLATE_SERVER_URL = "http://localhost:8080";

export const TRANSLATE_API_URL = TRANSLATE_SERVER_URL + "/api/v1";

const api = axios.create({
  baseURL: TRANSLATE_API_URL,
  validateStatus: () => true,
});

export interface User {
  user_id: string;
  email: string;
  created_at: string;
}

interface Message {
  message_id: string;
  sent_by_user: boolean;
  text: string;
  created_at: string;
}

export const createChat = async (
  initialMessage: string,
  onSuccess: (user: User) => void,
  onFail: (error: string) => void
) => {
  try {
    const response = await api.post("/chats", {
      initialMessage,
    });

    if (response.data.message) {
      onFail(response.data.message);
    } else if (response.status === HttpStatusCode.Created) {
      let user: User = response.data.data;
      onSuccess(user);
    }
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (
  email: string,
  password: string,
  onSuccess: (user: User) => void,
  onFail: (error: string) => void
) => {
  try {
    const response = await api.post("/auth/signup", {
      email,
      password,
    });

    if (response.data.message) {
      onFail(response.data.message);
    } else if (response.status === HttpStatusCode.Created) {
      let user: User = response.data.data;
      onSuccess(user);
    }
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const logIn = async (
  email: string,
  password: string,
  onSuccess: (user: User) => void,
  onFail: (error: string) => void
) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    if (response.data.message) {
      onFail(response.data.message);
    } else if (response.status === HttpStatusCode.Ok) {
      let user: User = response.data.data;
      onSuccess(user);
    }
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
