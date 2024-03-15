import { Field, Int, ArgsType } from '@nestjs/graphql';
import { IsInt, IsString, Max, Min } from 'class-validator';

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
  orderBy 

  @Field(() => String)
  @IsString()
  orderType;

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
