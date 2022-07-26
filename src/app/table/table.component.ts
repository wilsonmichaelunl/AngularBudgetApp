import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { Purchase } from "../Models/Purchase";
import { PurchaseDialogComponent } from "../purchase-dialog/purchase-dialog.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() dataSource: Purchase[];
  displayedColumns: string[] = ['purchaseDateString', 'description', 'amount', 'actions'];
  disabledRows: number[] = [];

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog(element: any, index: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 800;
    dialogConfig.data = {
      description: element.Description,
      amount: element.Amount,
      purchaseDateString: element.PurchaseDateString,
      purchaseDate: element.PurchaseDate
    }

    const dialogRef = this.dialog.open(PurchaseDialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(data => {
        this.disableRow(index)
      });
  }

  disableRow(index: number) {
    this.disabledRows.push(index);
  }

  enableRow(rowIndex: number) {
    const index = this.disabledRows.indexOf(rowIndex, 0);
    if (index > -1) {
      this.disabledRows.splice(index, 1);
    }
  }
}
