import * as schema from "../db/schema";
import { db } from "../db";

export const getMovies = async () => {
  const result = await db.select().from(schema.movies);
  return result;
};
