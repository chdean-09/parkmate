import Header from "@/components/custom/header";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col h-screen">
      <Header />
      {children}
    </section>
  );
}
