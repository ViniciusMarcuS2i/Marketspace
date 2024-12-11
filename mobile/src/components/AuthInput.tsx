import { Input, InputField } from "./ui/input";

interface AuthInputProps {
  type?: "text" | "password";
  placeholder: string;
}

function AuthInput({ type = "text", placeholder }: AuthInputProps) {
  return (
    <Input
      isReadOnly={false}
      isDisabled={false}
      className="h-16 rounded-lg border-none bg-white pl-2 focus:border-none"
    >
      <InputField
        className="font-body text-xl"
        type={type}
        placeholder={placeholder}
      />
    </Input>
  );
}

export default AuthInput;
