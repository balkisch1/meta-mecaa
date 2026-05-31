import { Navbar } from "../Navbar";

const LAYOUT = {
  header: 88.5,
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar variant="solid" />
      <main className="bg-background" style={{ paddingTop: LAYOUT.header }}>
        {children}
      </main>
    </>
  );
}