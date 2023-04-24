import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className="flex py-4 bg-zinc-400 w-full justify-center">
      <div className="container flex justify-between">
        <Image
          src="/vercel.svg"
          alt="logo img"
          className="object-fit"
          width={100}
          height={24}
        />

        <nav className="">
          <ul className="flex gap-3">
            <li>
              <Link href="/">Link 1</Link>
            </li>
            <li>
              <Link href="/">Link 2</Link>
            </li>
            <li>
              <Link href="/">Link 3</Link>
            </li>
            <li>
              <Link href="/">Link 4</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
