import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BusinessType = 'RETAIL' | 'PHARMACY' | 'RESTAURANT' | 'HARDWARE' | 'SERVICE';

export interface BusinessModule {
  id: string;
  name: string;
  enabled: boolean;
  requiredFor: BusinessType[];
}

interface BusinessState {
  businessName: string;
  businessType: BusinessType;
  currency: string;
  taxRate: number;
  modules: BusinessModule[];
  
  // Actions
  setBusinessType: (type: BusinessType) => void;
  toggleModule: (moduleId: string) => void;
  updateSettings: (settings: Partial<BusinessState>) => void;
}

const defaultModules: BusinessModule[] = [
  { id: 'inventory', name: 'Inventory Management', enabled: true, requiredFor: ['RETAIL', 'PHARMACY', 'HARDWARE'] },
  { id: 'prescriptions', name: 'Prescription Tracking', enabled: false, requiredFor: ['PHARMACY'] },
  { id: 'tables', name: 'Table Management', enabled: false, requiredFor: ['RESTAURANT'] },
  { id: 'analytics', name: 'Advanced Analytics', enabled: true, requiredFor: [] },
  { id: 'barcode', name: 'Barcode Scanning', enabled: true, requiredFor: ['RETAIL', 'SUPERMARKET' as any] },
];

export const useBusinessStore = create<BusinessState>()(
  persist(
    (set) => ({
      businessName: 'Universal Enterprise',
      businessType: 'RETAIL',
      currency: 'KES',
      taxRate: 16,
      modules: defaultModules,

      setBusinessType: (type) => set((state) => ({
        businessType: type,
        // Auto-enable required modules for the business type
        modules: state.modules.map(m => ({
          ...m,
          enabled: m.requiredFor.includes(type) || m.enabled
        }))
      })),

      toggleModule: (id) => set((state) => ({
        modules: state.modules.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m)
      })),

      updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
    }),
    {
      name: 'smart-pos-business-config',
    }
  )
);
