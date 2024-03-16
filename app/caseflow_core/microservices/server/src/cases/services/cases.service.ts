import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

//_____________________Custom Imports_____________________//
import { Cases } from '../entities/cases.entity';
import {casesResponse} from '../entities/cases_response.entity';
import { CreateCaseInput } from '../dto/create-case.input';
import { UpdateCaseInput } from '../dto/update-case.input';
import { FetchArgs } from '../dto/fetch.input';

/**
 *  Service For Cases
 */
@Injectable()
export class CasesService {
  constructor(
    @InjectRepository(Cases) private caseRepository: Repository<Cases>,
  ) {}

  /**
   * Find All Method for Returning All Cases with pagination
   * @param args
   * @returns
   */
  async findAll(
    args: FetchArgs = { skip: 0, take: 5 }): Promise<casesResponse> {
    try {
    const [Cases, totalCount] = await Promise.all([
      this.caseRepository.find({
        take: args.take,
        skip: args.skip,
        order: {
          id: 'DESC',
        },
        relations : ['casestatus','casestatus.casestype','casestype',]
    }),
      this.caseRepository.count(),
    ]);
    return { Cases, totalCount };
  } catch (error) {
    console.log(error);
    throw error;
  }
  }

  /**
   * find last 10 record from cases
   * @returns
   */
  async findAllWithLimit(): Promise<Cases[]> {
    try {
      return this.caseRepository.find({
        take: 10,
        order: {
          id: 'DESC',
        },
        relations : ['casestatus','casestatus.casestype','casestype']
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Create Method For Creating New Cases
   * @param createCaseInput
   * @returns
   */
  // @Roles({ roles: ['manage-account'], mode: RoleMatchingMode.ANY })
  async createCase(createCaseInput: CreateCaseInput): Promise<Cases> {
    try {
      const newCase = this.caseRepository.create(createCaseInput);
      return this.caseRepository.save(newCase);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Find One Method For Returning Specific Case
   * @param id 
   * @returns 
   */
  async findOne(id: number): Promise<Cases> {
    try {
    if (id) {
      const value = await this.caseRepository.findOne({
        where: {
          id: id
        },
        
        relations: [
          'casehistory',
          'casehistory.event',
          'casehistory.event.eventtype',
          'casestatus',
          'casestatus.casestype',
          'casestype',
        ],
        order:{
          casehistory:{
            id:"DESC"
          }
        },
        
      });     
      if (value) return value;

      throw new NotFoundException(`Record cannot find by id ${id}`);
    }
    throw new BadRequestException("request doesn't have any id");
  } catch (err) {
    console.log(err);
  }
  }

  /**
   *  Update Cases
   * @param id 
   * @param updateCaseInput 
   * @returns 
   */
  async updateCase(id: number, updateCaseInput: UpdateCaseInput) {
    try {
    return await this.caseRepository.update(id, updateCaseInput).then(() => {
      return this.findOne(id).catch((err) => {
        throw new HttpException(err.response, HttpStatus.NOT_FOUND);
      });
    });
  } catch (err) {
    console.log(err);
  }
  }
/**
 * method for remove cases
 * @param id 
 * @returns 
 */
  async remove(id: number) {
    try {
    let caseData = await this.caseRepository.findOne({
      where: {
        id: id,
      },
    });
    if (caseData) {
      return await this.caseRepository.update(id,{...caseData})
      .then(data=>{return {status: "success"}})
      .catch(err=> err)
    }
    throw new NotFoundException(`Record cannot find by id ${id}`);
  } catch (err) {
    console.log(err);
  }
  }

  /**
   * method for serach cases
   * @param searchField 
   * @param searchColumn 
   * @returns 
   */
  
   async searchCase(searchField,searchColumn,skip,take,orderBy ='id',orderType: 'ASC' |'DESC' = 'DESC'){
    orderBy = 'table.' + orderBy;
    try{
    if(searchColumn){
      switch(searchColumn){ 
        case 'Description': {
          const [Cases,totalCount] =await this.caseRepository.createQueryBuilder("table")
          .where("LOWER(table.desc) LIKE :title", { title: `%${ searchField.toLowerCase() }%` })
          .andWhere('table.isdeleted = :status', {status:false})
          .orderBy({[orderBy]: orderType})
          .take(take)
          .skip(skip)
          .leftJoinAndSelect('cases.statusid', 'status')
          .getManyAndCount()
          return  {Cases,totalCount};
        }
        default :
         const [Cases,totalCount] = await  (this.caseRepository.createQueryBuilder("table")
        .where("LOWER(table.name) LIKE :title", { title: `%${ searchField.toLowerCase() }%` }) 
        .andWhere('table.isdeleted = :status', {status:false})
        .orderBy({[orderBy]: orderType}).take(take).skip(skip)
        .leftJoinAndSelect('table.casestatus', 'status')
        .leftJoinAndSelect('table.casestype', 'type')
        .getManyAndCount())
        return {Cases,totalCount}
      }
    }
    else{
      return  new HttpException("select a field", HttpStatus.BAD_REQUEST)
    }

    }
    catch(err){
      throw new HttpException("something went wrong", HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }
}

