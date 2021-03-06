const formatMoney = function formatMoney(money, fix = 0) {
  let str = Number(money).toFixed(fix).toString();
  let [relative, fixed] = str.includes('.') ? str.split(".") : [str, null];
  let spliceStrPaths = (total, str) => {
    if(str.length>3){
      return spliceStrPaths([str.slice(str.length - 3),...total], str.slice(0, str.length - 3))
    }
    return [str.slice(0, str.length), ...total]
  };
  let paths = spliceStrPaths([],relative);
  return paths.join(",")+ (fixed ? ("."+ fixed) : "");
};

export {
  formatMoney
}