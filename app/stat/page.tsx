import React from 'react';
import { Calendar, Tag, Rocket, Lightbulb, ArrowRight } from 'lucide-react';
import { cn } from '@lib/utils';



interface Author {
    _id: string;
    name: string;
    username: string;
    image: string;
    bio: string;
}

interface Startup {
    _id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    image: string;
    pitch: string;
    _createdAt: string;
    author: Author;
}

// Example data
const mockStartup: Startup = {
    _id: "1",
    title: "EcoTech Solutions",
    slug: "ecotech-solutions",
    description: "EcoTech Solutions is revolutionizing the way we approach environmental sustainability through innovative technology. Our platform combines AI-driven analytics with IoT sensors to help businesses reduce their carbon footprint while maximizing operational efficiency.",
    category: "CleanTech",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80",
    pitch: "We're building the future of sustainable business operations. Our AI-powered platform provides real-time insights and actionable recommendations that have helped our clients reduce energy consumption by an average of 40% while improving their bottom line.",
    _createdAt: "2024-03-14T12:00:00Z",
    author: {
        _id: "auth1",
        name: "Sarah Chen",
        username: "sarahchen",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
        bio: "Serial entrepreneur passionate about sustainability and technology. Previously founded GreenWave (acquired 2022). MIT graduate with 10+ years in cleantech."
    }
};

function Button({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}

function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <span className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            className
        )}>
      {children}
    </span>
    );
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={cn(
            "rounded-xl border bg-card text-card-foreground shadow",
            className
        )}>
            {children}
        </div>
    );
}

function Avatar({ src, alt, className }: { src: string; alt: string; className?: string }) {
    return (
        <div className={cn("relative flex h-16 w-16 shrink-0 overflow-hidden rounded-full", className)}>
            <img className="aspect-square h-full w-full" src={src} alt={alt} />
        </div>
    );
}

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
            {/* Hero Section */}
            <div className="relative h-[70vh] bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={mockStartup.image}
                        alt={mockStartup.title}
                        className="w-full h-full object-cover mix-blend-overlay"
                    />
                </div>

                <div className="relative h-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-900/60 to-purple-900/80" />

                    <div className="relative text-center px-4 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                            {mockStartup.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Metadata Section */}
            <div className="bg-white shadow-lg animate-in fade-in slide-in-from-top-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                        <Badge className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-100">
                            <Tag className="w-4 h-4 mr-1" />
                            {mockStartup.category}
                        </Badge>
                        <Badge className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-100">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(mockStartup._createdAt).toLocaleDateString()}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* About and Pitch Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 border-blue-100/20 animate-in fade-in slide-in-from-bottom-4">
                            <div className="flex items-center gap-3 mb-6">
                                <Rocket className="w-6 h-6 text-blue-600" />
                                <h2 className="text-2xl font-semibold text-gray-900">About</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {mockStartup.description}
                            </p>
                        </Card>

                        <Card className="bg-gradient-to-br from-purple-50 via-white to-blue-50 p-8 border-purple-100/20 animate-in fade-in slide-in-from-bottom-4 delay-150">
                            <div className="flex items-center gap-3 mb-6">
                                <Lightbulb className="w-6 h-6 text-purple-600" />
                                <h2 className="text-2xl font-semibold text-gray-900">Elevator Pitch</h2>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {mockStartup.pitch}
                            </p>
                        </Card>
                    </div>

                    {/* Founder Card */}
                    <div className="lg:col-start-3">
                        <div className="sticky top-8">
                            <Card className="bg-gradient-to-br from-white via-blue-50 to-purple-50 p-8 border-blue-100/20 animate-in fade-in slide-in-from-bottom-4 delay-300">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Meet the Founder</h3>

                                <div className="flex items-start gap-4 mb-6">
                                    <Avatar
                                        src={mockStartup.author.image}
                                        alt={mockStartup.author.name}
                                        className="ring-2 ring-blue-100"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{mockStartup.author.name}</h4>
                                        <p className="text-blue-600">@{mockStartup.author.username}</p>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                    {mockStartup.author.bio}
                                </p>

                                <Button
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-shadow group"
                                >
                                    Connect with Founder
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;