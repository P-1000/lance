"use client";

import React from 'react';
import { 
  Save, 
  Download, 
  Trash2, 
  Undo, 
  Redo, 
  Play, 
  Pause,
  ZoomIn,
  ZoomOut,
  Layout
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Toolbar({ onPlay, onStop, isPlaying, onExport, onSave }) {
  return (
    <div className="flex items-center justify-between p-2 border-b border-border bg-card">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={onSave}>
          <Save className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onExport}>
          <Download className="h-5 w-5" />
        </Button>
        <div className="h-6 w-px bg-border mx-1" />
        <Button variant="ghost" size="icon">
          <Undo className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Redo className="h-5 w-5" />
        </Button>
        <div className="h-6 w-px bg-border mx-1" />
        <Button variant="ghost" size="icon">
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <ZoomOut className="h-5 w-5" />
        </Button>
        <div className="h-6 w-px bg-border mx-1" />
        <Button variant="ghost" size="icon">
          <Layout className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={isPlaying ? onStop : onPlay}
        >
          {isPlaying ? (
            <>
              <Pause className="h-4 w-4 mr-2" />
              Stop
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Play
            </>
          )}
        </Button>
        <Button variant="destructive" size="icon">
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}