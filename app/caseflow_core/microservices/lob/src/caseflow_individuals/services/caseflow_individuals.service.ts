import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

//Custom - imports //
import { FetchArgs } from '../dto/fetch.input';
import { CaseflowIndividuals } from '../entities/caseflow_individuals.entity';
import { CaseflowIndividualsResponse } from '../entities/individuals_response.entity';
import { CreateCaseflowIndividualsInput } from '../dto/create-caseflow-individuals.input';
import { UpdateCaseflowIndividualsInput } from '../dto/update-caseflow-individuals.input';

@Injectable()
export class CaseflowIndividualsService {
  constructor(
    @InjectRepository(CaseflowIndividuals)
    private caseflowIndividualsRepository: Repository<CaseflowIndividuals>,
  ) {}

  async findById(id: number): Promise<CaseflowIndividuals> {
    try {
      if (id) {
        const value = await this.caseflowIndividualsRepository.findOne({
          where: {
            id: id,
          },
        });
        if (value) return value;
        throw new NotFoundException(`Record cannot find by id ${id}`);
      }
      throw new BadRequestException("request doesn't have any id");
    } catch (error) {
      return error;
    }
  }

  async findAll(
    args: FetchArgs = { skip: 0, take: 5 },
  ): Promise<CaseflowIndividualsResponse> {
    try {
      const [CaseflowIndividuals, totalCount] = await Promise.all([
        this.caseflowIndividualsRepository.find({
          take: args.take,
          skip: args.skip,
          order: {
            id: 'DESC',
          },
        }),
        this.caseflowIndividualsRepository.count(),
      ]);
      return { CaseflowIndividuals, totalCount };
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async searchCaseflowIndividuals(
    searchField,
    searchColumn,
    skip,
    take,
    fromDate,
    toDate,
  ) {
    try {
      if (fromDate === '') fromDate = '2000-01-01';

      if (searchColumn) {
        if (searchField.length !== 0) {
          switch (searchColumn) {
            case 'firstname': {
              const [CaseflowIndividuals, totalCount] = await this.caseflowIndividualsRepository
                .createQueryBuilder('table')
                .where('table.firstname = :firstname', {
                  firstname: searchField,
                })
                .andWhere('table.createdAt >= :start_at', {
                  start_at: fromDate,
                })
                .andWhere('table.createdAt <= :end_at', { end_at: toDate })

                .orderBy({ 'table.id': 'DESC' })
                .take(take)
                .skip(skip)
                .getManyAndCount();
              return { CaseflowIndividuals, totalCount };
            }
            default:
              const [CaseflowIndividuals, totalCount] = await this.caseflowIndividualsRepository
                .createQueryBuilder('table')
                .andWhere('table.createdAt >= :start_at', {
                  start_at: fromDate,
                })
                .andWhere('table.createdAt <= :end_at', { end_at: toDate })
                .orderBy({ 'table.id': 'DESC' })
                .take(take)
                .skip(skip)
                .getManyAndCount();
              return { CaseflowIndividuals, totalCount };
          }
        } else {
          const [CaseflowIndividuals, totalCount] = await this.caseflowIndividualsRepository
            .createQueryBuilder('table')
            .andWhere('table.createdAt >= :start_at', { start_at: fromDate })
            .andWhere('table.createdAt <= :end_at', { end_at: toDate })
            .orderBy({ 'table.id': 'DESC' })
            .take(take)
            .skip(skip)

            .getManyAndCount();
          return { CaseflowIndividuals, totalCount };
        }
      } else {
        return new HttpException('select a field', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      return new HttpException(
        'something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createCaseflowIndividuals(
    CreateCaseflowIndividualsInput: CreateCaseflowIndividualsInput,
  ): Promise<CaseflowIndividuals> {
    try {
      const newCaseflowIndividual = this.caseflowIndividualsRepository.create(
        CreateCaseflowIndividualsInput,
      );
      return this.caseflowIndividualsRepository.save(newCaseflowIndividual);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async updateCaseflowIndividuals(
    id: number,
    updateCaseflowIndividualsInput: UpdateCaseflowIndividualsInput,
  ): Promise<CaseflowIndividuals> {
    try {
      delete updateCaseflowIndividualsInput.id;
      return await this.caseflowIndividualsRepository
        .update(id, updateCaseflowIndividualsInput)
        .then(() => {
          return this.findById(id).catch((err) => {
            throw new HttpException(err.response, HttpStatus.NOT_FOUND);
          });
        });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async remove(id: number) {
    try {
      let caseData = this.findById(id);
      if (caseData) {
        let ret = await this.caseflowIndividualsRepository.delete(id);
        if (ret.affected === 1) {
          return caseData;
        }
      }
      throw new NotFoundException(`Record cannot find by id ${id}`);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
