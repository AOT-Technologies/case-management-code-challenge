import { Field, Int, ArgsType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

@ArgsType()
export class FetchSearchArgs {
  @Field(() => String)
  @IsString()
  searchField;

  @Field(() => String)
  @IsString()
  searchColumn;

  @Field(() => String)
  @IsString()
  fromDate;

  @Field(() => String)
  @IsString()
  toDate;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  skip = 0;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(50)
  take = 25;
}
