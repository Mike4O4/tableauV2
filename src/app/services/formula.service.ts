import { Injectable } from '@angular/core';
import { Formula } from '../core/interfaces/formula.interface';
import { Atom } from '../core/interfaces/atom.interface';

import { Operator } from '../core/enums/operator.enum';

@Injectable({
  providedIn: 'root',
})
export class FormulaService {
  atomRegex = /^-?[A-Z]$/;

  createFormula(formula: string): Formula {
    let resultFormula: Formula;

    if (this.atomRegex.test(formula)) {
      let atom: Atom;
      if (formula[0] === '-') {
        atom = {
          variable: formula[1],
          negated: true,
        };
      } else {
        atom = {
          variable: formula[0],
          negated: false,
        };
      }
      resultFormula = {
        content: atom,
      };
    } else {
      const regex = /^\((.*)(v|\^|->|<->)(.*)\)$/;
      const matches = regex.exec(formula);
      const left = this.createFormula(matches![1]);
      const right = this.createFormula(matches![3]);
      const operator = matches![2] as Operator;
      resultFormula = {
        content: { left, right, operator },
      };
    }

    return resultFormula;
  }

  validateFormula(formula: string): boolean {
    formula = formula.replace(' ', '');

    if (this.atomRegex.test(formula)) return true;

    const regex = /^\((.*)(v|\^|->|<->)(.*)\)$/;

    if (!regex.test(formula)) return false;

    const matches = regex.exec(formula);
    let valid = true;

    valid = valid && this.validateFormula(matches![1]);
    valid = valid && this.validateFormula(matches![3]);

    return valid;
  }
}
