import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InputComponent } from './input/input.component';
import { OutputComponent } from './output/output.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatCardModule, InputComponent, OutputComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  outputGenerated: boolean = false;
}
