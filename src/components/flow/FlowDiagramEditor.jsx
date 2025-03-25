"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Panel,
  MiniMap,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';

import { IconNode } from './nodes/IconNode';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import { PlaybackControls } from './PlaybackControls';
// Import ThemeToggle
import { ThemeToggle } from '../ui/theme-toggle';

// Register custom node types
const nodeTypes = {
  iconNode: IconNode,
};

// Add this import at the top with other imports
import iconSvgs from '@/lib/icons/iconSvgs';

// Import the IconProvider
import { useIcons } from '@/lib/icons/IconProvider';

// Add this import at the top of your file
import { toPng } from 'html-to-image';

export function FlowDiagramEditor() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedNode, setSelectedNode] = useState(null);
  // Removed selectedNodeType state
  
  // Add the missing onNodeClick function
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);
  
  // Move updateNodeType inside the component
  const updateNodeType = useCallback((nodeId, newType) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              nodeType: newType,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ 
      ...params, 
      animated: true,
      style: { stroke: '#555', strokeWidth: 2 },
      markerEnd: {
        type: 'arrowclosed',
        color: '#555',
      },
    }, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const [animationSteps, setAnimationSteps] = useState([]);
  const [animationSpeed, setAnimationSpeed] = useState(1000); // ms per step
  const animationRef = useRef(null);
  
  // Function to calculate animation steps based on the flow
  const calculateAnimationSteps = useCallback(() => {
    if (!nodes.length) return [];
    
    // Find start nodes (nodes with no incoming edges)
    const nodeIds = new Set(nodes.map(node => node.id));
    const nodesWithIncomingEdges = new Set(edges.map(edge => edge.target));
    const startNodeIds = [...nodeIds].filter(id => !nodesWithIncomingEdges.has(id));
    
    // If no clear start nodes, use the first node
    const initialNodes = startNodeIds.length ? startNodeIds : [nodes[0].id];
    
    // Build a graph representation for traversal
    const graph = {};
    edges.forEach(edge => {
      if (!graph[edge.source]) graph[edge.source] = [];
      graph[edge.source].push(edge.target);
    });
    
    // Perform a breadth-first traversal to determine animation steps
    const steps = [];
    const visited = new Set();
    const queue = [...initialNodes];
    
    while (queue.length) {
      const currentStep = [];
      const levelSize = queue.length;
      
      for (let i = 0; i < levelSize; i++) {
        const currentNodeId = queue.shift();
        if (visited.has(currentNodeId)) continue;
        
        visited.add(currentNodeId);
        currentStep.push(currentNodeId);
        
        // Add connected nodes to the queue
        if (graph[currentNodeId]) {
          queue.push(...graph[currentNodeId]);
        }
      }
      
      if (currentStep.length) {
        steps.push(currentStep);
      }
    }
    
    return steps;
  }, [nodes, edges]);
  
  // Update animation steps when nodes or edges change
  useEffect(() => {
    setAnimationSteps(calculateAnimationSteps());
  }, [calculateAnimationSteps]);
  
  const playAnimation = useCallback(() => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    // Reset all nodes to inactive state
    setNodes(nodes => nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        active: false,
      },
      style: { opacity: 0.4 },
    })));
    
    // Reset all edges to inactive state
    setEdges(edges => edges.map(edge => ({
      ...edge,
      animated: false,
      style: { ...edge.style, opacity: 0.4 },
    })));
    
    // Start the animation
    let step = 0;
    
    const animate = () => {
      if (step < animationSteps.length) {
        const currentNodeIds = animationSteps[step];
        
        // Activate current nodes
        setNodes(nodes => nodes.map(node => {
          if (currentNodeIds.includes(node.id)) {
            return {
              ...node,
              data: {
                ...node.data,
                active: true,
              },
              style: { opacity: 1 },
            };
          }
          return node;
        }));
        
        // Activate edges connected to these nodes
        setEdges(edges => edges.map(edge => {
          if (currentNodeIds.includes(edge.target)) {
            return {
              ...edge,
              animated: true,
              style: { ...edge.style, opacity: 1 },
            };
          }
          return edge;
        }));
        
        setCurrentStep(step);
        step++;
        animationRef.current = setTimeout(animate, animationSpeed);
      } else {
        stopAnimation();
      }
    };
    
    animate();
  }, [animationSteps, animationSpeed, setNodes, setEdges]);
  
  const stopAnimation = useCallback(() => {
    setIsPlaying(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    
    // Reset all nodes and edges to active state
    setNodes(nodes => nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        active: false,
      },
      style: { opacity: 1 },
    })));
    
    setEdges(edges => edges.map(edge => ({
      ...edge,
      animated: false,
      style: { ...edge.style, opacity: 1 },
    })));
  }, [setNodes, setEdges]);
  
  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  // Improved onDrop function to properly handle icon components
  // Update the onDrop function to include description (around line 200)
  // Update the onDrop function to properly handle the icon data:
  // Update the onDrop function to focus only on the icon
  // Update the onDrop function to remove node type handling
  // In the onDrop function
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow/type');
      const iconData = event.dataTransfer.getData('application/reactflow/icon');
      const label = event.dataTransfer.getData('application/reactflow/label');

      if (!type || !reactFlowInstance) {
        return;
      }

      // Process icon data
      let processedIcon;
      try {
        // Parse the icon data
        const iconObj = JSON.parse(iconData);
        
        // Store the icon object directly - our IconNode component will handle rendering
        processedIcon = iconObj;
      } catch (e) {
        // If not JSON or parsing fails, use a default icon
        processedIcon = { type: 'svg', name: 'default' };
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      
      const newNode = {
        id: `node_${Date.now()}`,
        type,
        position,
        data: { 
          label, 
          icon: processedIcon, 
          active: false,
          description: `Description for ${label}`,
          nodeType: processedIcon.type || 'Default',
          id: `node_${Date.now()}`,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );
  
  // Function to export the diagram as an image
  const exportDiagram = useCallback(() => {
    if (reactFlowWrapper.current) {
      // Get the ReactFlow container element
      const flowElement = reactFlowWrapper.current.querySelector('.react-flow');
      
      if (flowElement) {
        toPng(flowElement, {
          backgroundColor: '#ffffff',
          quality: 1.0,
          width: reactFlowWrapper.current.offsetWidth,
          height: reactFlowWrapper.current.offsetHeight,
        })
        .then((dataUrl) => {
          // Create a download link
          const a = document.createElement('a');
          a.href = dataUrl;
          a.download = `flow-diagram-${new Date().toISOString()}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch((error) => {
          console.error('Error exporting diagram:', error);
        });
      }
    }
  }, []);
  
  // Function to save the diagram as JSON
  const saveDiagram = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      const json = JSON.stringify(flow, null, 2);
      
      // Create a download link
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `flow-diagram-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [reactFlowInstance]);

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Toolbar 
          onPlay={playAnimation} 
          onStop={stopAnimation} 
          isPlaying={isPlaying}
          onExport={exportDiagram}
          onSave={saveDiagram}
        />
        <div className="flex-1 h-full" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            fitView
          >
            <Controls />
            <Background color="#aaa" gap={16} variant="dots" />
            <MiniMap 
              nodeStrokeColor={(n) => {
                return '#888';
              }}
              nodeColor={(n) => {
                return '#f9fafb';
              }}
            />
            <Panel position="bottom-center">
              <PlaybackControls 
                isPlaying={isPlaying} 
                currentStep={currentStep}
                onPlay={playAnimation}
                onStop={stopAnimation}
              />
            </Panel>
            
            {/* Add Theme Toggle in top-right corner */}
            <Panel position="top-right" className="p-2">
              <ThemeToggle />
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}