import { ApiService } from "../ApiService/index.js";
import { DataModel, PathParameters, QueryParameters } from "../types.js";
import {
  ChangeUsersPasswordModel,
  DeleteUserModel,
  GetAdminPanelUsersQuery,
  GetUsersQuery,
  RegisterUserModel,
} from "./types.js";

export class UsersAPI {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  setApiService(apiService: ApiService) {
    this.apiService = apiService;
  }

  registerUser = async (
    body: RegisterUserModel,
  ): Promise<DataModel<"UserViewModelExtended">> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .POST("/api/Admin/Users/Register", { body });

      return data;
    } catch (error) {
      console.error("Error registering user:", error);
      return error;
    }
  };

  changeUsersPassword = async (id: number, body: ChangeUsersPasswordModel) => {
    try {
      await this.apiService
        .getOpenApiClient()
        .POST("/api/Admin/Users/{id}/changePassword", {
          body,
          params: { path: { id } },
          parseAs: "text",
        });
    } catch (error) {
      console.error("Error registering users:", error);
      return error;
    }
  };

  registerUserAndSetPassword = async (
    body: RegisterUserModel,
  ): Promise<DataModel<"UserViewModelExtended">> => {
    try {
      const userData = await this.registerUser(body);

      if (userData?.id) {
        await this.changeUsersPassword(userData.id, {
          password: body.password,
        });
      }
      return userData;
    } catch (error) {
      console.error("Error registering user and setting password:", error);
      return error;
    }
  };

  registerMultipleUsers = async (
    users: RegisterUserModel[],
  ): Promise<DataModel<"UserViewModelExtended">[]> => {
    try {
      const result = await Promise.all(
        users.map((user) => this.registerUserAndSetPassword(user)),
      );

      return result;
    } catch (error) {
      console.error("Error registering users:", error);
      return error;
    }
  };

  getUsers = async (
    query?: GetUsersQuery,
  ): Promise<DataModel<"UserViewModel">[]> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET("/api/Users", { params: { query } });

      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return error;
    }
  };

  getUserById = async (
    id: number,
  ): Promise<DataModel<"UserViewModelExtended">> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET("/api/Users/{id}", { params: { path: { id } } });

      return data;
    } catch (error) {
      console.error("Error fetching user by id:", error);
      return error;
    }
  };

  getAdminPanelUsers = async (
    query?: GetAdminPanelUsersQuery,
  ): Promise<DataModel<"UserMemberViewModel">[]> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET("/api/Admin/Users/accounts", { params: { query } });

      return data?.users ?? [];
    } catch (error) {
      console.error("Error fetching groups:", error);
      return error;
    }
  };

  deleteUser = async (id: number, body?: DeleteUserModel) => {
    try {
      await this.apiService
        .getOpenApiClient()
        .DELETE("/api/Admin/Users/{id}/delete", {
          body,
          params: { path: { id } },
          parseAs: "text",
        });
    } catch (error) {
      console.error("Error deleting user:", error);
      return error;
    }
  };

  deleteMultipleUsers = async (users: DeleteUserModel[]) => {
    try {
      if (!users.length) return;

      await this.apiService
        .getOpenApiClient()
        .DELETE("/api/Admin/Users/delete", {
          body: users,
          parseAs: "text",
        });
    } catch (error) {
      console.error("Error deleting users:", error);
      return error;
    }
  };
}
