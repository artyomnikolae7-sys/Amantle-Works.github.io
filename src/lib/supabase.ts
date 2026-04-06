/**
 * Supabase Client для Amantle
 * 
 * НАСТРОЙКА:
 * 1. Создай проект на https://supabase.com
 * 2. Скопируй URL и anon key из Settings → API
 * 3. Замени значения ниже
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// ⚠️ ЗАМЕНИ на свои значения из Supabase Dashboard → Settings → API
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

/**
 * Проверка подключения Supabase
 * Возвращает true если URL и ключ настроены (не дефолтные)
 */
export function isSupabaseConfigured(): boolean {
  return !SUPABASE_URL.includes('YOUR_PROJECT_ID') && !SUPABASE_ANON_KEY.includes('YOUR_ANON_KEY');
}

// ========================
// AUTH HELPERS
// ========================

/** Регистрация по email + пароль */
export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });

  if (error) throw error;

  // Создаём профиль в таблице profiles
  if (data.user) {
    await supabase.from('profiles').upsert({
      id: data.user.id,
      name,
      email,
      avatar_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=515f74&textColor=ffffff`,
    });
  }

  return data;
}

/** Вход по email + пароль */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

/** Выход */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/** Получить текущую сессию */
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

/** Получить текущего пользователя */
export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/** Получить профиль текущего пользователя */
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

/** Обновить профиль */
export async function updateProfile(userId: string, updates: { name?: string; bio?: string; avatar_url?: string }) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ========================
// POSTS HELPERS
// ========================

/** Создать пост */
export async function createPost(post: {
  title: string;
  content: string;
  excerpt?: string;
  category?: string;
  image_url?: string;
  status?: string;
}) {
  const user = await getUser();
  if (!user) throw new Error('Не авторизован');

  const { data, error } = await supabase
    .from('posts')
    .insert({
      author_id: user.id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 150),
      category: post.category || 'Заметка',
      image_url: post.image_url || null,
      status: post.status || 'published',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** Получить все посты (для ленты) */
export async function getAllPosts(limit = 50) {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:author_id (name, avatar_url)
    `)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

/** Получить посты пользователя */
export async function getUserPosts(userId: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('author_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/** Удалить пост */
export async function deletePost(postId: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', postId);
  if (error) throw error;
}

/** Обновить пост */
export async function updatePost(postId: string, updates: Partial<{
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image_url: string;
  status: string;
}>) {
  const { data, error } = await supabase
    .from('posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', postId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ========================
// LIKES HELPERS
// ========================

/** Поставить/убрать лайк */
export async function toggleLike(postId: string) {
  const user = await getUser();
  if (!user) throw new Error('Не авторизован');

  // Проверяем есть ли уже лайк
  const { data: existing } = await supabase
    .from('likes')
    .select('id')
    .eq('user_id', user.id)
    .eq('post_id', postId)
    .maybeSingle();

  if (existing) {
    // Убираем лайк
    await supabase.from('likes').delete().eq('id', existing.id);
    await supabase.rpc('decrement_likes', { post_id_input: postId });
    return false; // unliked
  } else {
    // Ставим лайк
    await supabase.from('likes').insert({ user_id: user.id, post_id: postId });
    await supabase.rpc('increment_likes', { post_id_input: postId });
    return true; // liked
  }
}

/** Проверить лайкнул ли пользователь пост */
export async function isPostLiked(postId: string, userId: string) {
  const { data } = await supabase
    .from('likes')
    .select('id')
    .eq('user_id', userId)
    .eq('post_id', postId)
    .maybeSingle();
  return !!data;
}

// ========================
// COMMENTS HELPERS
// ========================

/** Создать комментарий */
export async function addComment(postId: string, content: string) {
  const user = await getUser();
  if (!user) throw new Error('Не авторизован');

  const { data, error } = await supabase
    .from('comments')
    .insert({ user_id: user.id, post_id: postId, content })
    .select(`*, profiles:user_id (name, avatar_url)`)
    .single();

  if (error) throw error;

  // Увеличиваем счётчик комментариев
  await supabase.rpc('increment_comments', { post_id_input: postId });

  return data;
}

/** Получить комментарии к посту */
export async function getComments(postId: string) {
  const { data, error } = await supabase
    .from('comments')
    .select(`*, profiles:user_id (name, avatar_url)`)
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
}

// ========================
// STORAGE HELPERS
// ========================

/** Загрузить аватар */
export async function uploadAvatar(userId: string, file: File) {
  const ext = file.name.split('.').pop();
  const path = `avatars/${userId}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('media')
    .upload(path, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(path);

  // Обновляем профиль
  await updateProfile(userId, { avatar_url: publicUrl });

  return publicUrl;
}

/** Загрузить обложку поста */
export async function uploadPostImage(file: File) {
  const user = await getUser();
  if (!user) throw new Error('Не авторизован');

  const ext = file.name.split('.').pop();
  const path = `posts/${user.id}/${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('media')
    .upload(path, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(path);

  return publicUrl;
}

// ========================
// FALLBACK (localStorage) — для работы без Supabase
// ========================

/**
 * Режим совместимости: если Supabase не настроен,
 * используем localStorage как раньше.
 */
export function useFallbackMode(): boolean {
  return !isSupabaseConfigured();
}
