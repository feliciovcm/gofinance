import React from "react";

import { HighlightCard } from "../../components/HighlightCard";
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
} from "./styles";

export function Dashboard() {
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
          <Icon name="power" />
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
    </Container>
  );
}
