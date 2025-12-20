import { Module } from '@nestjs/common';
import { ParametersService } from './services/parameters/parameters.service';

@Module({
  providers: [ParametersService],
  exports: [ParametersService],
})
export class ParametersModule {}
