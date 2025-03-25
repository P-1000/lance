"use client";

import React from 'react';
import { 
  PlayCircle, 
  StopCircle, 
  GitBranch, 
  Cog 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NodeProperties({ node, updateNodeType }) {
  const nodeTypes = [
    { id: 'start', name: 'Start', icon: <PlayCircle className="h-4 w-4" /> },
    { id: 'process', name: 'Process', icon: <Cog className="h-4 w-4" /> },
    { id: 'conditional', name: 'Conditional', icon: <GitBranch className="h-4 w-4" /> },
    { id: 'end', name: 'End', icon: <StopCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="w-64">
      <h3 className="text-sm font-medium mb-2">Node Properties</h3>
      <div className="text-xs text-muted-foreground mb-3">
        ID: {node.id}
      </div>
      
      <div className="mb-4">
        <label className="text-xs font-medium block mb-1">Node Type</label>
        <div className="grid grid-cols-2 gap-2">
          {nodeTypes.map((type) => (
            <Button
              key={type.id}
              size="sm"
              variant={node.data.nodeType === type.id ? "default" : "outline"}
              className="justify-start text-xs h-8"
              onClick={() => updateNodeType(node.id, type.id)}
            >
              {type.icon}
              <span className="ml-1">{type.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}