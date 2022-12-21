import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//_____________________Custom Imports_____________________//
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';
import { Cases } from './cases.entity';
import { CasesResolver } from './cases.resolver';
import { HelpersModule } from 'src/helper/helpers.module';
@Module({
  imports: [TypeOrmModule.forFeature([Cases]), HelpersModule],
  providers: [CasesService, CasesResolver],
  controllers: [CasesController],
})
export class CasesModule {}