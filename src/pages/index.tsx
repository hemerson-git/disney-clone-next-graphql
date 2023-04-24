import Image from 'next/image';
import { Inter } from 'next/font/google';

import { Section } from '@/components/Section';

import { clientAPI } from '@/graphql/client';
import { VideosQuery } from '@/graphql/queries';

import { Card } from '@/components/Card';
import { GetStaticProps } from 'next';
import { Video } from '@/graphql/generated/graphql';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

type VideosProps = {
  videos: Video[];
};

export const getStaticProps: GetStaticProps = async () => {
  const data = (await clientAPI.request(VideosQuery)) as VideosProps;

  const { videos } = data;

  console.log(videos);

  return {
    props: {
      videos,
    },
  };
};

export default function Home({ videos }: VideosProps) {
  const [mainVideo, setMainVideo] = useState<Video | null>(null);

  function randomVideo(videos: Video[]) {
    const randomNumber = Math.floor(Math.random() * videos.length);
    return videos[randomNumber];
  }

  useEffect(() => {
    const video = randomVideo(videos);
    setMainVideo(video);
  }, [videos]);

  return (
    <main className="flex flex-col items-center justify-between p-12">
      <div className="w-full h-[30vh] overflow-hidden mb-12">
        {mainVideo?.thumbnail && (
          <Image
            src={mainVideo?.thumbnail?.url}
            width={1200}
            height={400}
            className="object-cover object-center h-full w-full"
            alt={mainVideo.title}
          />
        )}
      </div>

      <div className="">
        <Section genre="Family" />
        <Section genre="Adventure" />
        <Section genre="Action" />
        <Section genre="Fantasy" />
      </div>

      <div>
        {videos.map((video) => {
          if (video?.thumbnail) {
            return (
              <Card
                key={`video-${video.id}`}
                thumbnail={video?.thumbnail?.url}
                alt={video.title}
              />
            );
          }
        })}
      </div>
    </main>
  );
}
