import axios, { HttpStatusCode } from "axios";
axios.defaults.withCredentials = true;

export const TRANSLATE_SERVER_URL = "http://localhost:8080";

export const TRANSLATE_API_URL = TRANSLATE_SERVER_URL + "/api/v1";

const api = axios.create({
  baseURL: TRANSLATE_API_URL,
  validateStatus: () => true,
});

export interface User {
  userId: number;
  email: string;
  created_at: string;
}

export interface Message {
  message_id: string;
  content: string;
  sent_by_user: boolean;
  created_at: string;
}

export interface Chat {
  chat_id: number;
  title: string;
  messages: Message[];
}

export const getChat = async (
  chatId: number,
  onSuccess: (chat: Chat) => void,
  onFail: (error: string) => void
) => {
  try {
    const response = await api.get(`/chats/${chatId}`);
    if (response.data.message) {
      onFail(response.data.message);
    } else if (response.status === HttpStatusCode.Ok) {
      console.log("Response:", response.data);
      let chat: Chat = response.data;
      onSuccess(chat);
    }
  } catch (error) {
    console.log(error);
  }
};

export const createChat = async (
  initialMessage: string,
  owner: number,
  onSuccess: (chat: Chat) => void,
  onFail: (error: string) => void
) => {
  try {
    const response = await api.post("/chats", {
      initialMessage,
      owner_id: owner,
    });
    if (response.data.message) {
      onFail(response.data.message);
    } else if (response.status === HttpStatusCode.Created) {
      let chat: Chat = response.data;
      onSuccess(chat);
    }
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export const verifyToken = async (
  onSuccess: (user: User) => void,
  onFail: (error: string) => void
) => {
  try {
    const response = await api.post("/auth/verify-token", {});
    if (response.data.message) {
      onFail(response.data.message);
    } else if (response.status === HttpStatusCode.Ok) {
      let user: User = response.data;
      onSuccess(user);
    }
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
