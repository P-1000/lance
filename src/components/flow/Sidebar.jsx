"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { IconSelector } from './IconSelector';

export function Sidebar() {
  return (
    <div className="w-72 h-full border-r border-border bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold mb-1">Flow Diagram Editor</h2>
        <p className="text-xs text-muted-foreground">Drag icons to create your diagram</p>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <IconSelector />
      </div>
    </div>
  );
}