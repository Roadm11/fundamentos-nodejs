import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (value < 0) {
      throw Error(
        'Value cant be a negative number, change the type to "outcome"',
      );
    }

    if (type.toLowerCase() !== 'income' && type.toLowerCase() !== 'outcome') {
      throw Error('The type just can be a income or outcome');
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome') {
      if (total > 0 && total < value) {
        throw Error('Transaction denied. The value is bigger than your total');
      }
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
