import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

//_____________________Custom Imports_____________________//

import { Cases } from 'src/cases/entities/cases.entity';
import { CaseStatuses } from 'src/case_status/entities/case_status.entity';

@ObjectType()
@Entity()
export class CaseTypes {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field()
  displayname: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  caseextrafields: number | null;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lobfields: number | null;

  @Column({ nullable: true })
  @Field()
  code: number;

  @Column({ nullable: true })
  @Field()
  displaylocations: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  formid: string | null;

  @Column({ nullable: true })
  @Field({ nullable: true })
  searchterm: string | null;

  @OneToMany(() => CaseStatuses, (casestatuses) => casestatuses.casestype)
  @Field(() => [CaseStatuses], { nullable: true })
  casestatus: CaseStatuses[];

}
