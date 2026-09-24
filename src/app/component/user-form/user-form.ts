import { Component, inject, } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm {
  private http = inject(HttpClient);

  userName: string = '';
  statusMessage: string = '';
  statusClass: 'success' | 'error' | 'info' | '' = '';

  sendName(): void {
    if (!this.userName.trim()) {
      this.statusClass = 'error';
      this.statusMessage = 'Пожалуйста, введите имя!';
      return;
    }

    this.statusClass = 'info';
    this.statusMessage = 'Отправка...';

    this.http.post('http://localhost:8080/api/send-name', 
      { name: this.userName }, 
      { responseType: 'text' }
    ).subscribe({
      next: (resultText) => {
        this.statusClass = 'success';
        this.statusMessage = resultText;
        this.userName = ''; // Очищаем поле ввода
      },
      error: (error) => {
        console.error('Ошибка:', error);
        this.statusClass = 'error';
        this.statusMessage = error.error || 'Не удалось связаться с сервером. Проверьте, запущен ли Java-проект.';
      }
    });
  }
}