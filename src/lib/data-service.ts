/**
 * Amantle Data Service
 * 
 * Единый API для работы с данными.
 * Автоматически выбирает: Supabase (если настроен) или localStorage (fallback).
 * 
 * Использование во всех страницах одинаковое:
 *   import { dataService } from '~/lib/data-service';
 *   const posts = await dataService.getAllPosts();
 */

import {
  supabase,
  useFallbackMode,
  signUp as sbSignUp,
  signIn as sbSignIn,
  signOut as sbSignOut,
  getSession,
  getUser,
  getProfile,
  updateProfile as sbUpdateProfile,
  createPost as sbCreatePost,
  getAllPosts as sbGetAllPosts,
  getUserPosts as sbGetUserPosts,
  deletePost as sbDeletePost,
  updatePost as sbUpdatePost,
  toggleLike as sbToggleLike,
  addComment as sbAddComment,
  getComments as sbGetComments,
  uploadAvatar as sbUploadAvatar,
  uploadPostImage as sbUploadPostImage,
} from './supabase';

// ========================
// TYPES
// ========================

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  plan: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  status: string;
  likes: number;
  comments: number;
  createdAt: string;
  author: string;
  authorId: string;
  avatar: string;
}

// ========================
// LocalStorage Fallback
// ========================

class LocalStorageService {
  // AUTH
  async signUp(email: string, password: string, name: string): Promise<UserProfile> {
    const users = JSON.parse(localStorage.getItem('amantle_users') || '[]');
    if (users.find((u: any) => u.email === email)) {
      throw new Error('Пользователь с такой почтой уже существует');
    }
    if (password.length < 6) {
      throw new Error('Пароль должен быть не менее 6 символов');
    }

    const user = {
      id: Date.now().toString(),
      name,
      email,
      password,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=515f74&textColor=ffffff`,
      bio: '',
      plan: 'free',
      createdAt: new Date().toISOString(),
      posts: [],
    };

    users.push(user);
    localStorage.setItem('amantle_users', JSON.stringify(users));
    const { password: _, posts: __, ...safeUser } = user;
    localStorage.setItem('amantle_current_user', JSON.stringify(safeUser));

    return this._mapUser(user);
  }

  async signIn(email: string, password: string): Promise<UserProfile> {
    const users = JSON.parse(localStorage.getItem('amantle_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) throw new Error('Неверная почта или пароль');

    const { password: _, posts: __, ...safeUser } = user;
    localStorage.setItem('amantle_current_user', JSON.stringify(safeUser));
    return this._mapUser(user);
  }

  async signOut(): Promise<void> {
    localStorage.removeItem('amantle_current_user');
  }

  async getCurrentUser(): Promise<UserProfile | null> {
    const data = localStorage.getItem('amantle_current_user');
    if (!data) return null;
    const user = JSON.parse(data);
    return this._mapUser(user);
  }

  async getProfile(userId: string): Promise<UserProfile | null> {
    const users = JSON.parse(localStorage.getItem('amantle_users') || '[]');
    const user = users.find((u: any) => u.id === userId);
    return user ? this._mapUser(user) : null;
  }

  async updateProfile(userId: string, updates: { name?: string; bio?: string; avatar?: string }): Promise<void> {
    const users = JSON.parse(localStorage.getItem('amantle_users') || '[]');
    const idx = users.findIndex((u: any) => u.id === userId);
    if (idx >= 0) {
      if (updates.name) users[idx].name = updates.name;
      if (updates.bio !== undefined) users[idx].bio = updates.bio;
      if (updates.avatar) users[idx].avatar = updates.avatar;
      localStorage.setItem('amantle_users', JSON.stringify(users));

      // Update current user cache
      const current = JSON.parse(localStorage.getItem('amantle_current_user') || '{}');
      if (current.id === userId) {
        Object.assign(current, updates);
        localStorage.setItem('amantle_current_user', JSON.stringify(current));
      }
    }
  }

  // POSTS
  async createPost(post: { title: string; content: string; excerpt?: string; category?: string; image?: string; status?: string }): Promise<Post> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) throw new Error('Не авторизован');

    const users = JSON.parse(localStorage.getItem('amantle_users') || '[]');
    const idx = users.findIndex((u: any) => u.id === currentUser.id);
    if (idx < 0) throw new Error('Пользователь не найден');

    const plainText = (post.content || '').replace(/<[^>]*>/g, '');
    const newPost = {
      id: Date.now().toString(),
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || plainText.substring(0, 150),
      category: post.category || 'Заметка',
      image: post.image || '',
      status: post.status || 'published',
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };

    if (!users[idx].posts) users[idx].posts = [];
    users[idx].posts.unshift(newPost);
    localStorage.setItem('amantle_users', JSON.stringify(users));

    return {
      ...newPost,
      author: currentUser.name,
      authorId: currentUser.id,
      avatar: currentUser.avatar,
    };
  }

  async getAllPosts(): Promise<Post[]> {
    const users = JSON.parse(localStorage.getItem('amantle_users') || '[]');
    const allPosts: Post[] = [];
    users.forEach((user: any) => {
      if (user.posts && user.posts.length) {
        user.posts.forEach((post: any) => {
          if (post.status === 'published') {
            allPosts.push({
              ...post,
              author: user.name,
              authorId: user.id,
              avatar: user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=515f74&textColor=ffffff`,
            });
          }
        });
      }
    });
    return allPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getUserPosts(userId: string): Promise<Post[]> {
    const users = JSON.parse(localStorage.getItem('amantle_users') || '[]');
    const user = users.find((u: any) => u.id === userId);
    if (!user || !user.posts) return [];
    return user.posts.map((p: any) => ({
      ...p,
      author: user.name,
      authorId: user.id,
      avatar: user.avatar,
    }));
  }

  async deletePost(postId: string): Promise<void> {
    const currentUser = await this.getCurrentUser();
    if (!currentUser) throw new Error('Не авторизован');

    const users = JSON.parse(localStorage.getItem('amantle_users') || '[]');
    const idx = users.findIndex((u: any) => u.id === currentUser.id);
    if (idx >= 0 && users[idx].posts) {
      users[idx].posts = users[idx].posts.filter((p: any) => p.id !== postId);
      localStorage.setItem('amantle_users', JSON.stringify(users));
    }
  }

  async toggleLike(postId: string): Promise<boolean> {
    // Simple toggle without persistence in localStorage mode
    return true;
  }

  async uploadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = () => reject(new Error('Ошибка чтения файла'));
      reader.readAsDataURL(file);
    });
  }

  private _mapUser(user: any): UserProfile {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio || '',
      avatar: user.avatar || user.avatar_url || '',
      plan: user.plan || 'free',
      createdAt: user.createdAt || user.created_at || new Date().toISOString(),
    };
  }
}

