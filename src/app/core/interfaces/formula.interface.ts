import { Atom } from './atom.interface';
import { Term } from './term.interface';

export interface Formula {
  content: Atom | Term;
  negated: boolean;
}
