import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { HttpException } from '@nestjs/common/exceptions';

//_____________________Custom Imports_____________________//

import { Cases } from '../entities/cases.entity';
import { casesResponse } from '../entities/cases_response.entity';
import { CasesService } from '../services/cases.service';
import { CreateCaseInput } from '../dto/create-case.input';
import { FetchArgs, FetchCaseDocumentArgs } from '../dto/fetch.input';
import { RemoveCaseArgs, UpdateCaseInput } from '../dto/update-case.input';
import { FetchSearchArgs } from '../dto/fetch-search.input';

/**
 * Resolver for Cases
 */

@Resolver((of) => Cases)
export class CasesResolver {
  constructor(private casesService: CasesService) {}

  //_____________________Query_____________________//
  /**
   * Summary :   Query For Fetching cases by passing id
   * Created By : Akhila U S
   * @param args
   * @returns
   */
  @Query((returns) => Cases, { name: 'getCase' })
  async getCase(@Args() args: FetchCaseDocumentArgs): Promise<Cases> {
    const res = await this.casesService.findOne(args.id)
    return res;
  }

  /**
   * Summary :   Query For Fetching cases by passing arguments
   * Created By : Akhila U S
   * @param args
   * @returns
   */

  @Query((returns) => casesResponse)
  case(@Args() args: FetchArgs): Promise<casesResponse> {
    const output = this.casesService.findAll(args);
    return output;
  }

  /**
   * Summary :   Query For serach cases
   * Created By : Akhila U S
   * @param searchField
   * @param searchColumn
   * @returns
   */
  @Query((returns) => casesResponse)
  Searchcase(@Args() args: FetchSearchArgs): Promise<any> | HttpException {
    return this.casesService.searchCase(
      args.searchField,
      args.searchColumn,
      args.skip,
      args.take,
      args.orderBy,
      args.orderType,
    );
  }

  /**
   * Summary :   Query For find All with limit
   * Created By : Akhila U S
   * @returns
   */
  @Query((returns) => [Cases])
  fetchRecentCase(): Promise<Cases[]> {
    return this.casesService.findAllWithLimit();
  }

  //_____________________Mutation_____________________//

  /**
   * Summary : Mutation for Creating Cases
   * Created By : Akhila U S
   * @param createCaseInput input DTO for creating  Cases
   * @returns
   */
  @Mutation((returns) => Cases)
  createCase(
    @Args('createCaseInput') createCaseInput: CreateCaseInput,
  ): Promise<Cases> {
    return this.casesService.createCase(createCaseInput);
  }

  /**
   * Summary : Mutation for updating Cases
   * Created By : Akhila U S
   * @param updateCaseInput
   * @returns
   */
  @Mutation(() => Cases)
  updateCase(@Args('updateCaseInput') updateCaseInput: UpdateCaseInput) {
    return this.casesService.updateCase(updateCaseInput.id, updateCaseInput);
  }

  /**
   * Summary : Mutation for remove Cases
   * Created By : Akhila U S
   * @param id
   * @returns
   */
  @Mutation(() => Cases)
  removeCase(@Args('removeCaseArgs') removeCaseArgs: RemoveCaseArgs) {
    return this.casesService.remove(removeCaseArgs.id);
  }

  //_____________________Resolver Reference For GraphQL Federation_____________________//

  /**
   * Summary :   Resolver Reference For cases
   * Created By : Akhila U S
   * @returns External Cases
   */

  @ResolveReference()
  resolverefernce(ref: { __typename: number; id: number }) {
    return this.casesService.findOne(ref.id);
  }
}
