import { Operator } from '../enums/operator.enum';
import { Formula } from './formula.interface';

export interface Term {
  left: Formula;
  right: Formula;
  operator: Operator;
}
