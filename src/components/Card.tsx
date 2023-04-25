import Image from 'next/image';

type Props = {
  thumbnail: string;
  alt: string;
};

export function Card({ thumbnail, alt }: Props) {
  return (
    <div className="rounded-[5%] overflow-hidden drop-shadow-card">
      <Image
        src={thumbnail}
        alt={alt}
        width={320}
        height={240}
        className="object-cover h-full"
        draggable={false}
      />
    </div>
  );
}
