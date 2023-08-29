interface NavItemProps {
  href: string;
  text: string;
}

export default function NavItem({ href, text }: NavItemProps) {
  return (
    <a
      href={href}
      className="text-sm font-semibold leading-6 text-white hover:bg-gray-50 hover:text-black px-3 py-2 rounded-lg"
    >
      {text}
    </a>
  );
}