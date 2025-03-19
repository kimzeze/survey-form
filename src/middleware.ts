import { type NextRequest, NextResponse } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // 요청 URL 경로 확인
  const { pathname } = request.nextUrl;

  // 디버그: 미들웨어 실행 확인
  console.log("Middleware running for path:", pathname);

  // 세션 업데이트 및 사용자 정보 가져오기
  const { response, user } = await updateSession(request);

  // 로그인 페이지인 경우, 이미 로그인된 관리자는 대시보드로 리다이렉트
  if (pathname === "/admin/login") {
    console.log("User check:", user?.email, user?.user_metadata);
    console.log("Is admin:", user && isAdmin(user));
    if (user && isAdmin(user)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return response;
  }

  // admin 경로인지 확인 (login 제외)
  if (pathname.startsWith("/admin")) {
    // 사용자가 없거나 관리자가 아닌 경우 로그인 페이지로 리다이렉션
    if (!user || !isAdmin(user)) {
      const redirectUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 인증된 사용자는 계속 진행
  return response;
}

// 관리자 권한 확인 함수 - 프로젝트에 맞게 수정 필요
function isAdmin(user: any) {
  // aptimizer.co@gmail.com 계정을 관리자로 설정
  return user.email === "aptimizer.co@gmail.com";
}

export const config = {
  matcher: [
    // 루트 admin 페이지와 모든 하위 페이지에 미들웨어 적용
    "/admin",
    "/admin/:path*",
  ],
};
