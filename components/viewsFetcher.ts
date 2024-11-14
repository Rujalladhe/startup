// viewsFetcher.ts
import { client } from '@/sanity/lib/client';
import { VIEWS } from '@/sanity/lib/queries';

export const fetchViews = async (id: string) => {
  const { views: totalviews } = await client.withConfig({ useCdn: false }).fetch(VIEWS, { id });
  return totalviews;
};
