import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { MessageDialogComponent, MessageDialogData, MessageDialogTag } from '../dialogs/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private dialog: MatDialog, private matSnackbar: MatSnackBar) {}

  public messageDialog(title: string, message: string, tag: MessageDialogTag = 'info'): Observable<void> {
    const data: MessageDialogData = {
      title,
      message,
      tag,
      requireConfirm: false,
    };
    return this.openDialog(MessageDialogComponent, { data });
  }

  public confirmDialog(title: string, message: string, tag: MessageDialogTag = 'info'): Observable<boolean> {
    const data: MessageDialogData = {
      title,
      message,
      tag,
      requireConfirm: true,
    };
    return this.openDialog<boolean>(MessageDialogComponent, { data });
  }

  public openDialog<T = any>(dialog: ComponentType<any>, config: MatDialogConfig = {}): Observable<T> {
    return this.dialog.open(dialog, config).afterClosed();
  }

  public snackbar(message: string, action: string = null, duration = 5000): Observable<void> {
    return this.matSnackbar.open(message, action, { duration }).onAction();
  }
}
