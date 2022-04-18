import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mailer',
  templateUrl: './mailer.component.html',
  styleUrls: ['./mailer.component.scss'],
})
export class MailerComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'app-mailer-dialog',
  templateUrl: 'mailer.content.html',
})
export class DialogContentExampleDialog {}
