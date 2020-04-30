import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce<Balance>(
      (currentBalance, transaction) =>
        transaction.type === 'income'
          ? {
              ...currentBalance,
              income: currentBalance.income + transaction.value,
              total: currentBalance.total + transaction.value,
            }
          : {
              ...currentBalance,
              outcome: currentBalance.outcome + transaction.value,
              total: currentBalance.total - transaction.value,
            },
      { income: 0, outcome: 0, total: 0 },
    );

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
