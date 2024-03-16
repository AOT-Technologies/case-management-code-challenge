import { Field, ObjectType, Int, Directive, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

//_____________________Custom Imports_____________________//

import { CaseHistory } from '../../case_history/entities/case_history.entity';
import { CaseStatuses } from '../../case_status/entities/case_status.entity';
import { CaseTypes } from '../../case_types/entities/case_type.entity';
import { CaseNotes } from 'src/case_notes/entities/case_note.entity';

/**
 * Summary :  Entity Class For External Cases
 * Created By : Akhila U S
 */

@Entity()
@ObjectType()
@Directive('@key(fields:"id")')
export class Cases {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ nullable: true })
  @Field()
  contactid: string;

  @Column()
  @Field()
  clientid: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  issuetype: string;

  @Column({ nullable: true })
  @Field()
  nextreviewdate: Date;

  @Column({ nullable: true })
  @Field()
  status: string;

  @Column({ nullable: true })
  @Field()
  creationdate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  completiondate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastmodificationdate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  archivedate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  startuserid: number;

  @OneToMany(() => CaseHistory, (casehistory) => casehistory.case)
  @Field(() => [CaseHistory], { nullable: true })
  casehistory: CaseHistory[];

  @OneToMany(() => CaseNotes, (casenote) => casenote.case)
  @Field(() => [CaseNotes], { nullable: true })
  casenote: CaseNotes[];
}
