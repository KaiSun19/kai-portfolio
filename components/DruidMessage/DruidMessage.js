import { useState, useEffect } from "react";
import { parseCode } from "../../utils/utils";
import { AiFillSmile, AiFillMeh  } from "react-icons/ai";
import Code from "../Code";
import Typewriter from "typewriter-effect";

export default function Message({
    id,
    isUser,
    message,
    isNew = false,
  }) {
  
    const { codesArr, withoutCodeArr } = parseCode(message);
    let result = withoutCodeArr.map((item, index) => {
      return codesArr[index] ? [item, codesArr[index]] : [item];
    });
    return (
      <div
        className={`${!isUser ? "py-7" : "py-1"} h-fit ${
          !isUser ? "dark:bg-neutral-900 bg-neutral-100" : "bg-inherit"
        }`}
      >
        <div className="flex flex-row gap-6 w-[50%] max-[900px]:w-[88%]  mx-auto items-start">
          {isUser ? (
            <span className=""><AiFillMeh /></span>
          ) : (
            <span className=""><AiFillSmile /></span>
          )}
          <span className="leading-8 w-[97%]">
            {isUser || !isNew ? (
              <>
                {result.flat().map((item , index ) => {
                  return (
                    <div key={id + index}>
                      {typeof item == "string" ? (
                        item
                      ) : (
                        <div className="mb-1 w-[94%] z-50">
                          <Code language={item.language}>{item.code}</Code>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {result.flat().map((item) => {
                  return (
                    <>
                      {typeof item == "string" ? (
                        <TypeOnce>{item}</TypeOnce>
                      ) : (
                        <div className="mb-1 w-[94%] z-50">
                          <Code language={item.language}>
                            {item.code}
                          </Code>
                        </div>
                      )}
                    </>
                  );
                })}
              </>
            )}
          </span>
        </div>
      </div>
    );
  }

  export function Skeleton() {
    return (
      <div className={`py-7 h-fit dark:bg-neutral-900 bg-neutral-100`}>
        <div className="flex flex-row gap-6 w-[50%] max-[900px]:w-[88%]  mx-auto items-start">
          <span className=""><AiFillSmile /></span>
          <span className="leading-8">
            <Typewriter
              options={{
                delay: 85,
                loop: true,
                autoStart: true,
              }}
              onInit={(typewriter) => {
                typewriter.typeString("...").start();
              }}
            />
          </span>
        </div>
      </div>
    );
  }
  
  function TypeOnce({ children }) {
    const [on, setOn] = useState(true);
    return on ? (
      <Typewriter
        options={{
          delay: 45,
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString(children)
            .start()
            .callFunction(() => {
              setOn(false);
            });
        }}
      />
    ) : (
      children
    );
  }