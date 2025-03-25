import { FlowDiagramEditor } from "@/components/flow/FlowDiagramEditor";

export const metadata = {
  title: "Flow Diagram Editor",
  description: "Interactive Animated Flow Diagram Maker",
};

export default function FlowPage() {
  return (
    <div className="min-h-screen w-full">
      <FlowDiagramEditor />
    </div>
  );
}