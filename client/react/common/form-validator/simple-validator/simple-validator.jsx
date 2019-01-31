
export const simpleValidator = (schema) => {
  return (data) => {
    let wrongs = [];
    let dataKeys = Object.keys(data);
    for(let item of dataKeys){
      if(schema.hasOwnProperty(item)){
        let value = data[item];
        let validators = schema[item].arr;
        for(let vld of validators){
          let res = vld(value);
          if(!res.result){
            wrongs.push({key: item, msg: res.msg(schema[item].label)});
            break;
          }
        }
      }


    }
    return {
      validateComp(render, key){
        return render(wrongs.find(err => err.key === key))
      },
      getInvalids(){
        return wrongs;
      }
    }
  }
};
