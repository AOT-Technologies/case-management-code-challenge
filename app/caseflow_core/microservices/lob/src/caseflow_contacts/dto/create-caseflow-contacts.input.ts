import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateCaseflowContactsInput {
  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  firstname?: String;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  lastname?: String;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  category?: String;

  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty()
  phonenumber?: number;

  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty()
  age?: number;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  email?: String;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  address?: String;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  region?: String;

  @Field({ nullable: true })
  otherregion?: String;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  city?: String;

  @Field({ nullable: true })
  @IsDate()
  @IsNotEmpty()
  createdat?: Date;
}
