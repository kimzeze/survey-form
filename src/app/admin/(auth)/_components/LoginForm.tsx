"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import PasswordInput from "@/components/ui/PasswordInput";
import { login } from "@/services/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod 스키마 정의
const loginSchema = z.object({
  email: z.string().min(1, "이메일을 입력해주세요").email("올바른 이메일 형식이 아닙니다"),
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요")
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
});

// 타입 정의
type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    resetField,
    clearErrors,
    setError: setFormError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // 값 변경 시 유효성 검사 실행
    reValidateMode: "onChange", // 값 변경 시 재검증
  });

  // 필드 초기화 핸들러
  const handleResetField = (fieldName: keyof LoginFormValues) => {
    resetField(fieldName);
    clearErrors(fieldName);
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setError(null);
      clearErrors();

      const result = await login({
        email: data.email,
        password: data.password,
      });

      if (!result.success) {
        if (
          result.error?.includes("Invalid login credentials") ||
          result.error?.includes("invalid_credentials")
        ) {
          setFormError("email", {
            type: "manual",
            message: "아이디 또는 비밀번호를 확인해주세요.",
          });
          return;
        }

        // 기타 오류는 기존 방식으로 표시
        setError(result.error || "알 수 없는 오류가 발생했습니다.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error("로그인 오류:", err);
      setError("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="email"
        type="email"
        label="관리자 계정"
        placeholder="ADMIN ID"
        {...register("email")}
        error={errors.email?.message}
        required
        onClear={() => handleResetField("email")}
      />

      <PasswordInput
        id="password"
        label="비밀번호"
        placeholder="ADMIN PASSWORD"
        {...register("password")}
        error={errors.password?.message}
        required
        onClear={() => handleResetField("password")}
      />

      {error && <div className="mt-2 text-sm text-error">{error}</div>}

      <Button
        type="submit"
        fullWidth
        disabled={isSubmitting}
        color="black"
        height="48px"
        className="mt-4 text-md font-semibold"
      >
        {isSubmitting ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
};

export default LoginForm;
