import { Suspense } from "react";
import { ResetPassword } from "@/feature/auth/resetPassword";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPassword />
    </Suspense>
  );
};
