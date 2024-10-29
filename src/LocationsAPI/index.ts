import { ApiService } from "../ApiService/index.js";
import { DataModel, PathParameters } from "../types.js";
import { CreateLocationModel } from "./types.js";

export class LocationsAPI {
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

  getLocations = async () => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET("/api/Locations");

      return data;
    } catch (error) {
      console.error("Error fetching locations:", error);
      return error;
    }
  };

  getLocationById = async (
    id: number,
  ): Promise<DataModel<"LocationViewModel">> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET("/api/Locations/{id}", { params: { path: { id } } });

      return data;
    } catch (error) {
      console.error("Error fetching location:", error);
      return error;
    }
  };

  createLocation = async (
    body: CreateLocationModel,
  ): Promise<DataModel<"LocationViewModel">> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .POST("/api/Locations", { body });

      return data;
    } catch (error) {
      console.error("Error creating location:", error);
      return error;
    }
  };
}
