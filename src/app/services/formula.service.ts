import { Injectable } from '@angular/core';
import { Formula } from '../core/interfaces/formula.interface';
import { Atom } from '../core/interfaces/atom.interface';
import { Operator } from '../core/enums/operator.enum';
import XRegExp from 'xregexp';

@Injectable({
  providedIn: 'root',
})
export class FormulaService {
  atomRegex = /^-?[A-Z]$/;
  simpleTermRegex = /^\(?-?[A-Z](v|\^|->|<->)-?[A-Z]\)?$/;

  createFormula(formula: string): Formula {
    let resultFormula: Formula = { content: { variable: 'A', negated: false } };

    if (this.atomRegex.test(formula)) {
      if (formula[0] === '-') {
        resultFormula.content = { variable: formula.slice(1), negated: true };
      } else {
        resultFormula.content = { variable: formula, negated: false };
      }

      return resultFormula;
    }

    return resultFormula;
  }

  validateFormula(formula: string): boolean {
    formula = formula.replace(' ', '');

    if (this.atomRegex.test(formula)) return true;
    if (this.simpleTermRegex.test(formula)) return true;

    const matches = XRegExp.matchRecursive(formula, '\\(', '\\)', 'g');

    console.log(formula, matches);

    if (!matches.length) return false;

    let valid = true;
    matches.forEach((match) => {
      valid = valid && this.validateFormula(match);
    });

    return valid;
  }
}
