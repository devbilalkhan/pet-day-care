import AuthForm from "@/components/auth-form";
import H1 from "@/components/h1";
import Link from "next/link";

type PageProps = {};

function Page(props: PageProps) {
  return (
    <>
      <main>
        <H1 className="text-center">Sign up</H1>
        <AuthForm />
        <p className="text-zinc-500 ">
          Already have an account?{" "}
          <Link className="text-sm underline hover:text-zinc-700" href="/login">
            Login here
          </Link>
        </p>
      </main>
    </>
  );
}

export default Page;
