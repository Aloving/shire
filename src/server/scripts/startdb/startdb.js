module.exports = {
  users: [
    {
      username: 'test',
      password: 'test',
    },
    {
      username: 'admin',
      password: 'admin',
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
