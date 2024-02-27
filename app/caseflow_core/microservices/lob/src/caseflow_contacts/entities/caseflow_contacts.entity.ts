import { ObjectType, Field, Int, ID, Directive } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';



@Entity()
@ObjectType()
export class CaseflowContacts {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  firstname: String;

  @Column({ nullable: true })
  @Field( { nullable: true })
  lastname: String;

  @Column({ nullable: true })
  @Field({ nullable: true })
  phonenumber?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  email?: String;

  @Column({ nullable: true })
  @Field({ nullable: true })
  dateofbirth?: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  address?: String;

  @Column({ nullable: true })
  @Field({ nullable: true })
  createdat?: Date;
}
