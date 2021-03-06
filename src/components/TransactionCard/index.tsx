import React from "react";
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date as DateComponent,
} from "./styles";
import { categories } from "../../utils/categories";

import { format } from "date-fns";
import { formatCurrency } from "../../utils/format-currency-amount";


export type DataItem = {
  type: "deposit" | "withdraw";
  title: string;
  amount: number;
  category: string;
  date: string;
};

interface TransactionCardProps {
  data: DataItem;
}

export function TransactionCard(props: TransactionCardProps) {
  const {
    data: { amount, title, category, date, type },
  } = props;

  const categoryType = categories.find(item => item.key === category)!;  
  
  
  return (
    <Container>
      <Title>{title}</Title>
      <Amount type={type}>
        {type === "withdraw" && "- "}
        {formatCurrency(amount)}
      </Amount>

      <Footer>
        <Category>
          <Icon name={categoryType.icon} />
          <CategoryName>{categoryType.name}</CategoryName>
        </Category>
        <DateComponent>{format(new Date(date), 'dd/MM/yyyy')}</DateComponent>
      </Footer>
    </Container>
  );
}
