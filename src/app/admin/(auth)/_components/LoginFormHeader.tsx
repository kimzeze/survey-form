// SVG 로고 컴포넌트 import
import CompanyLogo from "@/assets/company/aptimizer_web_logo.svg";

// 또는 public 폴더에 있는 SVG 사용 시: import Image from 'next/image';

export default function LoginFormHeader() {
  return (
    <header className="mb-4xl text-center">
      {/* SVG 로고 추가 */}
      <div className="flex justify-center">
        <CompanyLogo width={250} height={62.5} />
      </div>
      <h1 className="a11y-hidden">에듀 프리미엄 관리자 로그인</h1>
      <p className="a11y-hidden text-md text-gray-500">앱티마이저 관리자 로그인</p>
    </header>
  );
}
