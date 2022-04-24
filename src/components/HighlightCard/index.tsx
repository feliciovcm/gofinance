import React, { useMemo } from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from "./styles";
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';
import { formatCurrency } from "../../utils/format-currency-amount";

interface HighlightCardProps {
  title: string;
  amount: number;
  lastTransaction: number;
  type: "up" | "down" | "total";
}

export function HighlightCard(props: HighlightCardProps) {
  const { title, amount, lastTransaction, type } = props;

  const icon = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
    total: "dollar-sign",
  };

  const lastDate = useMemo(() => {
    if (lastTransaction === 0) return '';
    return `Última entrada dia ${format(new Date(lastTransaction), "dd 'de' MMMM", { locale: ptBR })}`
  }, [lastTransaction])

  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>
      <Footer>
        <Amount type={type}>{formatCurrency(amount)}</Amount>
        <LastTransaction type={type}>{lastDate}</LastTransaction>
      </Footer>
    </Container>
  );
}
