import {
  httpGETBolbRequest,
  httpPOSTRequest,
  httpPUTRequest,
} from "../../apiManager/httpRequestHandler";
import API from "../endpoints/index";
// import fs from 'fs';

export const fetchCMISfile = (documentId,DMS,newTab = true) => {
  return (dispatch) => {
    const downloadURL = API.DMS_API + "/dms" + DMS + "/download";
    
    console.warn(downloadURL)
    httpGETBolbRequest(downloadURL, { id: documentId ,"DMS" :DMS})
      .then((response) => {
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data],)
        );

        const link = document.createElement("a");
        if(!newTab){
          link.href = downloadUrl;
          const file_name = response.headers["file_name"];
          link.setAttribute("download", file_name)//any other extension
  
          document.body.appendChild(link);
  
          link.click();
  
          link.remove();
        }
        else{
          let newWindow = window.open('/')
          newWindow.onload = () => {
            newWindow.location = window.URL.createObjectURL(
              new Blob([response.data], {type: response.headers["content_type"]})
            );
        };
        }
        
      })
      .catch((error) => {
        if (error?.response?.data) {
        } else {
        }
      });
  };
};

//uploadCMISfile is used to send and save  files into the cmis server
export const uploadCMISfile = async (file,fileName,description,DMS,metaData) => { 
  console.warn(metaData)
    const uploadURL = API.DMS_API + "/dms"+ DMS + "/upload";
    let formData = {
      "upload": file,
      "name": fileName ? fileName : file.name,
      "nodeType": "cm:content",
      "cm:title": "My text",
      "cm:description": description,
      "relativePath": "Uploads",
      "DMS" : DMS,
      "metaData" : metaData

    };
    let bodyFormData = new FormData(); 
    for (let key in formData) {           //converts the javascript object into FormData type
      bodyFormData.append(key, formData[key]);
    }
    console.log(bodyFormData)

    try{
      let response = await httpPOSTRequest(uploadURL,bodyFormData);
      return response;
    }
    catch(err){
      return err;
    }
  //  return httpPOSTRequest(uploadURL,bodyFormData,)
  //     .then((res) => {
  //       if (res.data) {
  //       } else {
  //       }
  //     })
  //     .catch((error) => {
  //       if (error?.response?.data) {
  //         console.log(error);
  //       } else {
  //       }
  //     });
    }


export const updateCMISdocument = (id,file,fileName,description,DMS) =>{      
    const updateURL = API.DMS_API + "/dms"+ DMS + "/update";
    let formData = {
      "upload": file,
      "id":id,
      "name": fileName ? fileName : file.name,
      "nodeType": "cm:content",
      "cm:title": "My text",
      "cm:description": description,
      "relativePath": "Uploads",
      "majorVersion":true,
      "comment":"test",
      "DMS" : DMS

    };
    let bodyFormData = new FormData();
    for (let key in formData) {
      //converts the javascript object into FormData type
      bodyFormData.append(key, formData[key]);
    }
   return httpPUTRequest(updateURL, bodyFormData)
      .then((res) => {
        if (res.data) {
        } else {
        }
      })
      .catch((error) => {
        if (error?.response?.data) {          
        } else {
        }
      });
  
}
