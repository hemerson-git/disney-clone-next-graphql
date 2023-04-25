import { clientAPI } from '@/graphql/client';
import { VideoPublish, VideoSeenMutation } from '@/graphql/queries';

export default async function changeVideoToSeen({ body }: any, res: any) {
  console.log(body);

  await clientAPI.request(VideoSeenMutation, {
    slug: body.slug,
  });

  await clientAPI.request(VideoPublish, {
    slug: body.slug,
  });

  res.status(201).json({ slug: body.slug });
}
