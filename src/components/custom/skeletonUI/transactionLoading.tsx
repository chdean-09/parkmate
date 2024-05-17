import { Skeleton } from "@/components/ui/skeleton";

export function TransactionLoading() {
  return (
    <div className="h-screen w-full flex flex-col space-y-3 p-5">
      <Skeleton className="h-8 w-[100px]" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-[100px]" />
      </div>
    </div>
  );
}
