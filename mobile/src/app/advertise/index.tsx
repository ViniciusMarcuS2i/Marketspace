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

function Advertise() {
  const { currentUser } = useContext(AuthContext);

  const [selected, setSelected] = useState("NOVO");
  const [isEnabled, setIsEnabled] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        userId: doc(firestore, "users", currentUser.id),
      });
      console.log("fixa dms");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
          <TouchableOpacity activeOpacity={0.7}>
            <VStack className="mt-4 h-32 w-32 items-center justify-center rounded-xl bg-gray-500">
              <MaterialCommunityIcons name="plus" size={24} color="white" />
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
              className="absolute left-3 top-2 font-body text-xl"
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
    </VStack>
  );
}

export default Advertise;
