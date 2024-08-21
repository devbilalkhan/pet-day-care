import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <Image
        alt="preview pet day care"
        height={51}
        width={47}
        src="/svg/logo.svg"
      />
    </Link>
  );
}

export default Logo;
