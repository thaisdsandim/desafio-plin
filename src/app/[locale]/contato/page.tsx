"use client"

import { useEffect } from "react";
import Menu from "@/components/menu/Menu";

export default function Contato() {
  useEffect(() => {
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    const currentPath = window.location.pathname;

    if (selectedLanguage && !currentPath.startsWith('/' + selectedLanguage + '/contato')) {
      window.location.href = `/${selectedLanguage}/contato`;
    } 
  }, []);

  return (
    <>
      <Menu />
      <div>
      </div>
    </>
  );
}
