import { db } from '../firebase/firebase';
import Post from '../types/Post';

export const getPosts = async () => {
  try {
    const posts: Post[] = [];
    const snapshot = await db.collection('posts').get();
    snapshot.docs.forEach(doc => {
      posts.push(doc.data() as Post);
    });
    return Promise.resolve(posts);
  } catch (error) {
    return Promise.reject(error);
  }
};