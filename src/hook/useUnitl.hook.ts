export function useUnitl() {
  const currency = (num: any) => {
    if (num === undefined) return num;
    const str = Number(num).toFixed(2);
    const reg =
      str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
    return str.replace(reg, '$1,');
  };
  return {
    currency,
  };
}
