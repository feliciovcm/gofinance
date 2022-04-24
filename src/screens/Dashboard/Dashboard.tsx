import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";

import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, DataItem } from "../../components/TransactionCard";
import { transactionsService } from "../../services/TransactionsStorageService";
import { ActivityIndicator } from 'react-native';
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
  LogoutButton,
  LoadingContainer
} from "./styles";
import theme from "../../global/styles/theme";
import { highlightsReducer, HIGHLIGHTS_INITIAL_VALUES } from "../../utils/HighlightsReducer";

export interface DataListProps extends DataItem {
  id: string;
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightData, setHighlightData] = useState(HIGHLIGHTS_INITIAL_VALUES);
  
  useFocusEffect(
    useCallback(() => {
      async function loadData () {
        setLoading(true)
        const loadedData: DataListProps[] = await transactionsService.getTransactions();

        const highlights = loadedData.reduce(highlightsReducer, {...HIGHLIGHTS_INITIAL_VALUES})
        
        setData(loadedData);
        setHighlightData(highlights);
        setLoading(false)
     }

      loadData();
  }, []))

  return (
    <Container>
      {
        loading ? (
          <LoadingContainer>
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </LoadingContainer>
        ) : (
          <>
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
              amount={highlightData.entries}
              lastTransaction={highlightData.lastEntryDate}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expenses}
              lastTransaction={highlightData.lastExpenseDate}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total}
              lastTransaction={highlightData.lastTotalDate}
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
      </>
        )
      }
      
    </Container>
  );
}
