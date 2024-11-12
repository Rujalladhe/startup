// ContentCard.js
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Author, Startup } from "@/sanity/types";
import Link from "next/link";
export type startUpTypeCard = Omit<Startup, "author">&{ author?:Author}

export function ContentCard({ post }:{post:startUpTypeCard}) {
  const {
    _id,
    _createdAt,
    views,
    author,// Handle undefined author gracefully
    description,
    image,
    title,
  } = post;

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all group",
        "bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-indigo-900 dark:to-violet-950",
        "border-none text-white",
        "hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.5)]",
        "dark:hover:shadow-[0_0_25px_-5px_rgba(99,102,241,0.3)]"
      )}
    >
      <div className="aspect-video relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 ring-2 ring-white/20">
              <AvatarImage src={author?._id}  />
              <AvatarFallback className="bg-indigo-200 text-indigo-700">
                {author?.name ? author?.name.charAt(0) : "?"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none text-white">{author?.name}</p>
              <p className="text-xs text-white/70">
                date:11/2/2023
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{views}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold leading-tight">{title}</h2>
        <p className="text-sm text-white/80 mt-1">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <Link href={`/startup/${_id}`}>
        <button className="text-sm font-medium text-indigo-200 hover:text-indigo-300 transition-colors">
          Read more
        </button>
      </Link>
      </CardFooter>
    </Card>
  );
}
