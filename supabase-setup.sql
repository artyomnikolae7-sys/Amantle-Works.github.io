-- ========================================
-- Amantle — SQL для настройки Supabase
-- ========================================
-- Скопируйте этот файл и выполните в:
-- Supabase Dashboard → SQL Editor → New Query
-- ========================================

-- 1. Таблица профилей
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL DEFAULT '',
  email TEXT,
  bio TEXT DEFAULT '',
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'business')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Таблица постов
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  category TEXT DEFAULT 'Заметка',
  image_url TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Таблица лайков
CREATE TABLE IF NOT EXISTS likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- 4. Таблица комментариев
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ========================================
-- Индексы для производительности
-- ========================================
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_likes_post ON likes(post_id);
CREATE INDEX IF NOT EXISTS idx_likes_user ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id);

-- ========================================
-- Row Level Security (RLS)
-- ========================================

-- Профили
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Профили видны всем" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Пользователь может обновлять свой профиль" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Пользователь может создавать свой профиль" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Посты
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Опубликованные посты видны всем" ON posts
  FOR SELECT USING (status = 'published' OR author_id = auth.uid());

CREATE POLICY "Пользователь может создавать посты" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Пользователь может обновлять свои посты" ON posts
  FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Пользователь может удалять свои посты" ON posts
  FOR DELETE USING (auth.uid() = author_id);

-- Лайки
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Лайки видны всем" ON likes
  FOR SELECT USING (true);

CREATE POLICY "Авторизованные пользователи могут лайкать" ON likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Пользователь может убрать свой лайк" ON likes
  FOR DELETE USING (auth.uid() = user_id);

-- Комментарии
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Комментарии видны всем" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Авторизованные пользователи могут комментировать" ON comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Пользователь может удалять свои комментарии" ON comments
  FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- Функции для счётчиков (атомарные)
-- ========================================

CREATE OR REPLACE FUNCTION increment_likes(post_id_input UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET likes_count = likes_count + 1 WHERE id = post_id_input;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrement_likes(post_id_input UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET likes_count = GREATEST(0, likes_count - 1) WHERE id = post_id_input;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_comments(post_id_input UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET comments_count = comments_count + 1 WHERE id = post_id_input;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- Триггер: автоматическое создание профиля при регистрации
-- ========================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    'https://api.dicebear.com/7.x/initials/svg?seed=' || COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)) || '&backgroundColor=515f74&textColor=ffffff'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Триггер на регистрацию
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ========================================
-- Storage bucket для медиа файлов
-- ========================================
-- Выполните это ОТДЕЛЬНО или создайте bucket через Dashboard:
-- Storage → New Bucket → Name: "media" → Public: ON

INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Политики для storage
CREATE POLICY "Медиа файлы доступны всем для чтения" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

CREATE POLICY "Авторизованные могут загружать файлы" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.uid() IS NOT NULL);

CREATE POLICY "Пользователь может удалять свои файлы" ON storage.objects
  FOR DELETE USING (bucket_id = 'media' AND auth.uid() IS NOT NULL);

-- ========================================
-- Готово! Теперь настройте ключи в src/lib/supabase.ts
-- ========================================
