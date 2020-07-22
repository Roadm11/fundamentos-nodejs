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
    const transactionIncome = this.transactions.reduce((total, income) => {
      if (income.type.toLowerCase() === 'income') {
        return total + income.value;
      }
      return total;
    }, 0);

    const transactionOutcome = this.transactions.reduce((total, outcome) => {
      if (outcome.type.toLowerCase() === 'outcome') {
        return total + outcome.value;
      }
      return total;
    }, 0);

    const total = Math.round(transactionIncome - transactionOutcome);

    const balance: Balance = {
      income: transactionIncome,
      outcome: transactionOutcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
