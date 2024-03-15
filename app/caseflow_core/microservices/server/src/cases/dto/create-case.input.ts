import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

/**
 * Summary :  Create input DTO for Cases
 * Created By : Akhila U S
 */
@InputType()
export class CreateCaseInput {
 
  @Field()
  @IsString()
  @IsNotEmpty()
  clientid: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  contactid: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  status: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  issuetype: string;

  @Field({ nullable:true })
  nextreviewdate: Date;

  @Field({ nullable: true })
  completiondate: Date;

  @Field({ nullable: true })
  lastmodificationdate: Date;

  
  @Field({ nullable: true })
  creationdate: Date;

  @Field({ nullable: true })
  archivedate: Date;

  @Field((type) => Int, { nullable: true })
  startuserid: number;

}
