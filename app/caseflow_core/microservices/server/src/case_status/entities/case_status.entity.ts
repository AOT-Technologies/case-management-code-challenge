import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';

//_____________________Custom Imports_____________________//

import { Cases } from '../../cases/entities/cases.entity';
import { CaseTypes } from '../../case_types/entities/case_type.entity';

@ObjectType()
@Entity()
export class CaseStatuses {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  casetypeid: number;

  @Column({ nullable: true })
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field()
  displayname: string;

  @Column({ nullable: true })
  @Field()
  code: string;

  @ManyToOne(() => CaseTypes, (casetype) => casetype.casestatus)
  @Field(() => CaseTypes, { nullable: true })
  @JoinColumn({ name: 'casetypeid' })
  casestype: CaseTypes;
}
