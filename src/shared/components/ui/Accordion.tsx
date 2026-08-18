import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export const Accordion: React.FC<{ items: AccordionItem[]; allowMultiple?: boolean }> = ({
  items,
  allowMultiple = false,
}) => {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id]);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="divide-y divide-slate-200 border-y border-slate-200">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-4">
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex items-center justify-between text-left focus:outline-none group"
            >
              <span className="font-serif text-base font-semibold text-primary group-hover:text-accent transition-colors">
                {item.title}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-primary' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="mt-3 text-sm text-slate-600 leading-relaxed animate-fade-in pr-6">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
