import { useFocusEffect } from '@react-navigation/native';
import { format, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';

import { useTransactions } from '../../hooks/useTransactions';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import { formatCurrency } from '../../utils/format-currency-amount';

import {
  Container,
  Content,
  Header,
  Title,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  SelectIcon,
  Month,
  LoadingContainer
} from './styles';

interface HistoryCardData {
  key: string;
  color: string;
  amount: string;
  title: string;
  percentage: string;
};

export function Resume(props: any) {
  const [historyData, setHistoryData] = useState<HistoryCardData[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const transactionsService = useTransactions();

  const theme = useTheme();

  async function loadData() {
    setLoading(true);
    const transactions = (await transactionsService.getTransactions())
      .filter(transaction =>
        transaction.type === 'withdraw' &&
        new Date(transaction.date).getMonth() === new Date(selectedDate).getMonth() &&
        new Date(transaction.date).getFullYear() === new Date(selectedDate).getFullYear()
      );

    let dataArr: HistoryCardData[] = [];

    const transactionsTotalSum = transactions.reduce((acc: number, cur) => {
      return acc + cur.amount
    }, 0);

    categories.forEach((category) => {
      const transactionsByCategory = transactions.filter(transaction =>
        transaction.category === category.key);
      let amount = 0;

      transactionsByCategory.forEach(item => {
        amount += item.amount;
      })

      const percentage = `${((amount / transactionsTotalSum) * 100).toFixed(0)}%`

      if (amount > 0) {
        dataArr.push({
          amount: formatCurrency(amount),
          title: category.name,
          key: category.key,
          color: category.color,
          percentage
        })
      }
      amount = 0;
    })

    setHistoryData(dataArr);
    dataArr = [];
    setLoading(false);
  }

  function handleChangeDate(action: 'next' | 'prev') {
    if (action === 'next') {
      return setSelectedDate(addMonths(selectedDate, 1))
    }
    return setSelectedDate(subMonths(selectedDate, 1))
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {
        loading ? (
          <LoadingContainer>
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </LoadingContainer>
        ) : (
          <Content>
            <MonthSelect>
              <MonthSelectButton onPress={() => handleChangeDate('prev')}>
                <SelectIcon name='chevron-left' />
              </MonthSelectButton>

              <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

              <MonthSelectButton onPress={() => handleChangeDate('next')}>
                <SelectIcon name='chevron-right' />
              </MonthSelectButton>
            </MonthSelect>

            <ChartContainer>
              <VictoryPie
                data={historyData}
                colorScale={historyData.map(item => item.color)}
                x="percentage"
                y="amount"
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape
                  }
                }}
                labelRadius={70}
              />
            </ChartContainer>
            {historyData.map(item => (
              <HistoryCard
                key={item.key}
                title={item.title}
                amount={item.amount}
                color={item.color}
              />
            ))}
          </Content>
        )
      }
    </Container>
  )
}
