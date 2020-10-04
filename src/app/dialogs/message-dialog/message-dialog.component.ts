import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export type MessageDialogTag = 'info' | 'error' | 'warning' | 'question';

export interface MessageDialogData {
  tag: MessageDialogTag;
  title: string;
  message: string;
  requireConfirm: boolean;
}

@Component({
  selector: 'sv-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
})
export class MessageDialogComponent {
  public tagIconMapping = {
    info: 'info_outline',
    question: 'question_outline',
    error: 'error_outline',
  };

  public tagColourMapping = {
    info: null,
    question: 'primary',
    error: 'warn',
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: MessageDialogData, public dialogRef: MatDialogRef<MessageDialogComponent>) {}

  public get tagIcon(): string {
    return this.tagIconMapping[this.data.tag];
  }

  public get tagColour(): string {
    return this.tagColourMapping[this.data.tag];
  }
}
