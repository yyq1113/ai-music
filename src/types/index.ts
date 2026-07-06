export type UserRole = 'user' | 'admin';

export interface Track {
  id: string;
  title: string;
  prompt: string;
  style: string;
  audioUrl: string;
  coverUrl: string;
  durationMs: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
}

export interface GenerateTask {
  taskId: string;
  status: 'processing' | 'completed' | 'failed';
  progress: number;
  track?: Track;
}