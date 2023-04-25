import { Account } from '@/graphql/generated/graphql';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  account: Account;
};

export function Navbar({ account }: Props) {
  return (
    <header className="h-20 w-full flex items-center justify-between">
      <Link href="/">
        <Image
          src="/disney_logo.png"
          alt="Disney Logo"
          width={90}
          height={60}
        />
      </Link>

      <div className="flex h-1/2 items-center">
        <span>Welcome {account.username}</span>
        {account.avatar && (
          <Image
            src={account.avatar?.url}
            alt={''}
            width={48}
            height={48}
            className="rounded-full ml-[10px]"
          />
        )}
      </div>
    </header>
  );
}
