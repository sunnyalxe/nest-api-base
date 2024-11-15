import { compare, genSalt, hash } from 'bcrypt';
export const generateHash = async (password: string): Promise<string> => {
  const salt = await genSalt();
  const hashedString = await hash(password, salt);

  return hashedString;
};
export const compareHash = async (password: string, hashedString: string): Promise<boolean> => {
  return compare(password, hashedString);
};
