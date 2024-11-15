"use client";
import React from "react";

const Views = ({ totalviews }: { totalviews: number }) => {
  return (
    <div style={containerStyle} className=" bg-gradient-to-br from-slate-50 to-purple-50 relative">
      <span style={viewStyle}>Views: {totalviews}</span>
    </div>
  );
};

export default Views;

// Inline styles for container and view text
const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  padding: "10px",
};

const viewStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  color: "black", // A soft blue color
  backgroundColor: " #FFB5C0", // Light background color
  padding: "8px 12px",
  borderRadius: "8px",
  fontWeight: "bold",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Adds a subtle shadow
};
