"use client";

// Add useSvgUpload hook and theme support
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Upload, X, Filter, Check, FileUp } from 'lucide-react';
import { useIcons } from '@/lib/icons/IconProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

// Icon categories configuration
const iconCategories = [
  { 
    id: 'cloud', 
    name: 'Cloud Services', 
    collections: [
      { type: 'svg', prefix: '', icons: ['EC2', 'S3', 'Lambda', 'DynamoDB', 'CloudWatch', 'SNS', 'SQS', 'API Gateway', 'CloudFront'] },
      { type: 'svg', prefix: '', icons: ['Virtual Machine', 'Storage', 'Function', 'Cosmos DB'] },
      { type: 'svg', prefix: '', icons: ['Compute Engine', 'Cloud Storage', 'Cloud Functions'] },
    ]
  },
  { 
    id: 'devops', 
    name: 'DevOps', 
    collections: [
      { type: 'iconify', collection: 'simple-icons', prefix: 'si', icons: ['docker', 'kubernetes', 'jenkins', 'gitlab', 'github', 'terraform'] },
      { type: 'lucide', prefix: '', icons: ['GitBranch', 'GitCommit', 'GitMerge', 'GitPullRequest'] }
    ]
  },
  { 
    id: 'programming', 
    name: 'Programming', 
    collections: [
      { type: 'iconify', collection: 'devicon', prefix: 'devicon', icons: ['javascript', 'typescript', 'python', 'java', 'csharp', 'go'] },
      { type: 'iconify', collection: 'simple-icons', prefix: 'si', icons: ['react', 'vue', 'angular', 'svelte', 'nextdotjs'] }
    ]
  },
  { 
    id: 'ui', 
    name: 'UI Elements', 
    collections: [
      { type: 'lucide', prefix: '', icons: ['Layout', 'Layers', 'LayoutGrid', 'LayoutList', 'LayoutTemplate', 'Table'] }
    ]
  },
  { 
    id: 'database', 
    name: 'Databases', 
    collections: [
      { type: 'iconify', collection: 'simple-icons', prefix: 'si', icons: ['mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch'] },
      { type: 'lucide', prefix: '', icons: ['Database', 'Table', 'TableProperties'] }
    ]
  },
  { 
    id: 'custom', 
    name: 'Custom Icons', 
    collections: [
      { type: 'custom', prefix: '', icons: [] } // Will be populated dynamically
    ]
  }
];

// Add useSvgUpload hook
const useSvgUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  
  const validateSvg = useCallback((svgContent) => {
    if (!svgContent.includes('<svg') || !svgContent.includes('</svg>')) {
      return { valid: false, error: 'Invalid SVG content' };
    }
    
    const dangerousAttributes = ['onerror', 'onload', 'onclick', 'script'];
    const hasDangerousContent = dangerousAttributes.some(attr => 
      svgContent.toLowerCase().includes(attr)
    );
    
    if (hasDangerousContent) {
      return { valid: false, error: 'SVG contains potentially unsafe content' };
    }
    
    return { valid: true };
  }, []);
  
  const uploadSvgFromFile = useCallback((file) => {
    return new Promise((resolve, reject) => {
      setIsUploading(true);
      setUploadError(null);
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        const svgContent = event.target.result;
        const validation = validateSvg(svgContent);
        
        if (!validation.valid) {
          setUploadError(validation.error);
          setIsUploading(false);
          reject(validation.error);
          return;
        }
        
        setIsUploading(false);
        resolve(svgContent);
      };
      
      reader.onerror = () => {
        setUploadError('Failed to read file');
        setIsUploading(false);
        reject('Failed to read file');
      };
      
      reader.readAsText(file);
    });
  }, [validateSvg]);
  
  return {
    isUploading,
    uploadError,
    uploadSvgFromFile,
    validateSvg
  };
};

