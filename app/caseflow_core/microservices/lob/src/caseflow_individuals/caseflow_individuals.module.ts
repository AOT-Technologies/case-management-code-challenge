import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Custom -imports//

import { CaseflowIndividualsService } from './services/caseflow_individuals.service';
import { CaseflowIndividualsResolver } from './resolvers/caseflow_individuals.resolver';
import { CaseflowIndividuals } from './entities/caseflow_individuals.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaseflowIndividuals])],
  providers: [CaseflowIndividualsResolver, CaseflowIndividualsService],
})
export class CaseflowIndividualsModule {}
