import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { NumericArrayExpected } from './numeric-array-expected.exception';

interface IOptions {
  optional?: boolean;
}

@Injectable()
export class ParseIntArrayPipe implements PipeTransform<string[], number[] | undefined> {
  optional = false;

  constructor({ optional }: IOptions = {}) {
    this.optional = optional ?? false;
  }

  transform(value: any, { data }: ArgumentMetadata) {
    try {
      if (value == null) {
        if (!this.optional) {
          throw new NumericArrayExpected();
        }

        return value;
      }

      if (!Array.isArray(value)) {
        value = [value];
      }

      const output: number[] = [];

      for (let i = 0; i < value.length; i++) {
          const item = value[i];
          const numItem = +item;

          if (isNaN(numItem)) {
            continue;
          }

          output.push(numItem);
      }

      if (!output.length && !this.optional) {
        throw new NumericArrayExpected();
      }

      return output;
    } catch (err) {
      if (this.optional) {
        return;
      }

      throw err;
    }
  }
}
