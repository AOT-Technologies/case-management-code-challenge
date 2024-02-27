import { InputType, Field, Int } from '@nestjs/graphql';
import {  IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateCaseflowContactsInput {
  @Field((type) => Int)
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  firstname?: String;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  lastname?: String;

  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty()
  phonenumber?: number;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  email?: String;

  @Field({ nullable: true })
  @IsDate()
  @IsNotEmpty()
  dateofbirth?: Date;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  address?: String;

  @Field({ nullable: true })
  @IsDate()
  @IsNotEmpty()
  createdat?: Date;
}
