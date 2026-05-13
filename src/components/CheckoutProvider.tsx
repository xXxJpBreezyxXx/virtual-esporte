'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import CheckoutModal from './CheckoutModal';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  gallery?: string[];
}

interface CheckoutContextType {
  openCheckout: (product: Product) => void;
  closeCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openCheckout = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const closeCheckout = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <CheckoutContext.Provider value={{ openCheckout, closeCheckout }}>
      {children}
      <CheckoutModal 
        isOpen={isOpen} 
        onClose={closeCheckout} 
        product={selectedProduct} 
      />
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
