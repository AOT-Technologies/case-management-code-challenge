import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
/**
 * Summary :  DTO for updating Cases
 * Created By : Akhila U S
 */
@InputType()
export class UpdateCaseInput {
  @Field((type) => Int)
  @IsNumber()
  id: number;

  @Field((type) => Int, { nullable: true })
  lobid: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  @IsString()
  desc: string;

  @Field((type) => Int)
  @IsNumber()
  @IsNotEmpty()
  statusid: number;

  @Field({ nullable: true })
  typeid: number;

  @Field((type) => [Int], { nullable: true })
  linkedcases: number[];

  @Field({ defaultValue: new Date() })
  creationdate: Date;

  @Field({ nullable: true })
  completiondate: Date;

  @Field({ nullable: true, defaultValue: new Date() })
  lastmodificationdate: Date;

  @Field({ nullable: true })
  penduntildate: Date;

  @Field({ nullable: true })
  archivedate: Date;

  @Field((type) => Int, { nullable: true })
  startuserid: number;

  @Field((type) => Int, { nullable: true })
  currentownerid: number;

  @Field((type) => [Int], { nullable: true })
  involvedparties: number[];

  @Field({ defaultValue: false, nullable: true })
  isdeleted: boolean;

  @Field({ nullable: true })
  lobcaseid: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  individualName: string;
}

@InputType()
export class RemoveCaseArgs {
  @Field(() => Int)
  @IsInt()
  id;

  
}
