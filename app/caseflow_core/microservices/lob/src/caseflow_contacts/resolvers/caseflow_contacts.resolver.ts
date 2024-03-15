import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FetchArgs } from '../dto/fetch.input';
import { HttpException } from '@nestjs/common/exceptions';

//Custom - imports //

import { FetchSearchArgs } from '../dto/fetch-search.input';
import { CaseflowContactsService } from '../services/caseflow_contacts.service';
import { CaseflowContactsResponse } from '../entities/contacts_response.entity';
import { CaseflowContacts } from '../entities/caseflow_contacts.entity';
import { CreateCaseflowContactsInput } from '../dto/create-caseflow-contacts.input';
import { UpdateCaseflowContactsInput } from '../dto/update-caseflow-contacts.input';

@Resolver(() => CaseflowContacts)
export class CaseflowContactsResolver {
  constructor(private readonly caseflowContactsService: CaseflowContactsService) {}

  @Query(() => CaseflowContacts, { name: 'getContactsById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.caseflowContactsService.findById(id);
  }

  @Query((returns) => CaseflowContactsResponse, { name: 'getContactsList' })
  getContactsList(@Args() args: FetchArgs): Promise<CaseflowContactsResponse> {
    const output = this.caseflowContactsService.findAll(args);
    return output;
  }

  @Query((returns) => CaseflowContactsResponse, { name: 'searchCaseflowContacts' })
  searchCaseflowContacts(
    @Args() args: FetchSearchArgs,
  ): Promise<any> | HttpException {
    return this.caseflowContactsService.searchCaseflowContacts(
      args.searchField,
      args.searchColumn,
      args.skip,
      args.take
    );
  }

  @Mutation(() => CaseflowContacts, { name: 'createCaseflowContacts' })
  createCaseflowContacts(
    @Args('CreateCaseflowContactsInput')
    CreateCaseflowContactsInput: CreateCaseflowContactsInput,
  ) {
    return this.caseflowContactsService.createCaseflowContacts(CreateCaseflowContactsInput);
  }

  @Mutation(() => CaseflowContacts, { name: 'updateCaseflowContacts' })
  updateCaseflowContacts(
    @Args('updateCaseflowContactsInput')
    updateCaseflowContactsInput: UpdateCaseflowContactsInput,
  ) {
    return this.caseflowContactsService.updateCaseflowContacts(
      updateCaseflowContactsInput.id,
      updateCaseflowContactsInput,
    );
  }

  @Mutation(() => CaseflowContacts, { name: 'removeCaseflowContacts' })
  removeCaseflowContacts(@Args('id') id: number) {
    return this.caseflowContactsService.remove(id);
  }
}
