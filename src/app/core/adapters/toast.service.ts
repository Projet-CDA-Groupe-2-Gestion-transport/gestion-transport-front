import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(
    private messageService: MessageService
  ) {
  }

  message(severity: string, summary: string, message: string, icon: string){
    this.messageService.add({
      severity,
      summary,
      detail: message,
      icon
    });
  }

  success(title: string, description: string){
    this.messageService.add({severity: 'success', summary: title, detail: description})
  }

  error(title: string, description: string){
    this.messageService.add({severity: 'error', summary: title, detail: description})
  }
}
