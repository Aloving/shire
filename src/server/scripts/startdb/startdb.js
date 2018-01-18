module.exports = {
  users: [
    {
      login: 'test',
      password: 'test',
    },
  ],
  operations: [
    {
      operationType: 'expense',
      user: 'test',
      title: 'Продукты',
      amount: 1000,
    },
    {
      operationType: 'income',
      user: 'test',
      title: 'Зарплата',
      amount: 2000,
    },
  ],
};
