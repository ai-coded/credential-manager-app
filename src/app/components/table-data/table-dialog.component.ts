import { MS } from '../../config/constant';
import { Component, Inject } from '@angular/core';
import { ApiService } from '../../providers/api/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../../providers/shared/shared.service';

@Component({
  selector: 'table-data-dialog',
  templateUrl: 'table-data.dialog.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataDialog {
  hide = true;
  isEditing = false;
  constructor(
    public dialogRef: MatDialogRef<TableDataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService<any>,
    private service: SharedService
  ) {}

  add(row) {
    this.apiService.create(`${MS.USER.BASE_URL}`, row).subscribe((d) => {
      this.dialogRef.close();
    });
  }

  save(row) {
    const id = row.id;
    this.apiService.update(`${MS.USER.BASE_URL}/${id}`, row).subscribe((d) => {
      this.dialogRef.close();
    });
  }
}
