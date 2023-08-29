import { Bars3Icon } from '@heroicons/react/24/outline';

interface MobileMenuButtonProps {
  onClick: () => void;
}

export default function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
      onClick={onClick}
    >
      <span className="sr-only">Open main menu</span>
      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}