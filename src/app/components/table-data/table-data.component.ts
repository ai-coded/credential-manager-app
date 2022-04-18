import { MatSort } from '@angular/material/sort';
import { MS, STRING } from '../../config/constant';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '../../providers/api/interface';
import { TableDataDialog } from './table-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../providers/api/api.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit {
  isLoading = true;
  checked = false;
  columnsToDisplay: string[] = [
    'position',
    'username',
    'password',
    'email',
    'created at',
  ];
  currentTitle: string;
  USER_DATA: IUser[] = [];
  dataSource = new MatTableDataSource<IUser>([...this.USER_DATA]);
  today: any;

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
  }

  open(row) {
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
    this.apiService
      .delete(`${MS.USER.DELETE_URL}${element.id}`)
      .subscribe((d) => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item !== element
        );
      });
  }

  openDialog(row): void {
    this.dialog.open(TableDataDialog, {
      width: '35%',
      data: {
        id: row._id,
        username: row.username,
        password: row.password,
        email: row.email,
        role: '625bcb0dddacbaeb1d2c6a2a' /* hard coded for now */,
      },
    });
  }
}
