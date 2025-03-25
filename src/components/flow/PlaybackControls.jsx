"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export function PlaybackControls({ 
  isPlaying, 
  currentStep, 
  totalSteps,
  onPlay, 
  onStop,
  animationSpeed,
  setAnimationSpeed
}) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col items-center space-y-2 bg-card/80 backdrop-blur-sm p-3 rounded-lg shadow-lg"
    >
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <SkipBack className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="default" 
          size="icon" 
          className="rounded-full"
          onClick={isPlaying ? onStop : onPlay}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>
      
      {totalSteps > 0 && (
        <div className="text-xs text-center">
          Step {currentStep + 1} of {totalSteps}
        </div>
      )}
      
      <div className="flex items-center gap-2 w-48">
        <Clock className="h-3 w-3 text-muted-foreground" />
        <Slider
          value={[animationSpeed]}
          min={200}
          max={2000}
          step={100}
          onValueChange={(value) => setAnimationSpeed(value[0])}
        />
      </div>
    </motion.div>
  );
}