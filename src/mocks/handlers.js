import { rest } from 'msw';
export const handlers = [
  rest.get(
    'https://us-central1-colavolab.cloudfunctions.net/requestAssignmentCalculatorData',
    (req, res, ctx) => {
      return res(
        ctx.json({
          currency_code: 'KRW',
          items: [
            { count: 1, name: '기본펌', price: 100000 },
            { count: 1, name: '드라이', price: 30000 },
          ],
          discounts: [
            { name: '회원권 할인', rate: 0.1 },
            { name: '기분이다 할인', rate: 0.05 },
          ],
        }),
      );
    },
  ),
];
