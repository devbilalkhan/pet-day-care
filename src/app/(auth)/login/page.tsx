import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

type PageProps = {};

function Page(props: PageProps) {
  return (
    <main>
      <H1 className="text-center">Log In</H1>
      <AuthForm authMode="login" />
      <p className="text-zinc-500 ">
        Don&apos;t have an account?{" "}
        <Link className="text-sm underline hover:text-zinc-700" href="/signup">
          Sign up here
        </Link>
      </p>
    </main>
  );
}

export default Page;
