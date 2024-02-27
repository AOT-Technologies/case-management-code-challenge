import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//Custom -imports//

import { CaseflowContactsService } from './services/caseflow_contacts.service';
import { CaseflowContactsResolver } from './resolvers/caseflow_contacts.resolver';
import { CaseflowContacts } from './entities/caseflow_contacts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CaseflowContacts])],
  providers: [CaseflowContactsResolver, CaseflowContactsService],
})
export class CaseflowContactsModule {}
