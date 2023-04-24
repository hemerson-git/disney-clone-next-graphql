import Image from 'next/image';

type Props = {
  thumbnail: string;
  alt: string;
};

export function Card({ thumbnail, alt }: Props) {
  return (
    <div>
      <Image
        src={thumbnail}
        alt={alt}
        width={320}
        height={240}
        className="object-cover"
      />
    </div>
  );
}
