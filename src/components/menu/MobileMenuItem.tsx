interface MobileMenuItemProps {
  href: string;
  text: string;
}

export default function MobileMenuItem({ href, text }: MobileMenuItemProps) {
  return (
    <a
      href={href}
      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50 hover:text-black"
    >
      {text}
    </a>
  );
}