import React from 'react';
import * as LucideIcons from 'lucide-react';
import iconSvgs from './iconSvgs';

// Create AWS Icons
const createAwsIcons = () => {
  const awsIcons = [
    { 
      name: 'EC2', 
      component: <LucideIcons.Server className="text-orange-500" />,
      svg: iconSvgs['EC2']
    },
    { 
      name: 'S3', 
      component: <LucideIcons.Database className="text-orange-500" />,
      svg: iconSvgs['S3']
    },
    { 
      name: 'Lambda', 
      component: <LucideIcons.Code className="text-orange-500" />,
      svg: iconSvgs['Lambda']
    },
    { 
      name: 'DynamoDB', 
      component: <LucideIcons.Table className="text-orange-500" />,
      svg: iconSvgs['DynamoDB']
    },
    { 
      name: 'CloudWatch', 
      component: <LucideIcons.BarChart3 className="text-orange-500" />,
      svg: iconSvgs['CloudWatch']
    },
    // For the remaining AWS icons
    { name: 'SNS', component: <LucideIcons.Bell className="text-orange-500" />, svg: iconSvgs['SNS'] || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>' },
    { name: 'SQS', component: <LucideIcons.MessageSquare className="text-orange-500" />, svg: iconSvgs['SQS'] || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>' },
    { name: 'API Gateway', component: <LucideIcons.Network className="text-orange-500" />, svg: iconSvgs['API Gateway'] || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="18" r="2"></circle><circle cx="6" cy="6" r="2"></circle><circle cx="18" cy="18" r="2"></circle><circle cx="18" cy="6" r="2"></circle><line x1="6" y1="8" x2="6" y2="16"></line><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="18" x2="16" y2="18"></line><line x1="18" y1="8" x2="18" y2="16"></line></svg>' },
    { name: 'CloudFront', component: <LucideIcons.Globe className="text-orange-500" />, svg: iconSvgs['CloudFront'] || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>' },
  ];
  return awsIcons;
};

// Create Azure Icons
const createAzureIcons = () => {
  const azureIcons = [
    { name: 'Virtual Machine', component: <LucideIcons.Server className="text-blue-500" /> },
    { name: 'Storage', component: <LucideIcons.Database className="text-blue-500" /> },
    { name: 'Function', component: <LucideIcons.Code className="text-blue-500" /> },
    { name: 'Cosmos DB', component: <LucideIcons.Table className="text-blue-500" /> },
    { name: 'Monitor', component: <LucideIcons.BarChart3 className="text-blue-500" /> },
    { name: 'Event Hub', component: <LucideIcons.Bell className="text-blue-500" /> },
    { name: 'Service Bus', component: <LucideIcons.MessageSquare className="text-blue-500" /> },
    { name: 'API Management', component: <LucideIcons.Network className="text-blue-500" /> },
    { name: 'CDN', component: <LucideIcons.Globe className="text-blue-500" /> },
  ];
  return azureIcons;
};

// Create Google Cloud Icons
// For GCP icons
const createGcpIcons = () => {
  const gcpIcons = [
    { name: 'Compute Engine', component: <LucideIcons.Server className="text-green-500" />, svg: iconSvgs['Compute Engine'] || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>' },
    { name: 'Cloud Storage', component: <LucideIcons.Database className="text-green-500" />, svg: iconSvgs['Cloud Storage'] || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>' },
    { name: 'Cloud Functions', component: <LucideIcons.Code className="text-green-500" />, svg: iconSvgs['Cloud Functions'] || '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34A853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>' },
    // Add SVG for remaining GCP icons
  ];
  return gcpIcons;
};

// Create Database Icons
const createDatabaseIcons = () => {
  const dbIcons = [
    { name: 'SQL Database', component: <LucideIcons.Database className="text-purple-500" /> },
    { name: 'NoSQL Database', component: <LucideIcons.Database className="text-yellow-500" /> },
    { name: 'Redis', component: <LucideIcons.Database className="text-red-500" /> },
    { name: 'MongoDB', component: <LucideIcons.Database className="text-green-500" /> },
    { name: 'PostgreSQL', component: <LucideIcons.Database className="text-blue-500" /> },
    { name: 'MySQL', component: <LucideIcons.Database className="text-orange-500" /> },
  ];
  return dbIcons;
};

// Create Frontend Icons
const createFrontendIcons = () => {
  const frontendIcons = [
    { name: 'React', component: <LucideIcons.Atom className="text-blue-400" /> },
    { name: 'Vue', component: <LucideIcons.Atom className="text-green-400" /> },
    { name: 'Angular', component: <LucideIcons.Atom className="text-red-400" /> },
    { name: 'HTML', component: <LucideIcons.FileCode className="text-orange-500" /> },
    { name: 'CSS', component: <LucideIcons.FileCode className="text-blue-500" /> },
    { name: 'JavaScript', component: <LucideIcons.FileCode className="text-yellow-500" /> },
  ];
  return frontendIcons;
};

// Create Backend Icons
const createBackendIcons = () => {
  const backendIcons = [
    { name: 'Node.js', component: <LucideIcons.Server className="text-green-500" /> },
    { name: 'Python', component: <LucideIcons.Server className="text-blue-500" /> },
    { name: 'Java', component: <LucideIcons.Server className="text-orange-500" /> },
    { name: 'Go', component: <LucideIcons.Server className="text-cyan-500" /> },
    { name: 'Ruby', component: <LucideIcons.Server className="text-red-500" /> },
    { name: 'PHP', component: <LucideIcons.Server className="text-purple-500" /> },
  ];
  return backendIcons;
};

// Create DevOps Icons
const createDevOpsIcons = () => {
  const devOpsIcons = [
    { name: 'Docker', component: <LucideIcons.Box className="text-blue-500" /> },
    { name: 'Kubernetes', component: <LucideIcons.Boxes className="text-blue-500" /> },
    { name: 'Jenkins', component: <LucideIcons.Cog className="text-red-500" /> },
    { name: 'Git', component: <LucideIcons.GitBranch className="text-orange-500" /> },
    { name: 'CI/CD', component: <LucideIcons.Repeat className="text-green-500" /> },
    { name: 'Terraform', component: <LucideIcons.FileCode className="text-purple-500" /> },
  ];
  return devOpsIcons;
};

// Create Flow Control Icons
const createFlowControlIcons = () => {
  const flowControlIcons = [
    { name: 'Start', component: <LucideIcons.PlayCircle className="text-green-500" /> },
    { name: 'End', component: <LucideIcons.StopCircle className="text-red-500" /> },
    { name: 'Decision', component: <LucideIcons.GitBranch className="text-yellow-500" /> },
    { name: 'Process', component: <LucideIcons.Cog className="text-blue-500" /> },
    { name: 'Input', component: <LucideIcons.ArrowDownToLine className="text-purple-500" /> },
    { name: 'Output', component: <LucideIcons.ArrowUpFromLine className="text-orange-500" /> },
    { name: 'Delay', component: <LucideIcons.Clock className="text-gray-500" /> },
    { name: 'Loop', component: <LucideIcons.Repeat className="text-cyan-500" /> },
  ];
  return flowControlIcons;
};

// Create General Icons from Lucide
const createGeneralIcons = () => {
  // Get a subset of Lucide icons
  const iconNames = [
    'Server', 'Database', 'Cloud', 'Code', 'Globe', 'Cpu', 'HardDrive', 
    'Layers', 'Lock', 'Smartphone', 'Wifi', 'Monitor', 'FileCode', 
    'GitBranch', 'Terminal', 'Package', 'Settings', 'Users', 
    'MessageSquare', 'BarChart', 'Activity', 'AlertCircle', 'Archive',
    'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Award',
    'Bookmark', 'Calendar', 'Camera', 'Check', 'CheckCircle', 'ChevronDown',
    'ChevronUp', 'Clipboard', 'Clock', 'Copy', 'CreditCard', 'Download',
    'Edit', 'ExternalLink', 'Eye', 'Facebook', 'File', 'Filter', 'Flag',
    'Folder', 'Github', 'Heart', 'Home', 'Image', 'Info', 'Instagram',
    'Link', 'List', 'Mail', 'Map', 'Menu', 'Mic', 'Moon', 'MoreHorizontal',
    'Music', 'Paperclip', 'Pause', 'Percent', 'Phone', 'Play', 'Plus',
    'Printer', 'Radio', 'RefreshCw', 'Save', 'Search', 'Send', 'Share',
    'Shield', 'ShoppingBag', 'ShoppingCart', 'Slash', 'Sliders', 'Star',
    'Sun', 'Tag', 'Trash', 'Truck', 'Twitter', 'Upload', 'User', 'Video',
    'Voicemail', 'Volume', 'X', 'Youtube', 'Zap'
  ];

  return iconNames.map(name => ({
    name,
    component: React.createElement(LucideIcons[name])
  }));
};

export const iconCategories = [
  {
    id: 'flowControl',
    name: 'Flow Control',
    icons: createFlowControlIcons(),
  },
  {
    id: 'aws',
    name: 'AWS',
    icons: createAwsIcons(),
  },
  {
    id: 'azure',
    name: 'Azure',
    icons: createAzureIcons(),
  },
  {
    id: 'gcp',
    name: 'Google Cloud',
    icons: createGcpIcons(),
  },
  {
    id: 'database',
    name: 'Database',
    icons: createDatabaseIcons(),
  },
  {
    id: 'frontend',
    name: 'Frontend',
    icons: createFrontendIcons(),
  },
  {
    id: 'backend',
    name: 'Backend',
    icons: createBackendIcons(),
  },
  {
    id: 'devOps',
    name: 'DevOps',
    icons: createDevOpsIcons(),
  },
  {
    id: 'general',
    name: 'General',
    icons: createGeneralIcons(),
  },
];