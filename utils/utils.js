function removeCode(str) {
    let i = 0;
    const regexToRmCode = /```[\s\S]*?```/g;
    return str.replace(regexToRmCode, `some-code`).split("some-code");
  }
  
  function getCodesFromString(str) {
    const regexToRmContent = /```(\w+)\n([\s\S]+?)```/g;
    let match;
    const codes = [];
    while ((match = regexToRmContent.exec(str)) !== null) {
      const language = match[1];
      const code = match[2];
      codes.push({
        language,
        code,
      });
    }
    return codes;
  }
  
  export function parseCode(str ) {
    return {
      withoutCodeArr: removeCode(str),
      codesArr: getCodesFromString(str),
    };
  }

  export function getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function capitalize(string){
  if(string.length > 0){
    return string[0].toUpperCase().concat(string.slice(1));
  }
  return string;
}

export function colorsInBetween(hex1, hex2, steps){
  const rgb1 = [Number(`0x${hex1.slice(0,2)}`), Number(`0x${hex1.slice(2,4)}`), Number(`0x${hex1.slice(4,6)}`)];
  const rgb2 = [Number(`0x${hex2.slice(0,2)}`), Number(`0x${hex2.slice(2,4)}`), Number(`0x${hex2.slice(4,6)}`)];
  const colors = [];
  for (let i = 1; i <= steps ; i ++){
    let red = Math.ceil(((rgb1[0] + rgb2[0]) * (i / steps))).toString(16);
    let green = Math.ceil(((rgb1[1] + rgb2[1]) * (i / steps))).toString(16);
    let blue = Math.ceil(((rgb1[2] + rgb2[2]) * (i / steps))).toString(16);
    colors.push(`#${red}${green}${blue}`.replace('136', 'ff'))
  };
  return colors;
}

export function validateObjectProps(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (value === undefined || Number.isNaN(value)) {
        return false; 
      }
    }
  }
  return true;
}