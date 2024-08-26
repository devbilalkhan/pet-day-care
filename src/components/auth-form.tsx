import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type AuthFormProps = {
  // Define your props here
};

function AuthForm({}: AuthFormProps) {
  return (
    <form className="mt-6">
      <div className="w-[400px]">
        <Label htmlFor="loginEmail" className="text-lg">
          Email
        </Label>
        <Input id="loginEmail" type="email" className="w-full" />
      </div>
      <div>
        <Label htmlFor="loginPassword" className="text-lg">
          Password
        </Label>
        <Input id="loginPassword" type="password" />
      </div>
      <div className="flex justify-end mt-4">
        <Button>Login</Button>
      </div>
    </form>
  );
}

export default AuthForm;
