import { Field, ObjectType, Int } from '@nestjs/graphql';
import { CaseflowIndividuals } from './caseflow_individuals.entity';

@ObjectType()
export class CaseflowIndividualsResponse {
  @Field((type) => [CaseflowIndividuals])
  CaseflowIndividuals: CaseflowIndividuals[];

  @Field((type) => Int)
  totalCount: number;
}
