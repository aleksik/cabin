export default interface Post {
  title: string;
  content: string;
  coverImage: string | null;
  createdAt: Date;
}