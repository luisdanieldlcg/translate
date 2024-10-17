import { verifyToken } from "@/api";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck = (props: AuthCheckProps) => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const verify = async () => {
      await verifyToken(
        (user) => {
          setUser(user);
          router.push("/home");
        },
        (error) => {
          console.log(error);
          router.replace("/login");
        }
      );
    };
    verify();
  }, []);

  return <>{props.children}</>;
};

export default AuthCheck;
