// StartupInfo.tsx
"use client"
import { notFound } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, Rocket, Lightbulb, ArrowRight, Eye } from 'lucide-react';
import { Author, Startup } from '@/sanity/types';
import Views from './Views';
import { fetchViews } from './viewsFetcher';

export type startUpTypeCard = Omit<Startup, 'author'> & { author?: Author };

const StartupInfo = async ({ post }: { post: any }) => {
  if (!post) return notFound();

  // Fetch views using the helper function
  const totalviews = await fetchViews(post._id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative h-[70vh] bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative h-full flex items-center justify-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative text-center px-4 max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Metadata Section */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <span className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full text-blue-700 border border-blue-100">
              <Tag className="w-4 h-4" />
              {post.category}
            </span>
            <span className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full text-blue-700 border border-blue-100">
              <Calendar className="w-4 h-4" />
              {new Date(post._createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full text-blue-700 border border-blue-100">
              <Eye className="w-4 h-4" />
              <Views totalviews={totalviews} />
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* About and Pitch Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl shadow-sm p-8 border border-blue-100/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">About</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {post.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-xl shadow-sm p-8 border border-purple-100/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Elevator Pitch</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {post.pitch}
              </p>
            </motion.div>
          </div>

          {/* Founder Card */}
          <div className="lg:col-start-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-8"
            >
              <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl shadow-sm p-8 border border-blue-100/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Meet the Founder</h3>

                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-100"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                    <p className="text-blue-600">@{post.author.username}</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 group hover:shadow-lg transition-shadow"
                >
                  Connect with Founder
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupInfo;
