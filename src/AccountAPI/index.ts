import { ApiService } from '../ApiService/index.js';
import { DeviceType } from '../common/common.types.js';
import { DataModel, PathParameters, QueryParameters } from '../types.js';
import {
  CreateDeviceModel,
  LoginAdminByEmailAndPasswordModel,
  LoginByEmailAndPasswordModel,
  LogoutQuery,
  TwoFactorViewModel,
} from './types.js';

export class AccountAPI {
  private apiService: ApiService;
  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  setApiService = (apiService: ApiService) => {
    this.apiService = apiService;
  };

  getApiService = () => {
    return this.apiService;
  };

  getAntiForgeryToken = async () => {
    try {
      const { data, response } = await this.apiService
        .getOpenApiClient()
        .GET('/api/Account/AntiForgeryToken');

      const token = data.requestVerificationToken;
      const cookie = response.headers.get('set-cookie');

      if (!this.apiService.getCookies()?.length) {
        if (cookie) this.apiService.setCookies([cookie]);
      }

      if (token) this.apiService.setCSRFToken(token);

      return { token, cookie };
    } catch (error) {
      console.error('Error fetching AntiForgeryToken:', error);
      return error;
    }
  };

  loginByEmailAndPassword = async (
    body: LoginByEmailAndPasswordModel,
  ): Promise<DataModel<'UserInfoViewModel'>> => {
    try {
      const { data, response } = await this.apiService
        .getOpenApiClient()
        .POST('/api/Account/Login', { body });

      const cookies = response.headers.get('set-cookie');
      this.apiService.setCookies([...this.apiService.getCookies(), cookies]);
      await this.getAntiForgeryToken();

      console.log('Logged in');
      return data;
    } catch (error) {
      console.error('Error logging in:', error);
      return error;
    }
  };

  loginAdminByEmailAndPassword = async (
    body: LoginAdminByEmailAndPasswordModel,
  ): Promise<DataModel<'UserInfoViewModel'>> => {
    try {
      const bodyData = { ...body };
      if (!bodyData.language) bodyData.language = 'en';

      const { data, response } = await this.apiService
        .getOpenApiClient()
        .POST('/api/Account/LoginAdmin', { body: bodyData });

      const dataObject = data as TwoFactorViewModel;
      const code = dataObject?.code;

      if (code) {
        return this.loginAdminByEmailAndPassword({ ...body, code });
      }

      const cookies = response.headers.get('set-cookie');
      this.apiService.setCookies([...this.apiService.getCookies(), cookies]);
      await this.getAntiForgeryToken();

      console.log('Logged in');
      return data;
    } catch (error) {
      console.error('Error admin logging in:', error);
      return error;
    }
  };

  getUserInfo = async (): Promise<DataModel<'UserInfoViewModel'>> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET('/api/Account/Info');

      return data;
    } catch (error) {
      console.error('Error getting user info:', error);
      return error;
    }
  };

  createDevice = async (
    body: CreateDeviceModel,
  ): Promise<DataModel<'Device'>> => {
    try {
      const bodyData = {
        type: body.deviceType ?? DeviceType.iOS,
        userID: body.userId,
        id: body.fcmToken,
      };
      const { data } = await this.apiService
        .getOpenApiClient()
        .POST('/api/Devices', {
          body: bodyData,
        });

      return data;
    } catch (error) {
      console.error('Error creating device:', error);
      return error;
    }
  };

  logout = async (query?: LogoutQuery) => {
    try {
      await this.apiService.getOpenApiClient().POST('/api/Account/Logout', {
        params: { query },
      });

      this.apiService.setCookies([]);
      await this.getAntiForgeryToken();

      console.log('Logout successful');
    } catch (error) {
      console.error('Error logging out:', error);
      return error;
    }
  };
}
