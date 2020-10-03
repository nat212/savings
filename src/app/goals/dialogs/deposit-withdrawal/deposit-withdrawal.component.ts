import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DepositWithdrawalData {
  mode: 'deposit' | 'withdrawal';
}

@Component({
  selector: 'sv-deposit-withdrawal',
  templateUrl: './deposit-withdrawal.component.html',
  styleUrls: ['./deposit-withdrawal.component.scss'],
})
export class DepositWithdrawalComponent implements OnInit {
  public amountControl: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DepositWithdrawalData, public dialogRef: MatDialogRef<DepositWithdrawalComponent>) {}

  public ngOnInit(): void {
    this.amountControl = new FormControl(null, Validators.required);
  }
}
