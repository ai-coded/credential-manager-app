import { MatSort } from '@angular/material/sort';
import { MS, STRING } from '../../config/constant';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '../../providers/api/interface';
import { TableDataDialog } from './table-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../providers/api/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { IconService } from '../../providers/icon/Icon.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { first } from '../../utils/function';
import { SharedService } from '../../providers/shared/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../snackbar/snack.component';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit {
  isLoading = true;
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
  selection = new SelectionModel<IUser>(true, []);
  value = this.selection.selected;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService<IUser>,
    private iconService: IconService,
    private clipboard: Clipboard,
    private service: SharedService,
    private snackBar: MatSnackBar
  ) {
    this.iconService.registerSvgIcon('refresh', 'refresh');
    this.service.emitData(this.dataSource.data.length);
    //this.openSnackBar('Error', 'Ok');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      panelClass: ['default-snackbar'],
    });
  }

  ngOnInit() {
    this.apiService.readAll(MS.USER.BASE_URL).subscribe(
      (d) => {
        // @ts-ignore
        d.forEach((jsonItem) => this.USER_DATA.push(jsonItem));
        this.dataSource = new MatTableDataSource<IUser>([...this.USER_DATA]);
        this.isLoading = false;
      },
      (r) => this.openSnackBar(r.statusText, 'Ok')
    );
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

  create(row) {
    row = {
      id: row._id,
      username: STRING.EMPTY,
      password: STRING.EMPTY,
      email: STRING.EMPTY,
      firstname: STRING.EMPTY,
      lastname: STRING.EMPTY,
      fullName: STRING.EMPTY,
      row,
    };
    this.edit(row);
  }

  edit(row): void {
    this.dialog.open(TableDataDialog, {
      width: '35%',
      data: {
        id: row.id,
        username: row.username,
        password: row.password,
        email: row.email,
        role: STRING.BASE_ROLE,
        credential: this.dataSource.data.length,
        firstname: row.firstname,
        lastname: row.lastname,
        fullName:
          (row.firstname || STRING.EMPTY.trim()) +
          (row.firstname ? ' ' : '') +
          (row.lastname || STRING.EMPTY.trim()),
      },
    });
  }

  remove(element) {
    this.dataSource = new MatTableDataSource<IUser>(this.dataSource.data);
    this.apiService.delete(`${MS.USER.BASE_URL}/${element.id}`).subscribe(
      (d) => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item !== element
        );
        this.service.emitData(this.dataSource.data.length);
      },
      (r) => this.openSnackBar(r.statusText, 'Ok')
    );
  }

  refresh() {
    this.dataSource = new MatTableDataSource<IUser>([...this.USER_DATA]);
    this.dataSource.sortData(this.USER_DATA, this.sort);
  }

  copyUsername() {
    this.clipboard.copy(first(this.selection.selected).username);
  }
  copyPassword() {
    this.clipboard.copy(first(this.selection.selected).password);
  }
  copyEmail() {
    this.clipboard.copy(first(this.selection.selected).email);
  }
}
