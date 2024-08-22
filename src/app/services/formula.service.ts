import { Injectable } from '@angular/core';
import { Formula } from '../interfaces/formula.interface';

@Injectable({
  providedIn: 'root',
})
export class FormulaService {
  createFormula(formula: string): Formula {
    if (this.validateFormula(formula)) {
      const formula: Formula = {};

      return formula;
    } else {
      throw new Error('Invalid formula');
    }
  }

  validateFormula(formula: string): boolean {
    return true;
  }
}
