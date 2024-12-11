import { Image } from "@/src/components/ui/image";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { Logo } from "@/src/assets/images";

import AuthInput from "@/src/components/AuthInput";
import { Button, ButtonText } from "@/src/components/ui/button";

function SignIn() {
  return (
    <VStack className="flex-1">
      <VStack className="rounded-bl-3xl rounded-br-3xl pt-28 bg-gray-600 px-12 pb-20">
        <VStack>
          <Image
            resizeMode="contain"
            size="xl"
            className="self-center"
            alt="aa"
            source={Logo}
          />
          <Text className="text-center text-black text-5xl font-heading">
            marketspace
          </Text>
          <Text className="text-center font-body text-xl">
            Seu espaço de compras
          </Text>
        </VStack>
        <VStack className="mt-12">
          <Text className="text-xl text-center">Acesse sua conta</Text>
          <VStack className="mt-5 gap-5">
            <AuthInput placeholder="E-mail" />
            <AuthInput placeholder="Senha" type="password" />
          </VStack>
        </VStack>
        <Button className="h-14 mt-10 rounded-md bg-blue-light">
          <ButtonText className="text-xl font-body">Entrar</ButtonText>
        </Button>
      </VStack>
      <VStack className="bg-gray-700 items-center gap-4 justify-center px-12 flex-1">
        <Text className="text-lg">Ainda não tem acesso?</Text>
        <Button className="rounded-md bg-gray-500 h-14 w-full">
          <ButtonText className="text-gra-200">Criar uma conta</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
}

export default SignIn;
