import { LoginForm, LoginFormFooter, LoginFormHeader } from "../_components";

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-white">
      <main className="w-[500px] px-28">
        <LoginFormHeader />
        <LoginForm />
      </main>
      <footer className="mt-4xl text-sm text-gray-500">© 2025 Aptimizer.</footer>
    </div>
  );
}
