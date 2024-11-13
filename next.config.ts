import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    ppr : 'incremental'
  },
  devIndicators:{
    appIsrStatus:true,
    buildActivity:true,
    buildActivityPosition:"bottom-right"
  },
};

export default nextConfig;
