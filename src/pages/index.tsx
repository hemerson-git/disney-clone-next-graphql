import Image from 'next/image';
import { Inter } from 'next/font/google';

import { Section } from '@/components/Section';

import { clientAPI } from '@/graphql/client';
import { VideosQuery } from '@/graphql/videos-request';
import { Card } from '@/components/Card';

const inter = Inter({ subsets: ['latin'] });

export const getStaticProps = async () => {
  const data = await clientAPI.request(VideosQuery);

  const { videos } = data;

  console.log(videos);

  return {
    props: {
      videos,
    },
  };
};

export default function Home({ videos }) {
  function randomVideo(videos) {
    const randomNumber = Math.floor(Math.random() * videos.length);
    return videos[randomNumber];
  }

  return (
    <main className="flex flex-col items-center justify-between p-12">
      <div className="w-full h-[30vh] overflow-hidden mb-12">
        <Image
          src={randomVideo(videos)?.thumbnail?.url}
          width={1200}
          height={400}
          className="object-cover object-center h-full w-full"
          alt=""
        />
      </div>

      <div className="">
        <Section genre="Family" />
        <Section genre="Adventure" />
        <Section genre="Action" />
        <Section genre="Fantasy" />
      </div>

      <div>
        {videos.map((video) => (
          <Card
            key={`video-${video.id}`}
            thumbnail={video.thumbnail.url}
            alt={video.title}
          />
        ))}
      </div>
    </main>
  );
}
