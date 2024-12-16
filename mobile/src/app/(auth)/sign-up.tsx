import { Image } from "@/src/components/ui/image";
import { VStack } from "@/src/components/ui/vstack";
import { Avatar, Logo } from "@/src/assets/images";
import { Text } from "@/src/components/ui/text";
import AuthInput from "@/src/components/auth-input";
import { Button, ButtonText } from "@/src/components/ui/button";
import { Pressable } from "@/src/components/ui/pressable";
import { Link } from "expo-router";

function SignUp() {
  return (
    <VStack className="flex-1 px-12 pt-16">
      <VStack>
        <Image
          className="self-center"
          source={Logo}
          resizeMode="contain"
          alt="Logo"
        />
        <Text className="text-center font-heading text-3xl text-black">
          Boas vindas!
        </Text>
        <Text className="mt-3 text-center font-body text-lg">
          Crie sua conta e use o espaço para comprar itens variados e vender
          seus produtos
        </Text>
      </VStack>
      <VStack className="mt-8 items-center gap-4">
        <Image source={Avatar} alt="Avatar" size="lg" />
        <AuthInput placeholder="Nome" />
        <AuthInput placeholder="E-mail" />
        <AuthInput placeholder="Telefone" />
        <AuthInput placeholder="Senha" type="password" />
        <AuthInput placeholder="Confirmar senha" type="password" />
        <Button className="mt-2 h-14 w-full rounded-md">
          <ButtonText className="font-body text-xl">Criar</ButtonText>
        </Button>
        <Link href="/(auth)" asChild>
          <Pressable>
            {({ pressed }) => {
              return (
                <Text
                  className={
                    pressed
                      ? "mt-4 text-center font-body text-lg text-blue-light"
                      : "mt-4 text-center font-body text-lg text-blue"
                  }
                >
                  Já tenho uma conta!
                </Text>
              );
            }}
          </Pressable>
        </Link>
      </VStack>
    </VStack>
  );
}

export default SignUp;
