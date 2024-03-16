import {
  Controller,
  Post,
  Body,
  NotFoundException,
  Query,
  Delete,
} from '@nestjs/common';
import { Get, Patch } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

//_____________________Custom Imports_____________________//

import { CasesService } from './services/cases.service';
import { UpdateCaseInput } from './dto/update-case.input';
import { TransformService } from '../helper/transform.service';

@Controller('cases')
export class CasesController {
  constructor(
    private readonly casesService: CasesService,
    private readonly TransformCase: TransformService,
  ) {}

  //Summary : create a new case.
  //Created By : Don Basil Peter

  @Post()
  async uploadDocument(@Body() body): Promise<any> {
    try {
      const caseInput = this.TransformCase.transformCreateCase(body);
      return this.casesService.createCase(caseInput);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  //Summary : update a existing case by specifing field.
  //Created By : Don Basil Peter

  @Patch()
  async updateDocument(@Body() body): Promise<any> {
    try {
      const field = await this.casesService
        .findOne(parseInt(body.id))
        .catch((err) => {
          throw new HttpException(err.response, HttpStatus.NOT_FOUND);
        });
      if (!field?.clientid) {
        const caseInput = this.TransformCase.transformUpdateCase(body);
        return this.casesService.updateCase(body.id, caseInput);
      } else return new NotFoundException('No case found to update');
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  //Summary : featch a case details by id
  //Created By : Don Basil Peter

  @Get()
  async fetchDocument(@Query() param): Promise<any> {
    try {
      const field = await this.casesService.findOne(param.id).catch((err) => {
        throw new HttpException(err.response, HttpStatus.NOT_FOUND);
      });
      if (!field?.clientid) return field;
      throw new HttpException(
        'The requested case is not found',
        HttpStatus.NOT_FOUND,
      );
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  //Summary : delete a case details by id
  //Created By : Don Basil Peter
  @Delete()
  async deleteDocument(@Query() param): Promise<any> {
    try {
      const field = await this.casesService
        .findOne(parseInt(param.id))
        .catch((err) => {
          throw new HttpException(err.response, HttpStatus.NOT_FOUND);
        });
      if (!field?.clientid) {
        const body = new UpdateCaseInput();
        return this.casesService.updateCase(param.id, body);
      } else return new NotFoundException('No case found to delete');
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
