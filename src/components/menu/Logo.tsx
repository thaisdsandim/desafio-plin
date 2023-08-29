import Image from 'next/image';

export default function Logo() {
  return (
    <a href="/" className="-m-1.5 p-1.5">
      <span className="sr-only">Thais Sandim</span>
      <Image className="h-8 w-auto" src="/avatar.svg" alt="Logo" width={128} height={128} />
    </a>
  );
}
