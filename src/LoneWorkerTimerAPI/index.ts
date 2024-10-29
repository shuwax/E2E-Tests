import { ApiService } from "../ApiService/index.js";
import { DataModel } from "../types.js";
import { PostLoneWorkerTimerModel } from "./types.js";

export class LoneWorkerTimerAPI {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  setApiService(apiService: ApiService) {
    this.apiService = apiService;
  }

  createLoneWorkerTimer = async (
    body: PostLoneWorkerTimerModel,
  ): Promise<DataModel<"PersonalAlarmViewModel">> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .POST("/api/PersonalAlarm", { body });

      return data;
    } catch (error) {
      console.error("Error creating lone-worker-timer:", error);
      return error;
    }
  };

  activateLoneWorkerTimer = async (): Promise<
    DataModel<"PersonalAlarmViewModel">
  > => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .POST("/api/PersonalAlarm/SetOff");

      return data;
    } catch (error) {
      console.error("Error activating lone-worker-timer:", error);
      return error;
    }
  };
}
