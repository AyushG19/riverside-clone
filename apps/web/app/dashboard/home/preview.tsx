import { Button } from "@repo/ui/components/button";
import { debounce } from "app/utils/debouncer";
import {
  Camera,
  ChevronRight,
  Mic,
  MoveRight,
  SquareArrowRight,
  SquarePlus,
} from "lucide-react";
import { useRef, useState } from "react";

const checkLink=()=>{}
export default function Preview() {
  const [validLink, setValidLink] = useState(false);
  const [input, setInput] = useState("");
  const debounceCheckLinkRef = useRef<()=>void|null>(null)
  const createFn = () => {
    const debouncedFn = debounce(checkLink);
    debounceCheckLinkRef.current =debouncedFn;
  }
  const handleChange = () => {
    // const fn = debounceCheckLinkRef.current
    // if (fn ) {
    //   fn(input);
    // }
  }
  if (validLink) {
    return (
      <div className="flex gap-1 w-full">
        <div className="w-120 min-h-30 h-80 bg-black rounded-sm relative border border-deep-space-blue-500">
          <div className="flex gap-2 justify-center absolute bottom-0 left-1/2 -translate-x-1/2 p-4">
            <Button variant={"myButton"} className={"size-14"}>
              <Mic className="size-5" />
            </Button>
            <Button variant={"myButton"} className={"size-14"}>
              <Camera className="size-5" />
            </Button>
            <Button variant={"myButton"} className={"h-14 w-28 text-lg"}>
              Enter
              <SquareArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-120 flex flex-col gap-2">
        <p className="font-livvic text-lg text-center w-full p-1 font-semibold">
          Enter link or code
        </p>
        <div className="flex gap-1">
          <input
            type="text"
            className="w-full px-4 bg-ink-black-300 rounded-md font-livvic h-14 border border-deep-space-blue-400 text-yale-blue-900 focus:outline-none"
            placeholder="xxxx"
            onFocus={createFn}
            onChange={handleChange}
          ></input>
          <Button
            variant={"myButton"}
            className={"h-14 w-fit px-6 flex items-center justify-center"}
          >
            Join
            <ChevronRight className="mt-0.5" />
          </Button>
        </div>
      </div>
    );
  }
}
