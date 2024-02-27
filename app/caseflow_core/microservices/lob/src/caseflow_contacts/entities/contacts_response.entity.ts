import { Field, ObjectType, Int } from '@nestjs/graphql';
import { CaseflowContacts } from './caseflow_contacts.entity';

@ObjectType()
export class CaseflowContactsResponse {
  @Field((type) => [CaseflowContacts])
  CaseflowContacts: CaseflowContacts[];

  @Field((type) => Int)
  totalCount: number;
}
