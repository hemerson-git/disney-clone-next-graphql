import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="h-20 w-full flex items-center">
      <Link href="/">
        <Image
          src="/disney_logo.png"
          alt="Disney Logo"
          width={90}
          height={60}
        />
      </Link>
    </nav>
  );
}
