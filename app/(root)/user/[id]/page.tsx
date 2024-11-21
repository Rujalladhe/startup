import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Globe, Linkedin, Twitter } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { Suspense } from "react";
import exp from "constants";
import { notFound } from "next/navigation";
import { auth } from "@/auth";

const userStartups = [
  {
    name: "EcoTech Solutions",
    description: "Revolutionizing sustainable energy with AI-powered smart grids",
    industry: "Clean Energy",
    stage: "Series A",
    imageUrl: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?q=80&w=2000&auto=format&fit=crop",
  },
  {
    name: "HealthAI",
    description: "AI-powered healthcare diagnostics platform",
    industry: "HealthTech",
    stage: "Seed",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2000&auto=format&fit=crop",
  },
];
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const session = await auth();
  
    const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
    if (!user) return notFound();
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="relative mb-20">
          <div className="h-60 rounded-3xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 opacity-90"></div>
          </div>
          <Card className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl shadow-xl">
            <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
              <div className="relative">
                <img
                  src={user.image}
                  alt="Profile"
                  className="w-32 h-32 rounded-2xl object-cover ring-4 ring-white shadow-lg"
                />
                <Badge className="absolute -top-3 -right-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 border-0 text-white px-3 py-1">
                  Pro
                </Badge>
              </div>
              <div className="text-center md:text-left flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
                    {user.name}
                  </h1>
                  <div className="flex gap-2 justify-center md:justify-start">
                    <Button size="icon" variant="ghost" className="hover:text-violet-500">
                      <Twitter className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="hover:text-violet-500">
                      <Linkedin className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="hover:text-violet-500">
                      <Github className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="hover:text-violet-500">
                      <Globe className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 max-w-2xl">
                  startup founder
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  <Badge variant="secondary" className="bg-violet-100 hover:bg-violet-200">Entrepreneur</Badge>
                  <Badge variant="secondary" className="bg-fuchsia-100 hover:bg-fuchsia-200">Tech Innovator</Badge>
                  <Badge variant="secondary" className="bg-pink-100 hover:bg-pink-200">Angel Investor</Badge>
                  <Badge variant="secondary" className="bg-purple-100 hover:bg-purple-200">Mentor</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Startups Grid */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
            Founded Startups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Suspense fallback={<p> loading....</p>}>
          <UserStartups id={id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page ;