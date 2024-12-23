import { Image } from "@/src/components/ui/image";
import { VStack } from "@/src/components/ui/vstack";
import { Avatar, Logo } from "@/src/assets/images";
import { Text } from "@/src/components/ui/text";
import AuthInput from "@/src/components/auth-input";
import { Button, ButtonSpinner, ButtonText } from "@/src/components/ui/button";
import { Pressable } from "@/src/components/ui/pressable";
import { Link } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "@/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/src/components/ui/toast";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/src/components/ui/alert-dialog";
import { Heading } from "@/src/components/ui/heading";

const signUpSchema = z
  .object({
    email: z.string().email("Digite um e-mail válido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme a senha"),
    name: z.string().min(3, "Digite seu nome"),
    tel: z.string().min(11, "Digite um número de telefone válido"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof signUpSchema>;

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const handleClose = () => setShowAlertDialog(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      tel: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  async function signUp(data: FormData) {
    try {
      setIsLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const db = collection(firestore, "users");
      await addDoc(db, {
        email: user.email,
        name: data.name,
        tel: data.tel,
        avatar: imgUrl,
      });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        handleToast();
      }
    } finally {
      setIsLoading(false);
    }
  }

  const toast = useToast();
  const [toastId, setToastId] = useState(0);
  const handleToast = () => {
    if (!toast.isActive(String(toastId))) {
      showNewToast();
    }
  };
  const showNewToast = () => {
    const newId = Math.random();
    setToastId(newId);
    toast.show({
      id: String(newId),
      placement: "top",
      duration: 3000,
      render: ({ id }) => {
        const uniqueToastId = "toast-" + id;
        return (
          <Toast
            className="mt-6"
            nativeID={uniqueToastId}
            action="error"
            variant="outline"
          >
            <ToastTitle className="text-error-500">Putz...</ToastTitle>
            <ToastDescription className="text-error-500">
              Já existe um usuário com esse email!
            </ToastDescription>
          </Toast>
        );
      },
    });
  };

  async function pickImage() {
    setShowAlertDialog(false);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
      const filename = result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf("/") + 1,
        result.assets[0].uri.length,
      );
      const extend = filename.split(".")[1];
      const formData = new FormData();
      formData.append(
        "image",
        JSON.parse(
          JSON.stringify({
            name: filename,
            type: `image/${extend}`,
            uri: result.assets[0].uri,
          }),
        ),
      );

      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=f35f6607ba8e64218b80c4aa3957a9f3",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        },
      );
      const { data } = await response.json();
      setImgUrl(data.url);
      console.log(imgUrl);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <VStack className="flex-1 px-12 pb-4 pt-16">
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
          <TouchableOpacity
            onPress={() => setShowAlertDialog(true)}
            activeOpacity={0.7}
            className="relative"
          >
            <VStack className="absolute bottom-2 right-0 z-10 rounded-full bg-blue-light p-2">
              <MaterialCommunityIcons
                name="pencil-outline"
                size={16}
                color="white"
              />
            </VStack>
            <Image
              className="rounded-full border-2 border-blue-light"
              source={image ? { uri: image } : Avatar}
              alt="Foto de perfil"
              size="lg"
            />
          </TouchableOpacity>
          <VStack>
            <Controller
              name="name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <AuthInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Nome"
                />
              )}
            />
            {errors.name && (
              <Text className="text-red-500">{errors.name.message}</Text>
            )}
          </VStack>
          <VStack>
            <Controller
              name="email"
              control={control}
              render={({ field: { value, onChange } }) => (
                <AuthInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="E-mail"
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500">{errors.email.message}</Text>
            )}
          </VStack>
          <VStack>
            <Controller
              name="tel"
              control={control}
              render={({ field: { value, onChange } }) => (
                <AuthInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Seu número"
                />
              )}
            />
            {errors.tel && (
              <Text className="text-red-500">{errors.tel.message}</Text>
            )}
          </VStack>
          <VStack>
            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange } }) => (
                <AuthInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Digite sua senha"
                  type="password"
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500">{errors.password.message}</Text>
            )}
          </VStack>
          <VStack>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { value, onChange } }) => (
                <AuthInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Confirme a senha"
                  type="password"
                />
              )}
            />
            {errors.confirmPassword && (
              <Text className="text-red-500">
                {errors.confirmPassword.message}
              </Text>
            )}
          </VStack>

          <Button
            isDisabled={isLoading}
            onPress={handleSubmit(signUp)}
            className="mt-2 h-14 w-full rounded-md"
          >
            {isLoading ? (
              <ButtonSpinner />
            ) : (
              <ButtonText className="font-body text-xl">Criar</ButtonText>
            )}
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
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="font-semibold text-typography-950" size="md">
              Tem certeza que quer usar essa feature?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mb-4 mt-3">
            <Text size="sm">
              As imagens estão sendo enviadas para ImgBB, plataforma de
              hospedagem de terceiros. Não é recomendado subir imagens pessoais,
              apenas imagens teste!
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button
              variant="outline"
              action="secondary"
              onPress={handleClose}
              size="sm"
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button size="sm" onPress={pickImage}>
              <ButtonText>Continuar</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ScrollView>
  );
}
export default SignUp;
