export class MockData {

  static transactions = [
    {
      id: 'e1fddb7a-cd29-4d42-a697-0034e87e893e',
      date: '2010-01-01T12:00:00',
      categoryId: '1111',
      // category: 'category 1',
      description: 'Costco',
      amount: 22.34
    },
    {
      id: '048d08a0-64dd-41fb-b961-8d99fb86110a',
      date: '2010-01-02T12:00:00',
      categoryId: '2222',
      // category: 'category 2',
      description: 'Walmart',
      amount: 52.75
    },
    {
      id: '735cd23b-3694-4441-ba9f-9656b7675a68',
      date: '2010-01-03T12:00:00',
      categoryId: '4444',
      // category: 'category 4',
      description: 'King Sooper',
      amount: 74.82
    }
  ];

  static categories = [
    {
      id: '1111',
      name: 'category 1',
      type: 'expense'
    },
    {
      id: '2222',
      name: 'category 2',
      type: 'expense'
    },
    {
      id: '3333',
      name: 'category 3',
      type: 'expense'
    },
    {
      id: '4444',
      name: 'category 4',
      type: 'expense'
    }
  ];
}
