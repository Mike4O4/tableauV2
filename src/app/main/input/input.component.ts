import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormulaService } from '../../services/formula.service';
import { Formula } from '../../core/interfaces/formula.interface';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [MatInputModule, FormsModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  input: string = '';
  valid = true;

  constructor(private formulaService: FormulaService) {}

  onInput() {
    if (!this.formulaService.validateFormula(this.input)) {
      alert('Invalid Formula');
      return;
    }
    let formula: Formula;
    formula = this.formulaService.createFormula(this.input);
    console.log(formula);
  }
}
