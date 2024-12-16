import { Image } from "@/src/components/ui/image";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { Logo } from "@/src/assets/images";

import AuthInput from "@/src/components/auth-input";
import { Button, ButtonText } from "@/src/components/ui/button";
import { Link } from "expo-router";

function SignIn() {
  return (
    <VStack className="flex-1">
      <VStack className="rounded-bl-3xl rounded-br-3xl bg-gray-600 px-12 pb-20 pt-28">
        <VStack>
          <Image
            resizeMode="contain"
            size="xl"
            className="self-center"
            alt="aa"
            source={Logo}
          />
          <Text className="text-center font-heading text-5xl text-black">
            marketspace
          </Text>
          <Text className="text-center font-body text-xl">
            Seu espaço de compras
          </Text>
        </VStack>
        <VStack className="mt-12">
          <Text className="text-center text-xl">Acesse sua conta</Text>
          <VStack className="mt-5 gap-5">
            <AuthInput placeholder="E-mail" />
            <AuthInput placeholder="Senha" type="password" />
          </VStack>
        </VStack>
        <Button className="mt-10 h-14 rounded-md bg-blue-light">
          <ButtonText className="font-body text-xl">Entrar</ButtonText>
        </Button>
      </VStack>
      <VStack className="flex-1 items-center justify-center gap-4 bg-gray-700 px-12">
        <Text className="text-lg">Ainda não tem acesso?</Text>
        <Link href="/sign-up" asChild>
          <Button className="h-14 w-full rounded-md bg-gray-500">
            <ButtonText className="text-lg text-gray-200">
              Criar uma conta
            </ButtonText>
          </Button>
        </Link>
      </VStack>
    </VStack>
  );
}

export default SignIn;
