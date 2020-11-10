import React from 'react';
import { Post, useGetUserPostsQuery } from 'codegen/graphql-apollo';
import useVisibility from 'hooks/useVisibility';
import { GrowAlert } from './Alert';
import PostCard, { PostCardSkeleton } from './PostCard';
import { Box } from '@material-ui/core';
type PostFeedProps = {
  userId?: string;
};

const PostFeed: React.FC<PostFeedProps> = ({ userId = '' }) => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [isVisible, ref] = useVisibility<HTMLDivElement>();
  const [variables, setVariables] = React.useState({ userId });
  const { data, error, loading } = useGetUserPostsQuery({ variables });

  React.useEffect(() => {
    if (isVisible && posts.length > 0) {
      const { id, range, data } = posts[posts.length - 1];
      const lastKey = { id, range, data };
      const variables = { userId, lastKey };
      console.log('vars', variables);
      setVariables(variables);
    }
  }, [isVisible]);

  React.useEffect(() => {
    if (data) {
      setPosts(posts.concat(data.getUserPosts as Post[]));
    } else if (error) {
      console.error('Failed to load posts.', error);
    }
  }, [data, error]);

  return (
    <Box minWidth="100%">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {error && (
        <GrowAlert active={!!error} severity="error">
          Failed to load posts
        </GrowAlert>
      )}
      {loading && (
        <Box width="100%">
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </Box>
      )}
      <div ref={ref} />
    </Box>
  );
};

export default PostFeed;