export function IconSelector() {
  const { getIcon, loadIconLibrary, uploadCustomIcon, customIcons } = useIcons();
  const { theme } = useTheme();
  const { isUploading, uploadError, uploadSvgFromFile } = useSvgUpload();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('cloud');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadName, setUploadName] = useState('');
  const [uploadSvg, setUploadSvg] = useState('');
  const [categories, setCategories] = useState(iconCategories);
  const [loadingCollections, setLoadingCollections] = useState({});
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  // Update custom icons when they change
  useEffect(() => {
    if (customIcons.length > 0) {
      setCategories(prev => {
        const newCategories = [...prev];
        const customCategoryIndex = newCategories.findIndex(c => c.id === 'custom');
        
        if (customCategoryIndex !== -1) {
          newCategories[customCategoryIndex] = {
            ...newCategories[customCategoryIndex],
            collections: [
              { 
                type: 'custom', 
                prefix: '', 
                icons: customIcons.map(icon => icon.name) 
              }
            ]
          };
        }
        
        return newCategories;
      });
    }
  }, [customIcons]);

  // Load icon collections when category changes
  useEffect(() => {
    const loadCollections = async () => {
      const category = categories.find(c => c.id === selectedCategory);
      
      if (category) {
        for (const collection of category.collections) {
          if (collection.type === 'iconify') {
            setLoadingCollections(prev => ({ ...prev, [collection.collection]: true }));
            await loadIconLibrary('iconify', collection.collection);
            setLoadingCollections(prev => ({ ...prev, [collection.collection]: false }));
          }
        }
      }
    };
    
    loadCollections();
  }, [selectedCategory, categories, loadIconLibrary]);

  // Handle drag start for icons
  const handleDragStart = useCallback((event, icon, type, collection) => {
    event.dataTransfer.setData('application/reactflow/type', 'iconNode');
    
    const iconData = JSON.stringify({
      type,
      name: icon,
      collection
    });
    
    event.dataTransfer.setData('application/reactflow/icon', iconData);
    event.dataTransfer.setData('application/reactflow/label', icon);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  // Handle custom icon upload
  const handleUploadIcon = () => {
    if (uploadName && uploadSvg) {
      const success = uploadCustomIcon(uploadName, uploadSvg);
      if (success) {
        setUploadModalOpen(false);
        setUploadName('');
        setUploadSvg('');
        setSelectedCategory('custom');
      }
    }
  };

  // Filter icons based on search term
  const getFilteredIcons = useCallback(() => {
    const category = categories.find(c => c.id === selectedCategory);
    if (!category) return [];
    
    let allIcons = [];
    
    category.collections.forEach(collection => {
      const iconsWithMetadata = collection.icons.map(icon => ({
        name: icon,
        type: collection.type,
        collection: collection.collection,
        displayName: icon.replace(/([A-Z])/g, ' $1').trim() // Add spaces before capital letters
      }));
      
      allIcons = [...allIcons, ...iconsWithMetadata];
    });
    
    if (searchTerm) {
      return allIcons.filter(icon => 
        icon.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return allIcons;
  }, [categories, selectedCategory, searchTerm]);

  // Add file drop handlers
  const handleFileDrop = useCallback(async (e) => {
    e.preventDefault();
    setIsDraggingFile(false);
    
    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    
    const file = files[0];
    if (!file.name.endsWith('.svg')) {
      // Show error - not an SVG file
      return;
    }
    
    try {
      const svgContent = await uploadSvgFromFile(file);
      // Extract name from filename (remove extension)
      const name = file.name.replace('.svg', '');
      setUploadName(name);
      setUploadSvg(svgContent);
      setUploadModalOpen(true);
    } catch (error) {
      console.error('Error uploading SVG:', error);
    }
  }, [uploadSvgFromFile]);
  
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDraggingFile(true);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setIsDraggingFile(false);
  }, []);

  // Handle custom icon upload

  // Filter icons based on search term

  const filteredIcons = getFilteredIcons();

  return (
    <div 
      className="h-full flex flex-col relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleFileDrop}
    >
      {/* File drop overlay */}
      {isDraggingFile && (
        <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-md flex items-center justify-center z-10">
          <div className="text-center p-4 bg-background/80 backdrop-blur-sm rounded-lg shadow-lg">
            <FileUp className="h-10 w-10 mx-auto mb-2 text-primary" />
            <p className="text-primary font-medium">Drop SVG file to upload</p>
          </div>
        </div>
      )}

      {/* Search and upload bar */}
      <div className="p-3 border-b border-border flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search icons..."
            className={cn(
              "w-full pl-8 pr-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary",
              theme === 'dark' ? 'bg-background/70' : 'bg-background/50'
            )}
          />
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setUploadModalOpen(true)}
          className="h-9 w-9"
        >
          <Upload className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Categories */}
      <div className="flex overflow-x-auto p-2 border-b border-border">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="whitespace-nowrap mr-1 text-xs"
          >
            {category.name}
          </Button>
        ))}
      </div>
      
      {/* Icons grid */}
      <div className="flex-1 overflow-y-auto p-3">
        {loadingCollections[selectedCategory] ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : filteredIcons.length > 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {filteredIcons.map((icon) => (
              <motion.div
                key={`${icon.type}-${icon.name}`}
                className={cn(
                  "aspect-square border border-border rounded-md flex flex-col items-center justify-center p-2 cursor-grab hover:border-primary/50 transition-colors",
                  theme === 'dark' ? 'hover:bg-primary/10' : 'hover:bg-primary/5'
                )}
                whileHover={{ scale: 1.05 }}
                draggable
                onDragStart={(e) => handleDragStart(e, icon.name, icon.type, icon.collection)}
              >
                <div className="w-8 h-8 flex items-center justify-center mb-1">
                  {getIcon(icon.type, icon.name, { collection: icon.collection })}
                </div>
                <div className="text-xs text-center truncate w-full">
                  {icon.displayName}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Search className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">No icons found</p>
          </div>
        )}
      </div>
      
      {/* Upload modal - with error handling */}
      <AnimatePresence>
        {uploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-lg shadow-lg p-4 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Upload Custom Icon</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setUploadModalOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Icon Name</label>
                  <input
                    type="text"
                    value={uploadName}
                    onChange={(e) => setUploadName(e.target.value)}
                    placeholder="MyCustomIcon"
                    className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1">SVG Content</label>
                  <textarea
                    value={uploadSvg}
                    onChange={(e) => setUploadSvg(e.target.value)}
                    placeholder="<svg>...</svg>"
                    className="w-full px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-primary min-h-[120px]"
                  />
                </div>
                
                {uploadError && (
                  <div className="p-2 bg-destructive/10 border border-destructive/30 rounded text-destructive text-sm">
                    {uploadError}
                  </div>
                )}
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setUploadModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUploadIcon}
                    disabled={!uploadName || !uploadSvg || isUploading}
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                        Uploading...
                      </>
                    ) : (
                      'Upload'
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}