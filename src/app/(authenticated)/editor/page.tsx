import EditorForm from "@/components/custom/editorForm";
import { Suspense } from "react";

export default function EditorPage() {
  return (
    <div className="h-screen flex flex-col items-center">
      <Suspense fallback={<div>Loading form...</div>}>
        <EditorForm />
      </Suspense>
    </div>
  );
}
