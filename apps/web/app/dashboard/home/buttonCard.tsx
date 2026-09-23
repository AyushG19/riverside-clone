import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { LucideIcon, MicSignal } from "lucide-react";
import React from "react";

interface ButtonCardType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string,
  desc: string,
  icon:LucideIcon
}
const ButtonCard = React.forwardRef<HTMLButtonElement, ButtonCardType>(
  ({ className,title,desc,icon:Icon, ...props }, ref) => {
    return (
      <Button variant={"myButton"} ref={ref} className={"w-56 max-h-18 h-fit rounded-lg p-4"}
        {...props}>
        <div className="w-full flex gap-4 items-center ">
          <div className="bg-deep-space-blue-300 p-3 rounded-lg aspect-square">
            <Icon strokeWidth={"1.6"} />
          </div>
          <div className="flex flex-col items-start">
            <div className="font-semibold font-sans capitalize">{title}</div>
            <div className="font-light text-xs text-white/50 font-sans">{desc}</div>
          </div>
        </div>
      </Button>
    );
  }
)
ButtonCard.displayName = "ButtonCad";
export default ButtonCard;
