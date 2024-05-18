import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonMap() {
  return (
    <div className="h-56 w-full flex flex-col space-y-3">
      ASDugasiudhasudh
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
