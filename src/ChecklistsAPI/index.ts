import { DataModel } from "../types.js";
import { ApiService } from "../ApiService/index.js";
import { GetChecklistsQuery } from "./types.js";

export class ChecklistsAPI {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  setApiService(apiService: ApiService) {
    this.apiService = apiService;
  }

  getChecklists = async (
    query?: GetChecklistsQuery,
  ): Promise<DataModel<"ChecklistViewModel">[]> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET("/api/Checklists", { params: { query } });

      return data;
    } catch (error) {
      console.error("Error fetching checklists:", error);
      return error;
    }
  };

  getChecklistItems = async (
    checklistId: number,
  ): Promise<DataModel<"ChecklistItemViewModel">[]> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET("/api/Checklists/{checklistID}/items", {
          params: { path: { checklistID: checklistId } },
        });

      return data;
    } catch (error) {
      console.error("Error fetching checklist items:", error);
      return error;
    }
  };

  setChecklistItemState = async (
    checklistId: number,
    itemId: number,
    completeState: boolean,
  ): Promise<DataModel<"ChecklistItemViewModel">> => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .POST("/api/Checklists/{checklistID}/items/{itemID}", {
          params: { path: { checklistID: checklistId, itemID: itemId } },
          body: { complete: completeState },
        });

      // Somewhy in Swagger it's declared as an array, but returns item
      return data as unknown as Promise<DataModel<"ChecklistItemViewModel">>;
    } catch (error) {
      console.error("Error updating checklist item status:", error);
      return error;
    }
  };
}
