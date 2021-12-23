import React, { useState } from "react";
import { Modal } from "react-native";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
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

type Category = {
  key: string;
  name: string;
  icon: string;
  color: string;
};

export function Register(props: any) {
  const [category, setCategory] = useState<Category>({
    key: "category",
    name: "Categoria",
    icon: "any",
    color: "#000000",
  });
  const [selectedTransactionType, setSelectedTransactionType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
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
        <Button title="Enviar" />
      </Form>
      <Modal visible={isModalOpen}>
        <CategorySelect
          category={category}
          closeCategorySelectModal={handleCloseModal}
          handleChosenCategory={handleChosenCategory}
        />
      </Modal>
    </Container>
  );
}
