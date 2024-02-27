import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FetchArgs } from '../dto/fetch.input';
import { HttpException } from '@nestjs/common/exceptions';

//Custom - imports //

import { FetchSearchArgs } from '../dto/fetch-search.input';
import { CaseflowIndividualsService } from '../services/caseflow_individuals.service';
import { CaseflowIndividualsResponse } from '../entities/individuals_response.entity';
import { CaseflowIndividuals } from '../entities/caseflow_individuals.entity';
import { CreateCaseflowIndividualsInput } from '../dto/create-caseflow-individuals.input';
import { UpdateCaseflowIndividualsInput } from '../dto/update-caseflow-individuals.input';

@Resolver(() => CaseflowIndividuals)
export class CaseflowIndividualsResolver {
  constructor(private readonly caseflowIndividualsService: CaseflowIndividualsService) {}

  @Query(() => CaseflowIndividuals, { name: 'getIndividualsById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.caseflowIndividualsService.findById(id);
  }

  @Query((returns) => CaseflowIndividualsResponse, { name: 'getIndividualsList' })
  getIndividualsList(@Args() args: FetchArgs): Promise<CaseflowIndividualsResponse> {
    const output = this.caseflowIndividualsService.findAll(args);
    return output;
  }

  @Query((returns) => CaseflowIndividualsResponse, { name: 'searchCaseflowIndividuals' })
  searchCaseflowIndividuals(
    @Args() args: FetchSearchArgs,
  ): Promise<any> | HttpException {
    return this.caseflowIndividualsService.searchCaseflowIndividuals(
      args.searchField,
      args.searchColumn,
      args.skip,
      args.take,
      args.fromDate,
      args.toDate,
    );
  }

  @Mutation(() => CaseflowIndividuals, { name: 'createCaseflowIndividuals' })
  createCaseflowIndividuals(
    @Args('CreateCaseflowIndividualsInput')
    CreateCaseflowIndividualsInput: CreateCaseflowIndividualsInput,
  ) {
    return this.caseflowIndividualsService.createCaseflowIndividuals(CreateCaseflowIndividualsInput);
  }

  @Mutation(() => CaseflowIndividuals, { name: 'updateCaseflowIndividuals' })
  updateCaseflowIndividuals(
    @Args('updateCaseflowIndividualsInput')
    updateCaseflowIndividualsInput: UpdateCaseflowIndividualsInput,
  ) {
    return this.caseflowIndividualsService.updateCaseflowIndividuals(
      updateCaseflowIndividualsInput.id,
      updateCaseflowIndividualsInput,
    );
  }

  @Mutation(() => CaseflowIndividuals, { name: 'removeCaseflowIndividuals' })
  removeCaseflowIndividuals(@Args('id') id: number) {
    return this.caseflowIndividualsService.remove(id);
  }
}
