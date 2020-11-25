import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
     

    var income = 0;
    var outcome = 0;

     this.transactions.map( tra => {
      
      if( tra.type == 'income'){
        income = income + tra.value;
      }
      else if( tra.type == 'outcome'){
        outcome = outcome + tra.value;
      }

    } )


    var total = income - outcome;

    var balance = {
        income,
        outcome,
        total
    }

      return balance;

  }

  public create(title: string, value: number, type: 'income' | 'outcome'): Transaction {
    
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    
    return transaction;
  }
}

export default TransactionsRepository;
