import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';

@Component({
  selector: 'app-details-personnel-dialog',
  templateUrl: './details-personnel-dialog.component.html',
  styleUrls: ['./details-personnel-dialog.component.scss']
})
export class DetailsPersonnelDialogComponent implements OnInit {

  personnel: any;

  constructor(
    @Inject(DIALOG_DATA) data: any,
  ) { 
    this.personnel = data.personnel;
  }

  ngOnInit(): void {
  }

}
