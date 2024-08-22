import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormulaService } from '../../services/formula.service';
import { Formula } from '../../interfaces/formula.interface';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  input: string = '';

  constructor(private formulaService: FormulaService) {}

  onInput() {
    let formula: Formula;
    try {
      formula = this.formulaService.createFormula(this.input);
    } catch {}
  }
}
