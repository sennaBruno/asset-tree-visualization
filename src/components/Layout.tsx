import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <header className="bg-[#1A1A40] text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src="/tractian-logo.svg" alt="Tractian" className="h-8" />
              <div className="h-6 w-px bg-gray-700" />
              <span className="text-sm">Assets Page - MOTOR RT COAL AF01</span>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-500 px-3 py-1 rounded text-sm">Apex Unit</button>
              <button className="bg-blue-500 px-3 py-1 rounded text-sm">Tobias Unit</button>
              <button className="bg-blue-500 px-3 py-1 rounded text-sm">Jaguar Unit</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6">{children}</div>
      </main>
    </div>
  );
};
