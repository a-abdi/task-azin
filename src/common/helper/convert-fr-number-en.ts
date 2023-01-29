const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
export const convertToEn = (str: string) =>
{
  for(let i=0; i<10; i++)
  {
    const strNumber: string = ""+i;
    str = str.replace(persianNumbers[i], strNumber);
  }
  
  return str;
};