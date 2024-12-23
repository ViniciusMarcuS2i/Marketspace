import { firestore } from "@/firebaseConfig";
import { Button, ButtonSpinner, ButtonText } from "@/src/components/ui/button";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/src/components/ui/checkbox";
import { HStack } from "@/src/components/ui/hstack";
import { CheckIcon, CircleIcon } from "@/src/components/ui/icon";
import { Input, InputField } from "@/src/components/ui/input";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/src/components/ui/radio";
import { Switch } from "@/src/components/ui/switch";
import { Text } from "@/src/components/ui/text";
import { Textarea, TextareaInput } from "@/src/components/ui/textarea";
import { VStack } from "@/src/components/ui/vstack";
import { AuthContext } from "@/src/context/authContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "@/src/components/ui/image";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/src/components/ui/alert-dialog";
import { Heading } from "@/src/components/ui/heading";

function Advertise() {
  const { currentUser } = useContext(AuthContext);

  const [image, setImage] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [selected, setSelected] = useState("NOVO");
  const [isEnabled, setIsEnabled] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const handleClose = () => setShowAlertDialog(false);

  async function handleCreateProduct() {
    try {
      if (!name || !description || !price) return;
      setIsLoading(true);
      await addDoc(collection(firestore, "products"), {
        name,
        description,
        price,
        isNew: selected,
        changeble: isEnabled,
        method: isChecked,
        productImage: imgUrl,
        userId: doc(firestore, "users", currentUser.id),
      });
      console.log("fixa dms");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

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
    <VStack className="flex-1 px-6 pt-[70px]">
      <HStack className="items-center justify-between border-b-[1px] border-gray-500 pb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="arrow-left" size={22} color="#1A181B" />
        </TouchableOpacity>
        <Text className="font-heading text-2xl">Criar anúncio</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="arrow-left"
            size={22}
            color="transparent"
          />
        </TouchableOpacity>
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack>
          <Text className="mt-10 font-heading text-2xl">Imagens</Text>
          <Text className="mt-2 text-lg text-gray-400">
            Escolha até 3 imagens para mostrar o quanto o seu produto é
            incrivel!
          </Text>
          <TouchableOpacity
            onPress={() => setShowAlertDialog(true)}
            activeOpacity={0.7}
          >
            <VStack className="mt-4 h-32 w-32 items-center justify-center rounded-xl bg-gray-500">
              {!image ? (
                <MaterialCommunityIcons name="plus" size={24} color="white" />
              ) : (
                <Image
                  alt="Imagem do produto"
                  source={{ uri: image }}
                  className="h-32 w-32 rounded-xl"
                />
              )}
            </VStack>
          </TouchableOpacity>
        </VStack>
        <VStack className="mt-8">
          <Text className="font-heading text-xl">Sobre o produto</Text>
          <Input className="mt-4 h-14 rounded-lg bg-gray-700 px-2">
            <InputField
              className="font-body text-xl"
              placeholder="Título do anúncio"
              value={name}
              onChangeText={setName}
            />
          </Input>
          <Textarea size="xl" className="mt-4 rounded-lg bg-gray-700 px-2">
            <TextareaInput
              value={description}
              onChangeText={setDescription}
              className="font-body text-xl"
              placeholder="Descreva o produto..."
            />
          </Textarea>
          <RadioGroup className="mt-4" value={selected} onChange={setSelected}>
            <HStack space="2xl">
              <Radio onPress={() => console.log(selected)} value="NOVO">
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel className="font-body text-xl">
                  Produto novo
                </RadioLabel>
              </Radio>
              <Radio onPress={() => console.log(selected)} value="USADO">
                <RadioIndicator>
                  <RadioIcon color="#647AC7" as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel className="font-body text-xl">
                  Produto usado
                </RadioLabel>
              </Radio>
            </HStack>
          </RadioGroup>
          <Text className="mt-4 font-heading text-xl">Venda</Text>
          <Input className="mt-4 h-14 rounded-lg bg-gray-700 px-5">
            <Text className="text-xl">R$</Text>
            <InputField
              value={price}
              onChangeText={setPrice}
              className="font-body text-xl"
              placeholder="Valor do produto"
            />
          </Input>
          <VStack className="mt-4">
            <Text className="font-heading text-xl">Aceita troca?</Text>
            <Switch
              value={isEnabled}
              onValueChange={setIsEnabled}
              className="self-start"
              size="lg"
            />
          </VStack>
          <VStack className="mt-4">
            <Text className="font-heading text-xl">
              Meios de pagamentos aceitos
            </Text>
            <CheckboxGroup
              value={isChecked}
              onChange={(keys) => {
                setIsChecked(keys);
              }}
            >
              <VStack className="mb-4 mt-4" space="md">
                <Checkbox value="Boleto">
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel className="text-xl">Boleto</CheckboxLabel>
                </Checkbox>
                <Checkbox value="Pix">
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel className="text-xl">Pix</CheckboxLabel>
                </Checkbox>
                <Checkbox value="Dinheiro">
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel className="text-xl">Dinheiro</CheckboxLabel>
                </Checkbox>
                <Checkbox value="Cartão de Crédito">
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel className="text-xl">
                    Cartão de Crédito
                  </CheckboxLabel>
                </Checkbox>
                <Checkbox value="Depósito Bancário">
                  <CheckboxIndicator>
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel className="text-xl">
                    Depósito Bancário
                  </CheckboxLabel>
                </Checkbox>
              </VStack>
            </CheckboxGroup>
            <Button
              isDisabled={isLoading}
              onPress={handleCreateProduct}
              className="mb-8 mt-4 h-14 bg-blue-light"
            >
              {isLoading ? (
                <ButtonSpinner />
              ) : (
                <ButtonText className="font-heading text-xl">
                  Publicar
                </ButtonText>
              )}
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
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
    </VStack>
  );
}

export default Advertise;
