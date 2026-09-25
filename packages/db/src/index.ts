import { prisma } from "./prisma";

type IsValidRoom = {
  isValid: boolean;
};
export const fetchRoom = async (code: string): Promise<IsValidRoom> => {
  const res = await prisma.room.findUnique({
    where: {
      code,
    },
  });
  if (res) return { isValid: true };
  return { isValid: false };
};
