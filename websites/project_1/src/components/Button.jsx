// import React, {useState} from 'react'
import { cn } from "../utils/cn";

function Button({ name, idx }) {
  // const [active, setActive] = useState(null);
  return (
    <div className="group relative flex items-center transition-all duration-300 ease-in-out pr-0 hover:pr-11">
      <div
        className={cn(
          `relative text-2xl text-white font-medium cursor-pointer
           hover:bg-blue-300 hover:text-black flex gap-2 px-[18px] py-2 
           rounded-full border bg-neutral-950/50 `
        )}
      >
        <h2 key={idx} className="font-2xl">
          {name}
        </h2>
      </div>
      <span
        className="absolute flex items-center justify-center pb-2 right-0 opacity-0 text-black -rotate-120 
        group-hover:opacity-100 group-hover:-rotate-45  border-px 
        w-11 h-11 bg-blue-300 rounded-full transition-all duration-300 delay-100 ease-in-out "
      >→</span>
    </div>
  );
}

export default Button;
