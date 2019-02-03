export class MockData {

  static transactions = [
    {
      id: 'e1fddb7a-cd29-4d42-a697-0034e87e893e',
      date: '2010-01-01T12:00:00',
      categoryId: '2ac8484d-812f-4ea0-acbe-3e2b0827a4ea',
      category: 'category 1',
      title: 'Costco',
      amount: 22.34
    },
    {
      id: '048d08a0-64dd-41fb-b961-8d99fb86110a',
      date: '2010-01-02T12:00:00',
      categoryId: 'd241843d-6812-47ec-86fb-f73392ca4fe4',
      category: 'category 2',
      title: 'Walmart',
      amount: 52.75
    },
    {
      id: '735cd23b-3694-4441-ba9f-9656b7675a68',
      date: '2010-01-03T12:00:00',
      categoryId: 'c6b0159f-533d-4112-bb75-0502eac9a69c',
      category: 'category 4',
      title: 'King Sooper',
      amount: 74.82
    }
  ];

  static categories = [
    {
      id: '2ac8484d-812f-4ea0-acbe-3e2b0827a4ea',
      title: 'category 1',
      type: 'expense'
    },
    {
      id: 'd241843d-6812-47ec-86fb-f73392ca4fe4',
      title: 'category 2',
      type: 'expense'
    },
    {
      id: '40bbb6d8-f600-4d91-8e9a-f9a52f4119c0',
      title: 'category 3',
      type: 'expense'
    },
    {
      id: 'c6b0159f-533d-4112-bb75-0502eac9a69c',
      title: 'category 4',
      type: 'expense'
    }
  ];
}
