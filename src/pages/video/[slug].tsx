import { NextPageContext } from 'next';
import { clientAPI } from '@/graphql/client';
import { VideoQuery } from '@/graphql/queries';
import { Video } from '@/graphql/generated/graphql';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type DataProps = {
  video: Video;
};

export const getServerSideProps = async (pageContext: NextPageContext) => {
  const pageSlug = pageContext.query.slug;

  const variables = {
    pageSlug,
  };

  const data = (await clientAPI.request(VideoQuery, variables)) as DataProps;
  const { video } = data;

  return {
    props: {
      video,
    },
  };
};

function Video({ video }: DataProps) {
  const [isWatching, setIsWatching] = useState(false);
  const [isVideoHidden, setIsVideoHidden] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  async function handleClick() {
    if (!isWatching) {
      setIsWatching(true);
    }

    setIsVideoHidden(false);
  }

  useEffect(() => {
    if (isWatching && videoRef.current && !isVideoHidden) {
      videoRef.current?.play();
    }
  }, [isWatching, isVideoHidden]);

  return (
    <>
      {video.thumbnail && (!isWatching || isVideoHidden) && (
        <Image
          src={video.thumbnail?.url}
          alt={video.title}
          width={640}
          height={480}
          className="object-cover w-full absolute top-0 h-[98vh]"
        />
      )}

      {(!isWatching || isVideoHidden) && (
        <div className="relative mt-[30%] ml-12 max-w-[50%]">
          <p className="mb-4">{video.description}</p>

          <div className="mb-2">
            <span>{video.tags.join(', ')}</span>
          </div>

          <Link href="/" className="flex-1">
            Go back
          </Link>

          <button className="absolute" onClick={handleClick}>
            Play
          </button>
        </div>
      )}

      {isWatching && (
        <video
          className="w-full"
          controls
          ref={videoRef}
          onPause={() => {
            setIsVideoHidden(true);
          }}
          style={{
            position: 'absolute',
            top: 0,
            height: '98vh',
            display: isVideoHidden ? 'none' : 'initial',
          }}
        >
          <source src={video.mp4.url} />
        </video>
      )}
    </>
  );
}

export default Video;
