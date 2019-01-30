import {sendRequest} from "./ajax-config";
import forIn from "lodash/forIn";

export const apiFactory = {
  createApi: ({hostURL, beforeSend}) => {
    let headers = {

    };
    const withPayload = method => (url, data) => {
      return sendRequest({
        url: hostURL + url,
        data,
        type: method,
        beforeSend,
        headers
      });
    };
    const withoutPayload = method => url => {
      return sendRequest({
        url: hostURL + url,
        type: method,
        beforeSend,
        headers
      });
    };

    return {
      addHeader: (key, getHeader) => {
        headers[key] = getHeader;
      },
      get: withoutPayload("GET"),
      post: withPayload("POST"),
      put: withPayload("PUT"),
      delete: withoutPayload("DELETE"),
      downloadStream(url) {
        window.open(hostURL + url);
      },
      postMultipart: (url, data) => {
        let formData = new FormData();
        forIn(data, (value, key)=>{
          if (value != null) {
            formData.append(key, value);
          }
        });

        return new Promise((resolve, reject)=>{
          $.ajax({
            url: hostURL + url,
            type: 'POST',
            beforeSend: (xhr) => {
              if (headers && headers.length) {
                headers.map(({key, content}) => xhr.setRequestHeader(key, content));
              }
              if(beforeSend){
                beforeSend(xhr);
              }
            },
            data: formData,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: (data) => {
              resolve(data);
            },
            error: (resp, status, error) => {
              reject(error);
            }
          });
        });
      },
    }
  }
};
