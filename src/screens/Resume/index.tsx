import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import { transactionsService } from '../../services/TransactionsStorageService';
import { categories } from '../../utils/categories';
import { formatCurrency } from '../../utils/format-currency-amount';
import { Container, Content, Header, Title } from './styles';

interface HistoryCardData {
  key: string;
  color: string;
  amount: string;
  title: string;
};

export function Resume(props:any) {
  const [historyData, setHistoryData] = useState<HistoryCardData[]>([]);
  
  async function loadData() {
    const transactions = await transactionsService.getTransactions();
    let dataArr: HistoryCardData[] = [];

    categories.forEach((category) => {
      const transactionsByCategory = transactions.filter(transaction => transaction.category === category.key);
      let amount = 0;
      
      transactionsByCategory.forEach(item => {
        amount += item.amount;
      })

      if (amount > 0) {
        dataArr.push({
          amount: formatCurrency(amount),
          title: category.name,
          key: category.key,
          color: category.color
        })
      }
      amount = 0;
    })

    setHistoryData(dataArr);
    dataArr = [];
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  )

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content>
        {historyData.map(item => (
          <HistoryCard 
            key={item.key}
            title={item.title}
            amount={item.amount}
            color={item.color}
          />
        ))}
      </Content>


    </Container>
  )
}