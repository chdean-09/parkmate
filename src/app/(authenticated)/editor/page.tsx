import EditorForm from "@/components/custom/editorForm";
import { GridStackWidget } from "gridstack";
import { Suspense } from "react";

const layoutMock: GridStackWidget[] = [
  {
    x: 0,
    y: 0,
    content:
      '<div style="transform: rotate(0deg);">1</div><img alt="Rotate" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" class="cursor-pointer m-auto" style="color: transparent;" srcset="/_next/image?url=%2Frotate.png&amp;w=32&amp;q=75 1x, /_next/image?url=%2Frotate.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=%2Frotate.png&amp;w=48&amp;q=75">',
  },
  {
    x: 1,
    y: 0,
    content:
      '<div style="transform: rotate(0deg);">2</div><img alt="Rotate" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" class="cursor-pointer m-auto" style="color: transparent;" srcset="/_next/image?url=%2Frotate.png&amp;w=32&amp;q=75 1x, /_next/image?url=%2Frotate.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=%2Frotate.png&amp;w=48&amp;q=75">',
  },
  {
    x: 2,
    y: 0,
    content:
      '<div style="transform: rotate(0deg);">3</div><img alt="Rotate" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" class="cursor-pointer m-auto" style="color: transparent;" srcset="/_next/image?url=%2Frotate.png&amp;w=32&amp;q=75 1x, /_next/image?url=%2Frotate.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=%2Frotate.png&amp;w=48&amp;q=75">',
  },
  {
    x: 5,
    y: 1,
    content:
      '<div style="transform: rotate(0deg);">4</div><img alt="Rotate" loading="lazy" width="20" height="20" decoding="async" data-nimg="1" class="cursor-pointer m-auto" style="color: transparent;" srcset="/_next/image?url=%2Frotate.png&amp;w=32&amp;q=75 1x, /_next/image?url=%2Frotate.png&amp;w=48&amp;q=75 2x" src="/_next/image?url=%2Frotate.png&amp;w=48&amp;q=75">',
  },
];

export default function EditorPage() {
  return (
    <div className="h-screen flex flex-col items-center">
      <Suspense fallback={<div>Loading form...</div>}>
        <EditorForm fetchedLayout={layoutMock} />
      </Suspense>
    </div>
  );
}
