/**
 * Database Types для Supabase
 * Описывает структуру таблиц в PostgreSQL
 */

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          bio: string;
          avatar_url: string | null;
          plan: string;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email?: string | null;
          bio?: string;
          avatar_url?: string | null;
          plan?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          bio?: string;
          avatar_url?: string | null;
          plan?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          author_id: string;
          title: string;
          content: string | null;
          excerpt: string | null;
          category: string;
          image_url: string | null;
          status: string;
          likes_count: number;
          comments_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          author_id: string;
          title: string;
          content?: string | null;
          excerpt?: string | null;
          category?: string;
          image_url?: string | null;
          status?: string;
          likes_count?: number;
          comments_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string;
          content?: string | null;
          excerpt?: string | null;
          category?: string;
          image_url?: string | null;
          status?: string;
          likes_count?: number;
          comments_count?: number;
          updated_at?: string;
        };
      };
      likes: {
        Row: {
          id: string;
          user_id: string;
          post_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          post_id: string;
          created_at?: string;
        };
        Update: {};
      };
      comments: {
        Row: {
          id: string;
          user_id: string;
          post_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          post_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          content?: string;
        };
      };
    };
    Functions: {
      increment_likes: {
        Args: { post_id_input: string };
        Returns: void;
      };
      decrement_likes: {
        Args: { post_id_input: string };
        Returns: void;
      };
      increment_comments: {
        Args: { post_id_input: string };
        Returns: void;
      };
    };
  };
}
