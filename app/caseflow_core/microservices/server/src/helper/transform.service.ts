import { Injectable } from '@nestjs/common';

//_____________________Custom Imports_____________________//

import { CreateCaseInput } from 'src/cases/dto/create-case.input';
import { UpdateCaseInput } from 'src/cases/dto/update-case.input';


@Injectable()
export class TransformService {
  // summery : Transform the case api body and create a case database entity
  // Created By : Don Basil Peter
  transformCreateCase = (data) => {
    try {
      const createCaseInput: CreateCaseInput = {
        clientid: data.clientid,
        contactid: data?.contactid,
        issuetype: data?.issuetype,
        nextreviewdate: data?.nextreviewdate,
        status: data?.status,
        creationdate: data?.creationdate,
        completiondate: data?.completiondate,
        lastmodificationdate: data?.lastmodificationdate,
        archivedate: data?.archivedate,
        startuserid: data?.startuserid
      };
      return createCaseInput;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // summery : Transform the case api body and create a case database entity
  // Created By : Don Basil Peter
  transformUpdateCase = (data) => {
    try {
      const createCaseInput: UpdateCaseInput = {
        id: data.id,
        contactid: data?.contactid,
        clientid: data?.clientid,
        status: data?.status,
        issuetype: data?.issuetype,
        creationdate: data?.creationdate,
        completiondate: data?.completiondate,
        lastmodificationdate: data?.lastmodificationdate,
        archivedate: data?.archivedate,
        startuserid: data?.startuserid,
        nextreviewdate: data?.nextreviewdate,
      };
      return createCaseInput;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}
