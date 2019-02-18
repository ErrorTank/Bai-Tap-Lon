const getBase64=(file)=>new Promise((resolve)=>{
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    resolve({file, src:reader.result, fileID: file.lastModified});
  };
});

export{
  getBase64,
}