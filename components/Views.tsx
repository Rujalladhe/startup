// Views.tsx
"use client";
import React from 'react';

const Views = ({ totalviews }: { totalviews: number }) => {
  return (
    <div><span>{totalviews}</span></div>
  );
};

export default Views;
