import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // ngIf example
  isVisible: boolean = true;
  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  // ngFor example
  students: string[] = ['Aayan', 'Alice', 'Bob', 'Charlie'];

  // ngSwitch example
  selectedSubject: string = 'Math';
  setSubject(subject: string): void {
    this.selectedSubject = subject;
  }

  // ngStyle example
  isHighlight: boolean = false;
  toggleHighlight(): void {
    this.isHighlight = !this.isHighlight;
  }

  // ngClass example
  isActive: boolean = false;
  toggleActive(): void {
    this.isActive = !this.isActive;
  }
}
