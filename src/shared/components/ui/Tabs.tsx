import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export const Tabs: React.FC<{ items: TabItem[] }> = ({ items }) => {
  const [activeTab, setActiveTab] = useState(items[0]?.id);

  return (
    <div className="w-full">
      <div className="flex border-b border-slate-200 gap-8 overflow-x-auto no-scrollbar">
        {items.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 text-sm font-medium tracking-wide border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-6">
        {items.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
