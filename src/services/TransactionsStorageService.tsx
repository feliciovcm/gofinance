import AsyncStorage from '@react-native-async-storage/async-storage';

export class TransactionsAsyncStorage {
  private dataKey = '@gofinance:transactions';

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

    const parseData = data ? JSON.parse(data) : [];

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
}

export const transactionsService = new TransactionsAsyncStorage();