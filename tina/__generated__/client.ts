import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '9a0ab6b6123f2094da5276b277a1d1194afc0726', queries,  });
export default client;
  