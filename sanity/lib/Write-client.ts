import "server-only"
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId,token } from '../env'
import { error } from "console";

export const WriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
if(!WriteClient.config().token){
    throw new Error("write token not found")
}
