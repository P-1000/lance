import { useState, useCallback } from 'react';

export function useSvgUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  
  const validateSvg = useCallback((svgContent) => {
    // Basic validation
    if (!svgContent.includes('<svg') || !svgContent.includes('</svg>')) {
      return { valid: false, error: 'Invalid SVG content' };
    }
    
    // Check for potential XSS
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
}