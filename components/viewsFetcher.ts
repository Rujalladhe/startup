// viewsFetcher.ts
import { client } from '@/sanity/lib/client';
import { VIEWS } from '@/sanity/lib/queries';
import { WriteClient } from '@/sanity/lib/Write-client';

export const fetchViews = async (id: string) => {
  // Fetch current views
  const { views: totalviews } = await client.withConfig({ useCdn: false }).fetch(VIEWS, { id });
  
  // Increment views asynchronously and wait for the update
  const updatedViews = await incrementViews(id, totalviews);

  return updatedViews;  // Return the updated views
};

// Separate function to increment views count
const incrementViews = async (id: string, currentViews: number) => {
  try {
    // Update the views in the database and return the new value
    const newViews = currentViews + 1;
    await WriteClient.patch(id).set({ views: newViews }).commit();
    return newViews;  // Return the incremented views count
  } catch (error) {
    console.error("Error incrementing views:", error);
    return currentViews;  // In case of an error, return the original countop
  }
};
