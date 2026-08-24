import { z } from "zod";

const data = { type: "offer", data:any}
const IncomingDataSchema = z.object({
  type:z.enum([])
})
