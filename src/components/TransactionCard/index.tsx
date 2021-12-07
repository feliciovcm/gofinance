import React from "react";
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

export type DataItem = {
  type: "deposit" | "withdraw";
  title: string;
  amount: string;
  category: {
    icon: string;
    label: string;
  };
  date: string;
};

interface TransactionCardProps {
  data: DataItem;
}

export function TransactionCard(props: TransactionCardProps) {
  const {
    data: { amount, title, category, date, type },
  } = props;
  return (
    <Container>
      <Title>{title}</Title>
      <Amount type={type}>
        {type === "withdraw" && "- "}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.label}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
