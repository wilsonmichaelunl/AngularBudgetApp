import { Component, OnInit, ViewChild } from '@angular/core';

import { Bank } from "../Models/Bank";
import { BudgetApiService } from "../Services/budgetapi.service";
import { Purchase } from "../Models/Purchase";

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.css']
})
export class UploadCsvComponent implements OnInit {
  banks: Bank[];
  selectedBank: number;
  fileAttr = 'Choose File';
  dataSource: Purchase[]

  constructor(private apiService: BudgetApiService) {
  }

  ngOnInit(): void {
    this.apiService.getBanks().subscribe(
      banks => {
        this.banks = banks;
      }
    );
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.fileAttr = file.name;

      const formData = new FormData();
      formData.append('files', file, file.name);
      formData.append('bankId', this.selectedBank.toString());
      this.apiService.sendCsv(formData)
        .subscribe(data => this.dataSource = data);
    }
  }

}
