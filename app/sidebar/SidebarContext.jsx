"use client";
import React, { useState, createContext } from "react";

export const SidebarContext = createContext();

export default function SideBarProvider({ children }) {
  //sidebar state
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, handleClose }}>
      {children}
    </SidebarContext.Provider>
  );
}
