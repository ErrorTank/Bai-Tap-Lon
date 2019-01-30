export const sendRequest = ({url, type, data, headers, beforeSend}) => new Promise((resolve, reject) => {
  let ajaxConfig = {
    url,
    contentType: "application/json",
    type,
    beforeSend: (xhr) => {
      if (headers && Object.keys(headers).length) {
        Object.keys(headers).map((each) => {
          let val = typeof headers[each] === "function"  ? headers[each]() : headers[each];
          xhr.setRequestHeader(each, val)
        });
      }
      if(beforeSend){
        beforeSend(xhr);
      }
    },
    success: (data) => {
      resolve(data);
    },
    error: (err) => {
      reject(err);
    }
  };


  if (data) {
    ajaxConfig.data = JSON.stringify(data);
  }
  $.ajax(ajaxConfig);

});
