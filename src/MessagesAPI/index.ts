import { ApiService } from "../ApiService/index.js";
import {
  GetMessageQuery,
  GetMessagesQuery,
  PostMessageModel,
  PostReplyModel,
} from "./types.js";

export class MessagesAPI {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  setApiService(apiService: ApiService) {
    this.apiService = apiService;
  }

  getApiService = () => {
    return this.apiService;
  };

  getMessages = async (query?: GetMessagesQuery) => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET("/api/Messages", { params: { query } });

      return data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return error;
    }
  };

  postMessage = async (body: PostMessageModel) => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .POST("/api/Messages", { body });

      return data;
    } catch (error) {
      console.error("Error posting message:", error);
      return error;
    }
  };

  getMessage = async (id: number, query?: GetMessageQuery) => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET("/api/Messages/{id}", {
          params: {
            path: { id },
            query,
          },
        });

      return data;
    } catch (error) {
      console.error("Error fetching message:", error);
      return error;
    }
  };

  postReply = async (messageId: number, body: PostReplyModel) => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .POST("/api/Messages/{messageID}/reply", {
          params: { path: { messageID: messageId } },
          body,
        });

      return data;
    } catch (error) {
      console.error("Error posting reply:", error);
      return error;
    }
  };

  getMessageRecipients = async (messageId: number) => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET("/api/Messages/{messageID}/recipients", {
          params: { path: { messageID: messageId } },
        });

      return data;
    } catch (error) {
      console.error("Error fetching message recipients:", error);
      return error;
    }
  };
}
