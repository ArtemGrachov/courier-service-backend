import { Injectable } from '@nestjs/common';

@Injectable()
export class ParametersService {
  private _parameters: Record<string, string>;

  constructor() {
    const rawParameters = process.argv.slice(3);

    this._parameters = rawParameters.reduce((acc, curr) => {
      const [key, value] = curr.split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
  }

  public get parameters() {
    return {
      ...this._parameters,
    };
  }
}

