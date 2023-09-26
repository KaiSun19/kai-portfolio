import { useState } from "react";

export default function useClipboard() {
  const [value, setValue] = useState();
  function copy(val , cb ) {
    window?.navigator.clipboard
      .writeText(val)
      .then(() => {
        setValue(val);
        cb && cb();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return { value, copy };
}