import { verifyToken } from "@/api";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./Loading";

interface AuthCheckProps {
  children: React.ReactNode;
}

const AuthCheck = (props: AuthCheckProps) => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      setLoading(true);
      await verifyToken(
        (user) => {
          setUser(user);
          setLoading(false);
          router.push("/home");
        },
        (_) => {
          setLoading(false);
          router.replace("/login");
        }
      );
    };
    verify();
  }, []);

  if (loading || !useUserStore.getState().user) {
    return (
      <Loading
        size={128}
        className="mx-auto flex justify-center items-center h-screen"
      />
    );
  } else {
    return <>{props.children}</>;
  }
};

export default AuthCheck;
