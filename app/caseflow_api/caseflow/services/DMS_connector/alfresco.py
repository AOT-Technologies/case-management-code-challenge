
from datetime import datetime
from typing import Dict
from caseflow.utils.enums import DMSCode


class Alfresco:
    """This class manages the connecton of  alfresco system with the API"""
    @staticmethod
    def doc_upload(document,content_data) -> Dict:
        #converts the document into standard form
        try :
            doc_modified_date = document['entry']['modifiedAt']
            doc_created_date = document['entry']['createdAt']
            doc_modifiedObj = datetime.strptime(doc_modified_date, '%Y-%m-%dT%H:%M:%S.%f+0000')
            doc_createdObj = datetime.strptime(doc_created_date, '%Y-%m-%dT%H:%M:%S.%f+0000')
            formatted_document = {
                    "doc_id" : document['entry']['id'],
                    "doc_name" : document['entry']['name'],
                    "doc_dmsname" : document['entry']['name'],
                    "doc_type" : document['entry']['content']['mimeType'],
                    "doc_size" : document['entry']['content']['sizeInBytes'],
                    "doc_description" : document['entry']['properties']['cm:description'],
                    "version" : document['entry']['properties']['cm:versionLabel'],
                    "doc_modified" : doc_modifiedObj.strftime("%Y-%m-%dT%H:%M:%S"),
                    "doc_created" : doc_createdObj.strftime("%Y-%m-%dT%H:%M:%S"),
                    "doc_download_url" : "nil",
                    "dms_provider" : DMSCode.DMS01.value,
                    "dms_content":content_data
                    
            }
            return formatted_document
        except Exception as error:
            print('doc_upload failed to run :' + repr(error))


    @staticmethod
    def doc_update(document) -> Dict:
        #converts the document into standard form
        try :
            doc_modified_date=document['entry']['modifiedAt']
            doc_modifiedObj = datetime.strptime(doc_modified_date, '%Y-%m-%dT%H:%M:%S.%f+0000')

            formatted_document = {

                    "doc_name" : document['entry']['name'],
                    "doc_type" : document['entry']['content']['mimeType'],
                    "doc_size" : document['entry']['content']['sizeInBytes'],
                    "doc_description" : document['entry']['properties']['cm:description'],
                    "version" : document['entry']['properties']['cm:versionLabel'],
                    "doc_modified_date" : document['entry']['modifiedAt'],
                    "doc_modified" : doc_modifiedObj.strftime("%Y-%m-%dT%H:%M:%S"),
                    "doc_dmsname" : document['entry']['name'],

            }
            return formatted_document

        except Exception as error:
            print('doc_update failed to run :' + repr(error))