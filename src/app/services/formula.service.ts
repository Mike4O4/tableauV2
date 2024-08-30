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
        resultFormula.content = {
          variable: formula[1],
          negated: true,
        };
      } else {
        resultFormula.content = { variable: formula, negated: false };
      }

      return resultFormula;
    }

    const matches = this.simpleTermRegex.exec(formula);

    if (matches) {
      let left;
      let right;
      switch (matches[1]) {
        case '^':
          if (formula[0] === '(') {
            if (formula[1] === '-') {
              left = this.createFormula(formula[1] + formula[2]);
              if (formula[4] === '-') {
                right = this.createFormula(formula[4] + formula[5]);
              } else {
                right = this.createFormula(formula[4]);
              }
            } else {
              left = this.createFormula(formula[1]);
              if (formula[3] === '-') {
                right = this.createFormula(formula[3] + formula[4]);
              } else {
                right = this.createFormula(formula[3]);
              }
            }
          } else {
            if (formula[0] === '-') {
              left = this.createFormula(formula[0] + formula[1]);
              if (formula[3] === '-') {
                right = this.createFormula(formula[3] + formula[4]);
              } else {
                right = this.createFormula(formula[3]);
              }
            } else {
              left = this.createFormula(formula[0]);
              if (formula[2] === '-') {
                right = this.createFormula(formula[2] + formula[3]);
              } else {
                right = this.createFormula(formula[2]);
              }
            }
          }

          resultFormula.content = {
            left: left,
            right: right,
            operator: Operator.AND,
          };
          break;

        case 'v':
          if (formula[0] === '(') {
            if (formula[1] === '-') {
              left = this.createFormula(formula[1] + formula[2]);
              if (formula[4] === '-') {
                right = this.createFormula(formula[4] + formula[5]);
              } else {
                right = this.createFormula(formula[4]);
              }
            } else {
              left = this.createFormula(formula[1]);
              if (formula[3] === '-') {
                right = this.createFormula(formula[3] + formula[4]);
              } else {
                right = this.createFormula(formula[3]);
              }
            }
          } else {
            if (formula[0] === '-') {
              left = this.createFormula(formula[0] + formula[1]);
              if (formula[3] === '-') {
                right = this.createFormula(formula[3] + formula[4]);
              } else {
                right = this.createFormula(formula[3]);
              }
            } else {
              left = this.createFormula(formula[0]);
              if (formula[2] === '-') {
                right = this.createFormula(formula[2] + formula[3]);
              } else {
                right = this.createFormula(formula[2]);
              }
            }
          }

          resultFormula.content = {
            left: left,
            right: right,
            operator: Operator.OR,
          };
          break;

        case '->':
          if (formula[0] === '(') {
            if (formula[1] === '-') {
              left = this.createFormula(formula[1] + formula[2]);
              if (formula[5] === '-') {
                right = this.createFormula(formula[5] + formula[6]);
              } else {
                right = this.createFormula(formula[5]);
              }
            } else {
              left = this.createFormula(formula[1]);
              if (formula[4] === '-') {
                right = this.createFormula(formula[4] + formula[5]);
              } else {
                right = this.createFormula(formula[4]);
              }
            }
          } else {
            if (formula[0] === '-') {
              left = this.createFormula(formula[0] + formula[1]);
              if (formula[4] === '-') {
                right = this.createFormula(formula[4] + formula[5]);
              } else {
                right = this.createFormula(formula[4]);
              }
            } else {
              left = this.createFormula(formula[0]);
              if (formula[3] === '-') {
                right = this.createFormula(formula[3] + formula[4]);
              } else {
                right = this.createFormula(formula[3]);
              }
            }
          }

          resultFormula.content = {
            left: left,
            right: right,
            operator: Operator.IMPLIES,
          };
          break;

        case '<->':
          if (formula[0] === '(') {
            if (formula[1] === '-') {
              left = this.createFormula(formula[1] + formula[2]);
              if (formula[6] === '-') {
                right = this.createFormula(formula[6] + formula[7]);
              } else {
                right = this.createFormula(formula[6]);
              }
            } else {
              left = this.createFormula(formula[1]);
              if (formula[5] === '-') {
                right = this.createFormula(formula[5] + formula[6]);
              } else {
                right = this.createFormula(formula[5]);
              }
            }
          } else {
            if (formula[0] === '-') {
              left = this.createFormula(formula[0] + formula[1]);
              if (formula[5] === '-') {
                right = this.createFormula(formula[5] + formula[6]);
              } else {
                right = this.createFormula(formula[5]);
              }
            } else {
              left = this.createFormula(formula[0]);
              if (formula[4] === '-') {
                right = this.createFormula(formula[4] + formula[5]);
              } else {
                right = this.createFormula(formula[4]);
              }
            }
          }

          resultFormula.content = {
            left: left,
            right: right,
            operator: Operator.BICONDITIONAL,
          };
          break;

        default:
          throw new Error('Invalid operator');
      }

      return resultFormula;
    }

    const recMatches = XRegExp.matchRecursive(formula, '\\(', '\\)', 'g');

    console.log(recMatches);

    if (recMatches.length === 1) {
      const leftRegex = /-?[A-Z](v|\^|->|<->)\(.*\)/;
      const rightRegex = /\(.*\)(v|\^|->|<->)-?[A-Z]/;

      const leftMatches = leftRegex.exec(formula);

      if (leftMatches) {
        if (formula[0] === '-') {
        } else {
        }
      }
    } else if (recMatches.length === 2) {
      let op: Operator;
      const diff = formula.length - recMatches[0].length - recMatches[1].length;

      switch (diff) {
        case 7:
          op = Operator.BICONDITIONAL;
          break;
        case 6:
          op = Operator.IMPLIES;
          break;
        case 5:
          let count = 0;
          let index = -1;

          for (let i = 1; i < formula.length; i++) {
            if (formula[i] === '(') {
              count++;
            }
            if (formula[i] === ')') {
              count--;
              if (count === 0) {
                index = i + 1;
              }
            }
          }

          if (formula[index] === 'v') {
            op = Operator.OR;
          } else {
            op = Operator.AND;
          }
          break;
        default:
          throw new Error('Invalid operator');
      }

      resultFormula.content = {
        left: this.createFormula(recMatches[0]),
        right: this.createFormula(recMatches[1]),
        operator: op,
      };
    } else {
      throw new Error('Invalid formula');
    }

    return resultFormula;
  }

  validateFormula(formula: string): boolean {
    formula = formula.replace(' ', '');

    if (this.atomRegex.test(formula)) return true;
    if (this.simpleTermRegex.test(formula)) return true;

    const matches = XRegExp.matchRecursive(formula, '\\(', '\\)', 'g');

    if (!matches.length) return false;

    let valid = true;
    matches.forEach((match) => {
      valid = valid && this.validateFormula(match);
    });

    return valid;
  }
}
