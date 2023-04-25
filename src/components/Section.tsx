import { Video } from '@/graphql/generated/graphql';
import { Card } from './Card';
import Link from 'next/link';

type Props = {
  genre: string;
  videos: Video[];
};

export function Section({ genre, videos }: Props) {
  return (
    <section>
      <h3 className="font-bold">{genre}</h3>

      <div className="grid grid-cols-3">
        {videos &&
          videos.map((video) => {
            if (video.thumbnail) {
              return (
                <Link
                  href={`video/${video.slug}`}
                  key={`video-${video.id}`}
                  className="flex"
                >
                  <Card alt={video.title} thumbnail={video?.thumbnail?.url} />
                </Link>
              );
            }
          })}
      </div>
    </section>
  );
}
