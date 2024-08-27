import { Component, EventEmitter, Output } from '@angular/core';
import { Form, FormsModule } from '@angular/forms';
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
  @Output() formula = new EventEmitter<Formula>();

  constructor(private formulaService: FormulaService) {}

  onInput() {
    console.log(this.formulaService.validateFormula(this.input));

    // if (!this.formulaService.validateFormula(this.input)) {
    //   alert('Invalid Formula');
    //   return;
    // }

    try {
      this.formula.emit(this.formulaService.createFormula(this.input));
    } catch (e) {
      console.log(e);

      alert('Invalid Formula');
    }
  }
}
