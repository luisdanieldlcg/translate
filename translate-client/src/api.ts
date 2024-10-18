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

interface TranslateDto {
  chat_id: number;
  from: string;
  to: string;
  message: string;
}

interface Translation {
  translated_text: string;
  original_text: string;
  created_at: string;
  message_id: string;
}

export const clearAllChats = async (
  onSuccess: () => void,
  onFail: (error: string) => void
) => {
  try {
    const response = await api.delete(`/chats`);
    if (response.data.message) {
      onFail(response.data.message);
    } else if (response.status === HttpStatusCode.Ok) {
      onSuccess();
    }
  } catch (error) {
    console.log(error);
  }
};

export const translate = async (
  dto: TranslateDto,
  onSuccess: (translation: Translation) => void,
  onFail: (error: string) => void
) => {
  try {
    const response = await api.post(`/chats/${dto.chat_id}/translate`, dto);
    if (!response.data) {
      onFail(response.data.message);
    } else if (response.status === HttpStatusCode.Created) {
      let translation: Translation = response.data;
      console.log("Calling onSuccess with:", translation);
      onSuccess(translation);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllChats = async (
  onSuccess: (chat: Chat[]) => void,
  onFail: (error: string) => void
) => {
  try {
    const response = await api.get(`/chats`);
    if (response.data.message) {
      onFail(response.data.message);
    } else if (response.status === HttpStatusCode.Ok) {
      console.log("Response:", response.data);
      let chats: Chat[] = response.data;
      onSuccess(chats);
    }
  } catch (error) {
    console.log(error);
  }
};

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
      chat.messages = [];
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
    const response = await api.post(
      "/auth/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
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
