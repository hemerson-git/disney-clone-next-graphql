import Image from 'next/image';
import { Inter } from 'next/font/google';

import { Section } from '@/components/Section';

import { clientAPI } from '@/graphql/client';
import { AccountQuery, VideosQuery } from '@/graphql/queries';

import { GetStaticProps } from 'next';
import { Account, Video } from '@/graphql/generated/graphql';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';

// const inter = Inter({ subsets: ['latin'] });

type VideosProps = {
  videos: Video[];
};

type AccountProps = {
  account: Account;
};

type Props = {
  videos: Video[];
  account: Account;
};

export const getStaticProps: GetStaticProps = async () => {
  const data = (await clientAPI.request(VideosQuery)) as VideosProps;
  const accountData = (await clientAPI.request(AccountQuery)) as AccountProps;

  const { videos } = data;
  const { account } = accountData;

  return {
    props: {
      videos,
      account,
    },
  };
};

export default function Home({ videos, account }: Props) {
  const [mainVideo, setMainVideo] = useState<Video | null>(null);

  function randomVideo(videos: Video[]) {
    const randomNumber = Math.floor(Math.random() * videos.length);
    return videos[randomNumber];
  }

  function filterVideoByCategory(videos: Video[], genre: string) {
    return videos.filter((video) =>
      video.tags.map((tag) => tag.toLowerCase()).includes(genre)
    );
  }

  function getUnseenVideos(videos: Video[]) {
    return videos.filter((video) => !video.seen);
  }

  useEffect(() => {
    const video = randomVideo(videos);
    setMainVideo(video);
  }, [videos]);

  return (
    <>
      <Navbar account={account} />
      <main className="flex flex-col items-center justify-between p-12">
        <div className="w-full h-[30vh] overflow-hidden mb-12 relative">
          {mainVideo?.thumbnail && (
            <Image
              src={mainVideo?.thumbnail?.url}
              width={1200}
              height={400}
              className="object-cover object-center h-full w-full"
              alt={mainVideo.title}
              draggable={false}
            />
          )}
        </div>

        <div className="">
          <Section genre="Recommend for you" videos={getUnseenVideos(videos)} />

          <Section
            genre="Family"
            videos={filterVideoByCategory(videos, 'family')}
          />

          <Section
            genre="Adventure"
            videos={filterVideoByCategory(videos, 'adventure')}
          />

          <Section
            genre="Action"
            videos={filterVideoByCategory(videos, 'action')}
          />

          <Section
            genre="Fantasy"
            videos={filterVideoByCategory(videos, 'fantasy')}
          />

          <Section
            genre="Drama"
            videos={filterVideoByCategory(videos, 'drama')}
          />

          <Section
            genre="Classic"
            videos={filterVideoByCategory(videos, 'classic')}
          />
        </div>

        {/* <div>
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
      </div> */}
      </main>
    </>
  );
}
