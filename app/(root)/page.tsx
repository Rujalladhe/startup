import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import { ContentCard, startUpTypeCard } from "@/components/ContentCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }>; }) {
  const query = (await searchParams).query;
  const params = {search:query || null}

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY,params });
   console.log(posts)

  // const posts = [
  //   {
  //     createdAt: "2024-11-04",
  //     views: 99,
  //     author: { _id: 1, name: "John Doe", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" },
  //     _id: 1,
  //     description: "This is the description of the post.",
  //     image: "https://images.unsplash.com/photo-1730343464315-a9ca01f9f1c6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     category: "robot",
  //     title: "We Robots",
  //   }
  // ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Pitch your ideas, get funding and recognition, vote, and get startup info
      </h1>
      <SearchForm query={query} />

       <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {posts.length > 0 ? (
          posts.map((post:startUpTypeCard) => (
            <ContentCard key={post._id} post={post} />
          ))
        ) : (
          <p className="text-center text-gray-500">No startups found</p>
        )}
      </ul> 
      <SanityLive/>

    </div>
  );
} 