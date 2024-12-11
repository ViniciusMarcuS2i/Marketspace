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
      className="bg-white h-14 rounded-lg pl-2 focus:border-none  border-none"
    >
      <InputField
        className="text-xl font-body"
        type={type}
        placeholder={placeholder}
      />
    </Input>
  );
}

export default AuthInput;
