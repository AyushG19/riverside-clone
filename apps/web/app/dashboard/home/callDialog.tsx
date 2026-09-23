"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@repo/ui/components/dialog"
import ButtonCard from "./buttonCard"
import Preview from "./preview"
import { MicSignal } from "lucide-react"

const CollabDialog = () => {
  return (
    <Dialog>
      <DialogTrigger render={<ButtonCard icon={MicSignal} title="collab" desc="Join a call or room"/>} />
      <DialogContent className={""}>
        <DialogHeader>
            <Preview />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default CollabDialog;
