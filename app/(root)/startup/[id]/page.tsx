
import StartupInfo from '@/components/StartUpInfo';
import { client } from '@/sanity/lib/client';
import { STARTUPS_QUERY_BY_ID } from '@/sanity/lib/queries';
import { Startup, Author } from '@/sanity/types';
import { notFound } from 'next/navigation';

// export const experimental_ppr = true;
export type startUpTypeCard = Omit<Startup, "author">&{ author?:Author}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const post = await client.fetch(STARTUPS_QUERY_BY_ID, { id }); // Corrected this line
    if (!post) return notFound();
  

      return (
        <div>
          <StartupInfo post={post}/>
        </div>
      )
        
}



export default page;
