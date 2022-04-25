import { useAuth } from "../contexts/AuthContext";
import { TransactionsAsyncStorage } from "../services/TransactionsStorageService";

export function useTransactions() {
  const { user } = useAuth();

  const transactionsService = new TransactionsAsyncStorage(user?.id!);

  return transactionsService;
}
