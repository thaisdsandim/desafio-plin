import { useState } from 'react';
import { Popover } from '@headlessui/react';
import Logo from './menu/Logo';
import MobileMenuButton from './menu/MobileMenuButton';
import NavItem from './menu/NavItem';
import MobileMenu from './menu/MobileMenu';

export default function Menu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-black">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Logo />
        </div>
        <div className="flex lg:hidden">
          <MobileMenuButton onClick={() => setMobileMenuOpen(true)} />
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <NavItem href="/" text="Página Inicial" />
          <NavItem href="/clima" text="Clima" />
          <NavItem href="/cep" text="Consulta CEP" />
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}