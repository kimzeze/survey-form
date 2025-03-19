import { createClient } from "@/lib/supabase/client";

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResult = {
  success: boolean;
  error?: string;
};

export async function login(credentials: LoginCredentials): Promise<LoginResult> {
  try {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (err) {
    console.error("로그인 오류:", err);
    return {
      success: false,
      error: "로그인 중 오류가 발생했습니다.",
    };
  }
}
