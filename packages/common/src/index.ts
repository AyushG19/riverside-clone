import { z } from "zod";

const data = { type: "offer", data:Object}
const IncomingDataSchema = z.object({
  type:z.enum([])
})
