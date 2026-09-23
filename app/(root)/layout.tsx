import Footer from "@/components/footer";
import Header from "@/components/shared/header";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper py-6">{children}</main>
      <Footer />
    </div>
  );
}
