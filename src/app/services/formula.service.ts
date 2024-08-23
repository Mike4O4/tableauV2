import { Injectable } from '@angular/core';
import { Formula } from '../core/interfaces/formula.interface';
import { Atom } from '../core/interfaces/atom.interface';

import { Operator } from '../core/enums/operator.enum';

@Injectable({
  providedIn: 'root',
})
export class FormulaService {
  atomRegex = /^-?[A-Z]$/;
  simpleTermRegex = /^\(-?[A-Z](v|\^|->|<->)-?[A-Z]\)$/;

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
    if (this.simpleTermRegex.test(formula)) return true;

    let parts: string[] = [];
    let part: string = '';
    let count = 0;
    for (let i = 0; i < formula.length; i++) {
      if (formula[i] === '(') {
        count++;
      } else if (formula[i] === ')' && count > 1) {
        part += formula[i];
        parts.push(part);
        part = '';
        count--;
        if (count < 0) return false;
      }
      if (count == 2) {
        part += formula[i];
      }
    }

    let valid = true;

    if (parts[0]) valid = valid && this.validateFormula(parts[0]);
    if (parts[1]) valid = valid && this.validateFormula(parts[1]);

    return valid;
  }
}
