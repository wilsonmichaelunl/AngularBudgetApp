import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Bank } from "../Models/Bank";
import { Purchase } from "../Models/Purchase";
import { ExpenseCategoryGroup } from "../Models/ExpenseCategoryGroup";
import { Expense } from "../Models/Expense";
import { AddExpenseResponse } from '../Models/AddExpenseResponse'

@Injectable({
  providedIn: 'root'
})

export class BudgetApiService {
  private apiUrl = 'http://localhost:5127/';
  //private apiUrl = 'http://localhost:55011/';

  constructor(private http: HttpClient) {
  }

  getBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.apiUrl + 'Budget/GetBanks')
      .pipe(
        catchError(this.handleError)
      );
  }

  sendCsv(form: FormData): Observable<Purchase[]> {
    return this.http.post<Purchase[]>(
      this.apiUrl + 'Csv/UploadCsv', form
    ).pipe(
      map(purchases => purchases.map(purchase => {
        purchase.PurchaseDateString = new Date(purchase.PurchaseDate).toLocaleDateString();
        purchase.PurchaseDate = new Date(purchase.PurchaseDate);
        return purchase;
      }))
    );
  }

  getExpenseCategoryGroups(): Observable<ExpenseCategoryGroup[]> {
    return this.http.get<ExpenseCategoryGroup[]>(
      this.apiUrl + 'Budget/GetExpenseCategories')
      .pipe(
        catchError(this.handleError)
    );
  }

  addExpensesToGoogleSheets(jsonObject: any): Observable<AddExpenseResponse> {
    const headers = new HttpHeaders({'Content-Type': 'application/json;'})
    return this.http.post<AddExpenseResponse>(
      this.apiUrl + 'Budget/AddExpenses', jsonObject.expenses, {headers: headers}
    )
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
