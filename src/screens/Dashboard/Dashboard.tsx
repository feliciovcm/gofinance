import React from "react";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, DataItem } from "../../components/TransactionCard";
import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserWrapper,
  UserName,
  UserGreeting,
  Icon,
  HighlightCardsContainer,
  Transactions,
  Title,
  TransactionList,
  LogoutButton
} from "./styles";

export interface DataListProps extends DataItem {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "deposit",
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: { label: "Vendas", icon: "dollar-sign" },
      date: "13/04/2021",
    },
    {
      id: "2",
      type: "withdraw",
      title: "Hamburgueria Fúria",
      amount: "R$ 60,00",
      category: { label: "Alimentação", icon: "coffee" },
      date: "13/04/2021",
    },
    {
      id: "3",
      type: "withdraw",
      title: "Aluguel do apartamento",
      amount: "R$ 1.000,00",
      category: { label: "Casa", icon: "shopping-bag" },
      date: "13/04/2021",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/77253561?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá ,</UserGreeting>
              <UserName>Vitor</UserName>
            </User>
          </UserInfo>
          <LogoutButton>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlightCardsContainer>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
      </HighlightCardsContainer>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          renderItem={({ item }) => <TransactionCard data={item} />}
          keyExtractor={(item) => item.id}
        />
      </Transactions>
    </Container>
  );
}
