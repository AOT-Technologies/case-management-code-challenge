import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//_____________________Custom Imports_____________________//
import { CreateDocumentInput } from '../dto/create-document.input';
import { CaseDocuments } from '../entities/documents.entity';
import { UpdateDocumentInput } from '../dto/update-documet.input';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { FetchArgs } from '../dto/fetch-args.input';
import { caseDocumentResponse } from '../entities/case_document_response.entity';
import { VersionsService } from 'src/versions/services/versions.service';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(CaseDocuments)
    private documentRepository: Repository<CaseDocuments>,
    private versionService: VersionsService,
  ) {}

  async findAll(): Promise<CaseDocuments[]> {
    try {
      return this.documentRepository.find({
        where: {
          isdeleted: false,
        },
        relations: ['versions'],
        order: {
          id: 'DESC',
        },
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async createDocument(
    createDocumentInput: CreateDocumentInput,
  ): Promise<CaseDocuments> {
    try {
      const newCase = this.documentRepository.create(createDocumentInput);
      const docData = await this.documentRepository.save(newCase);
      const documentid = docData?.id;
      if (docData && docData?.id) {
        const versiondetails = await this.versionService.findDocument(
          documentid,
        );
        const versionNumber =
          versiondetails && versiondetails?.versions
            ? versiondetails?.versions
            : 0;
        const versionData = {
          docid: docData?.id,
          documentid: docData?.latestversion,
          versions: versionNumber ? versionNumber + 1 : 1,
          creationdate: new Date(),
          modificationdate: new Date(),
        };
        const data = await this.versionService.create(versionData);
      } else {
        throw new HttpException(
          'Error in doc upload',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return docData;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findOne(id: number): Promise<CaseDocuments> {
    try {
      return await this.documentRepository.findOne({
        where: {
          id: id,
        },
        order: {
          id: 'DESC',
        },
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async update(id: number, updateCaseInput: UpdateDocumentInput) {
    try {
      return this.documentRepository
        .update(id, updateCaseInput)
        .then(() => this.findOne(id))
        .catch((e) => {
          console.error(e.message);
          throw new HttpException(
            'Error in document update',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async remove(id: number) {
    try {
      let caseData = this.documentRepository.findOne({
        where: {
          id: id,
        },
      });
      if (caseData) {
        let ret = await this.documentRepository.delete(id);
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

  async forCases(args: FetchArgs, id: number): Promise<caseDocumentResponse> {
    try {
      const [CaseDocuments, totalCount] = await Promise.all([
        this.documentRepository.find({
          relations: ['versions'],
          take: args.take,
          skip: args.skip,
          where: { caseId: id, isdeleted: false },
          order: {
            id: 'DESC',
            versions: {
              id: 'DESC',
            },
          },
        }),
        this.documentRepository.count({
          where: { caseId: id, isdeleted: false },
        }),
      ]);
      return { CaseDocuments, totalCount };
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async searchCaseDocument(
    searchField,
    searchColumn,
    orderBy = 'id',
    orderType: 'ASC' | 'DESC' = 'DESC',
    skip,
    take,
  ) {
    orderBy = 'table.' + orderBy;
    try {
      if (searchColumn) {
        switch (searchColumn) {
          case 'Description': {
            const [CaseDocuments, totalCount] = await this.documentRepository
              .createQueryBuilder('table')
              .where('LOWER(table.desc) LIKE :title', {
                title: `%${searchField.toLowerCase()}%`,
              })
              .orderBy({ [orderBy]: orderType })
              .andWhere('table.isdeleted =:isDeleted', { isDeleted: false })
              .leftJoinAndSelect('table.versions', 'versions')
              .orderBy('table.id', 'DESC')
              .addOrderBy('versions.id', 'DESC')
              .take(take)
              .skip(skip)
              .getManyAndCount();

            return { CaseDocuments, totalCount };
          }
          default:
            const [CaseDocuments, totalCount] = await this.documentRepository
              .createQueryBuilder('table')
              .where('LOWER(table.name) LIKE :title', {
                title: `%${searchField.toLowerCase()}%`,
              })
              .andWhere('table.isdeleted =:isDeleted', { isDeleted: false })
              .leftJoinAndSelect('table.versions', 'versions')
              .orderBy({ [orderBy]: orderType })
              .addOrderBy('versions.id', 'DESC')
              .take(take)
              .skip(skip)
              .getManyAndCount();
            return { CaseDocuments, totalCount };
        }
      } else {
        return new HttpException('select a field', HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      console.log(err);
      return new HttpException(
        'something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
