import { TextInputProps } from "react-native";
import { Input, InputField } from "./ui/input";

interface AuthInputProps extends TextInputProps {
  type?: "text" | "password";
  placeholder: string;
}

function AuthInput({ type = "text", placeholder, ...rest }: AuthInputProps) {
  return (
    <Input
      isReadOnly={false}
      isDisabled={false}
      className="h-16 w-full rounded-lg border-none bg-white pl-2 focus:border-none"
    >
      <InputField
        {...rest}
        className="font-body text-xl"
        type={type}
        placeholder={placeholder}
      />
    </Input>
  );
}

export default AuthInput;
