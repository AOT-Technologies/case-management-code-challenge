import { Field, Int, ArgsType } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';

@ArgsType()
export class FetchArgs {
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
