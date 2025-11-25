import { notFound } from 'next/navigation';
import { getUserByUsername, getPostsByUser } from '@/lib/data';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { PostCard } from '@/components/feed/PostCard';
import { Separator } from '@/components/ui/separator';

export const revalidate = 0; // Make this page dynamic

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const user = await getUserByUsername(params.username);
  if (!user) {
    notFound();
  }

  const posts = await getPostsByUser(user.id);

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileHeader userId={user.id} />
      <Separator className="my-8" />
      <div>
        <h2 className="font-headline text-2xl font-bold mb-6">{user.name}'s Posts</h2>
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>@{user.username} hasn't posted anything yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
