import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { response } from 'express';


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


  public execute({title, value, type}: Request): Transaction {

    if(type == 'outcome' && this.transactionsRepository.getBalance().total < value){
      throw Error('Não é possível completar esta transação pois o saldo não é suficiente')
    }
    
    const transaction = this.transactionsRepository.create(
      title,
      value,
      type
    );



    return transaction;
  }
}

export default CreateTransactionService;
