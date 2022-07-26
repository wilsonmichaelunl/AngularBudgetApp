

  export interface UpdatedData {
    MajorDimension: string;
    Range: string;
    Values: string[][];
    ETag: string;
  }

  export interface Updates {
    SpreadsheetId: string;
    UpdatedCells: number;
    UpdatedColumns: number;
    UpdatedData: UpdatedData;
    UpdatedRange: string;
    UpdatedRows: number;
    ETag: string;
  }

  export interface AddExpenseResponse {
    SpreadsheetId: string;
    TableRange: string;
    Updates: Updates;
    ETag: string;
  }
