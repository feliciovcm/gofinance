import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
  .typeError("Informe um valor numérico")
  .positive("O valor não pode ser negativo")
  .required("O valor é obrigatório")
})

export function Register(props: any) {
  const [category, setCategory] = useState<Category>({
    key: "category",
    name: "Categoria",
    icon: "any",
    color: "#000000",
  });
  const [selectedTransactionType, setSelectedTransactionType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  function handleChooseTransactionType(type: "income" | "outcome") {
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

  function handleRegister({name, amount}: FormData) {
    if (!selectedTransactionType) return Alert.alert("Ops!","Selecione o tipo da transação!")
    if (category.key === 'category') return Alert.alert("Ops!","Selecione a categoria!")

    const data = {
      name,
      amount,
      transactionType: selectedTransactionType,
      category: category.key
    }

    console.log(data);
    
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
                onPress={() => handleChooseTransactionType("income")}
                isActive={selectedTransactionType === "income"}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleChooseTransactionType("outcome")}
                isActive={selectedTransactionType === "outcome"}
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
