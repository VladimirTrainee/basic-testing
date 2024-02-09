import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 0;
    const account = getBankAccount(balance);
    expect(account.getBalance()).toEqual(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 100;
    const account = getBankAccount(balance);
    try {
      expect(account.withdraw(2 * balance).getBalance()).toEqual(balance);
    } catch (error) {
      expect(`${error}`).toEqual(`${new InsufficientFundsError(balance)}`);
    }
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 100;
    const account1 = getBankAccount(balance);
    const account2 = getBankAccount(balance);
    try {
      expect(account1.transfer(2 * balance, account2).getBalance()).toEqual(
        balance,
      );
    } catch (error) {
      expect(`${error}`).toEqual(`${new InsufficientFundsError(balance)}`);
    }
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 100;
    const account = getBankAccount(balance);
    try {
      expect(account.transfer(balance, account).getBalance()).toEqual(balance);
    } catch (error) {
      expect(`${error}`).toEqual(`${new TransferFailedError()}`);
    }
  });

  test('should deposit money', () => {
    const balance = 100;
    const deposit = 100;
    const account = getBankAccount(balance);
    expect(account.deposit(deposit).getBalance()).toEqual(balance + deposit);
  });

  test('should withdraw money', () => {
    const balance = 100;
    const withdraw = 50;
    const account = getBankAccount(balance);
    expect(account.withdraw(withdraw).getBalance()).toEqual(balance - withdraw);
  });

  test('should transfer money', () => {
    const balance1 = 100;
    const balance2 = 200;
    const transfer = 50;
    const account1 = getBankAccount(balance1);
    const account2 = getBankAccount(balance2);
    expect(account1.transfer(transfer, account2).getBalance()).toEqual(
      balance1 - transfer,
    );
    expect(account2.getBalance()).toEqual(balance2 + transfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 100;
    const account = getBankAccount(balance);
    let result = null;
    do {
      result = await account.fetchBalance();
    } while (result === null);
    expect(typeof result).toEqual('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = Number.MAX_SAFE_INTEGER;
    const account = getBankAccount(balance);
    let result = null;
    do {
      try {
        result = await account.synchronizeBalance();
      } catch (error) {
        result = error;
      }
    } while (result);
    expect(account.getBalance()).not.toEqual(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = Number.MAX_SAFE_INTEGER;
    const account = getBankAccount(balance);
    let result = null;
    do {
      try {
        result = await account.synchronizeBalance();
      } catch (error) {
        result = error;
      }
    } while (!result);
    expect(`${result}`).toEqual(`${new SynchronizationFailedError()}`);
  });
});
