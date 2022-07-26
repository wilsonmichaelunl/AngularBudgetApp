import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense } from "../Models/Expense";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ExpenseCategoryGroup } from "../Models/ExpenseCategoryGroup";
import { BudgetApiService } from "../Services/budgetapi.service";
import { MatDialogRef } from "@angular/material/dialog";
import { TableComponent } from "../table/table.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-purchase-dialog',
  templateUrl: './purchase-dialog.component.html',
  styleUrls: ['./purchase-dialog.component.css']
})
export class PurchaseDialogComponent implements OnInit {
  description: string;
  purchaseDateString: string;
  amount: number;
  purchaseDate: Date;
  expenseCategoryGroups: ExpenseCategoryGroup[];
  totalAmount = 0;

  expenseForm: FormGroup;

  get expenses(): FormArray {
    return this.expenseForm.get('expenses') as FormArray;
  }

  constructor(@Inject(MAT_DIALOG_DATA) data, private fb: FormBuilder,
              private budgetService: BudgetApiService, private dialogRef: MatDialogRef<TableComponent>,
              private _snackBar: MatSnackBar) {
    this.description = data.description;
    this.purchaseDate = data.purchaseDate;
    this.purchaseDateString = data.purchaseDateString;
    this.amount = data.amount;
  }

  ngOnInit(): void {
    this.budgetService.getExpenseCategoryGroups().subscribe(
      data => {
        this.expenseCategoryGroups = data;
      }
    );

    this.expenseForm = this.fb.group({
      expenses: this.fb.array([this.buildExpense()])
    });

    this.getRunningTotal();
  }

  buildExpense(): FormGroup {
    return this.fb.group({
      expenseDate: [this.purchaseDate, Validators.required],
      bucket: ['', Validators.required],
      amount: [this.amount, Validators.required],
      description: ['']
    });
  }

  getExpenseRowCount(): number {
    let rows = this.expenseForm.get('expenses') as FormArray;
    return rows.length;
  }

  addRow(): void {
    this.expenses.push(this.buildExpense());
    this.getRunningTotal();
  }

  deleteRow(index: number): void {
    this.expenses.removeAt(index);
    this.getRunningTotal();
  }

  save(): void {
    let jsonString: string = JSON.stringify(this.expenseForm.getRawValue());
    let jsonObject = JSON.parse(jsonString);

    this.budgetService.addExpensesToGoogleSheets(jsonObject)
      .subscribe(
        data => {
          this._snackBar.open(`${data.Updates.UpdatedRows} row(s) updated.`, 'Dismiss', {
            duration: 3000
          });
        }
      );

    this.dialogRef.close();
  }

  getRunningTotal(): void {
    this.totalAmount = 0;
    this.expenses.controls.forEach(element => {
      if (element.value) {
        this.totalAmount += element.value.amount;
      }
    })

  }
}
