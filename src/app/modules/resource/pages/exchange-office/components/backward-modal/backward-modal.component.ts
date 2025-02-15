import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { BackWardModalData } from '../../exchange-office-mutate/types/backward-modal-data.interface';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-backward-modal',
  standalone: true,
  templateUrl: './backward-modal.component.html',
  styleUrls: ['./backward-modal.component.css'],
  imports: [ButtonComponent, NgFor, NgIf],
})
export class BackwardModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: BackWardModalData) {
    console.log(data);
  }

  ngOnInit() {}
}
