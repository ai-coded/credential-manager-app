import { MatSort, MatSortable } from '@angular/material/sort';
import { MS, STRING } from '../../config/constant';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '../../providers/api/interface';
import { TableDataDialog } from './table-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../providers/api/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit {
  isLoading = true;
  checked = false;
  columnsToDisplay: string[] = [
    'select',
    'username',
    'password',
    'email',
    'created at',
    'action',
  ];
  currentTitle: string;
  USER_DATA: IUser[] = [];
  dataSource = new MatTableDataSource<IUser>([...this.USER_DATA]);
  today: any;
  selection = new SelectionModel<IUser>(true, []);
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService<IUser>
  ) {}

  ngOnInit() {
    this.apiService.readAll(MS.USER.BASE_URL).subscribe((d) => {
      // @ts-ignore
      d.forEach((jsonItem) => this.USER_DATA.push(jsonItem));
      this.dataSource = new MatTableDataSource<IUser>([...this.USER_DATA]);
      this.isLoading = false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    setTimeout(() => {
      this.dataSource.sort = null;
      this.dataSource.sort = this.sort;
    }, 50);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isSomeSelected()) {
      this.selection.clear();
    } else {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.data.forEach((row) => this.selection.select(row));
    }
  }

  isSomeSelected() {
    console.log(this.selection.selected);
    return this.selection.selected.length > 0;
  }

  open(row) {
    alert(row);
    row = {
      id: row._id,
      username: STRING.EMPTY,
      password: STRING.EMPTY,
      email: STRING.EMPTY,
      row,
    };
    this.openDialog(row);
  }

  remove(element) {
    this.dataSource = new MatTableDataSource<IUser>(this.dataSource.data);
    this.apiService.delete(`${MS.USER.BASE_URL}/${element.id}`).subscribe(
      (d) => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item !== element
        );
      },
      (reason) => alert(reason.statusText)
    );
  }

  openDialog(row): void {
    this.dialog.open(TableDataDialog, {
      width: '35%',
      data: {
        id: row._id,
        username: row.username,
        password: row.password,
        email: row.email,
        role: STRING.BASE_ROLE /* hard coded for now */,
      },
    });
  }
}
