import React, { useState } from "react";
import { useForm } from "react-hook-form";
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { Button } from "../../components/Forms/Button";
import { InputForm } from "../../components/Forms/InputForm";
import { CustomSelect } from "../../components/Forms/Select";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";
import {
  Container,
  Fields,
  Form,
  Header,
  Title,
  TransactionContianer
} from "./styles";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { transactionsService } from "../../services/TransactionsStorageService";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/app.routes";
import { Transaction } from "../../utils/Transaction";

type Category = {
  key: string;
  name: string;
  icon: string;
  color: string;
};

interface FormData {
  name: string;
  amount: string;
}

type registerScreenProp = NavigationProp<RootStackParamList, 'Cadastrar'>;

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
  .typeError("Informe um valor numérico")
  .positive("O valor não pode ser negativo")
  .required("O valor é obrigatório")
})

export function Register(props: any) {

  const navigation = useNavigation<registerScreenProp>();

  const [category, setCategory] = useState<Category>({
    key: "category",
    name: "Categoria",
    icon: "any",
    color: "#000000",
  });
  const [selectedTransactionType, setSelectedTransactionType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({ resolver: yupResolver(schema) });

  function handleChooseTransactionType(type: "withdraw" | "deposit") {
    setSelectedTransactionType(type);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleChosenCategory(value: Category) {
    setCategory(value);
  }

  async function handleRegister({name, amount}: FormData) {
    if (!selectedTransactionType) return Alert.alert("Ops!","Selecione o tipo da transação!")
    if (category.key === 'category') return Alert.alert("Ops!","Selecione a categoria!")

    const data = new Transaction(name, Number(amount), selectedTransactionType, category.key);

    try {
      await transactionsService.setTransactions(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Ops!", "Não foi possível salvar");
    }
    
    reset();
    setSelectedTransactionType("");
    setCategory({
      key: "category",
      name: "Categoria",
      icon: "any",
      color: "#000000",
    });

    navigation.navigate('Dashboard');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              placeholder="Nome"
              name="name" 
              control={control} 
              autoCapitalize="sentences" 
              error={errors?.name?.message} 
            />
            <InputForm
              placeholder="Preço"
              name="amount"
              control={control}
              keyboardType="numeric"
              error={errors?.amount?.message}
            />
            <TransactionContianer>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleChooseTransactionType("deposit")}
                isActive={selectedTransactionType === "deposit"}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleChooseTransactionType("withdraw")}
                isActive={selectedTransactionType === "withdraw"}
              />
            </TransactionContianer>
            <CustomSelect title={category.name} onPress={handleOpenModal} />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)}/>
        </Form>
        <Modal visible={isModalOpen}>
          <CategorySelect
            category={category}
            closeCategorySelectModal={handleCloseModal}
            handleChosenCategory={handleChosenCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
   
  );
}