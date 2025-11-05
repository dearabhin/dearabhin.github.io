
export interface Project {
  title: string;
  githubUrl: string;
  date: string;
  description: string;
  tags: string[];
}

export interface BlogPost {
  title: string;
  excerpt: string;
  url: string;
}

export type PostContentType = 
  | { type: 'about'; text: string }
  | { type: 'education'; degree: string; college: string; duration: string }
  | { type: 'skills'; skills: string[] }
  | { type: 'projects'; projects: Project[] }
  | { type: 'interests'; interests: string[] }
  | { type: 'blog'; posts: BlogPost[] };

export interface ChannelPostData {
  id: number;
  forwardedFrom: string;
  author: string;
  content: PostContentType;
  timestamp: string;
}
