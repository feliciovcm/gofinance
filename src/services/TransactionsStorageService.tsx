import AsyncStorage from '@react-native-async-storage/async-storage';

interface ITransactions {
  type: "deposit" | "withdraw";
  title: string;
  amount: number;
  category: string;
  date: string;
  id: string;
};

export class TransactionsAsyncStorage {
  private dataKey: string = '';

  constructor(
    userId: string
  ) {
    this.dataKey = `@gofinance:transactions${userId}`
  }

  async setTransactions(newData: any) {
    try {
      const data = await this.getTransactions();

      const currentData = [
        newData,
        ...data,
      ];

      await AsyncStorage.setItem(this.dataKey, JSON.stringify(currentData));

      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async getTransactions() {
    const data = await AsyncStorage.getItem(this.dataKey);

    const parseData: ITransactions[] = data ? JSON.parse(data) : [];

    return parseData;
  }

  async removeTransactions() {
    try {
      await AsyncStorage.removeItem(this.dataKey);
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(error)
    }
  }
};