// ========================
// Supabase Service
// ========================

class SupabaseService {
  async signUp(email: string, password: string, name: string): Promise<UserProfile> {
    const data = await sbSignUp(email, password, name);
    if (!data.user) throw new Error('Ошибка регистрации');
    const profile = await getProfile(data.user.id);
    return this._mapProfile(profile);
  }

  async signIn(email: string, password: string): Promise<UserProfile> {
    const data = await sbSignIn(email, password);
    if (!data.user) throw new Error('Ошибка входа');
    const profile = await getProfile(data.user.id);
    return this._mapProfile(profile);
  }

  async signOut(): Promise<void> {
    await sbSignOut();
  }

  async getCurrentUser(): Promise<UserProfile | null> {
    const session = await getSession();
    if (!session?.user) return null;
    try {
      const profile = await getProfile(session.user.id);
      return this._mapProfile(profile);
    } catch {
      return null;
    }
  }

  async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const profile = await getProfile(userId);
      return this._mapProfile(profile);
    } catch {
      return null;
    }
  }

  async updateProfile(userId: string, updates: { name?: string; bio?: string; avatar?: string }): Promise<void> {
    await sbUpdateProfile(userId, {
      name: updates.name,
      bio: updates.bio,
      avatar_url: updates.avatar,
    });
  }

  async createPost(post: { title: string; content: string; excerpt?: string; category?: string; image?: string; status?: string }): Promise<Post> {
    const data = await sbCreatePost({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      image_url: post.image,
      status: post.status,
    });

    const user = await this.getCurrentUser();
    return {
      id: data.id,
      title: data.title,
      content: data.content || '',
      excerpt: data.excerpt || '',
      category: data.category,
      image: data.image_url || '',
      status: data.status,
      likes: data.likes_count,
      comments: data.comments_count,
      createdAt: data.created_at,
      author: user?.name || '',
      authorId: data.author_id,
      avatar: user?.avatar || '',
    };
  }

  async getAllPosts(): Promise<Post[]> {
    const data = await sbGetAllPosts();
    return (data || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      content: p.content || '',
      excerpt: p.excerpt || '',
      category: p.category,
      image: p.image_url || '',
      status: p.status,
      likes: p.likes_count,
      comments: p.comments_count,
      createdAt: p.created_at,
      author: p.profiles?.name || 'Аноним',
      authorId: p.author_id,
      avatar: p.profiles?.avatar_url || '',
    }));
  }

  async getUserPosts(userId: string): Promise<Post[]> {
    const data = await sbGetUserPosts(userId);
    const profile = await this.getProfile(userId);
    return (data || []).map((p: any) => ({
      id: p.id,
      title: p.title,
      content: p.content || '',
      excerpt: p.excerpt || '',
      category: p.category,
      image: p.image_url || '',
      status: p.status,
      likes: p.likes_count,
      comments: p.comments_count,
      createdAt: p.created_at,
      author: profile?.name || 'Аноним',
      authorId: p.author_id,
      avatar: profile?.avatar || '',
    }));
  }

  async deletePost(postId: string): Promise<void> {
    await sbDeletePost(postId);
  }

  async toggleLike(postId: string): Promise<boolean> {
    return await sbToggleLike(postId);
  }

  async uploadImage(file: File): Promise<string> {
    return await sbUploadPostImage(file);
  }

  private _mapProfile(profile: any): UserProfile {
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email || '',
      bio: profile.bio || '',
      avatar: profile.avatar_url || '',
      plan: profile.plan || 'free',
      createdAt: profile.created_at,
    };
  }
}

// ========================
// EXPORT SINGLETON
// ========================

const fallbackService = new LocalStorageService();
const supabaseService = new SupabaseService();

/**
 * Единый сервис данных.
 * Автоматически выбирает backend:
 * - Supabase (если настроен)
 * - localStorage (fallback, как сейчас)
 */
export const dataService = useFallbackMode() ? fallbackService : supabaseService;

/** Режим работы: 'supabase' или 'localStorage' */
export const backendMode = useFallbackMode() ? 'localStorage' : 'supabase';
