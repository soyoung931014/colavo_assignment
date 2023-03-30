import Count from '@src/components/modal/Count';
import Checkout from '@src/pages/Checkout';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, screen, act } from './utils';

const event = userEvent.setup();

const setup = async () => {
  const utils = renderWithProviders(<Count />);
  const input = await screen.findByLabelText('count-input');
  return {
    input,
    ...utils,
  };
};
describe('item, discount는 각각 장바구니로 추가/삭제하기', () => {
  test('item 추가/삭제하기', async () => {
    renderWithProviders(<Checkout />);
    const hairMenu = screen.getByTestId('item');
    await act(async () => {
      await event.click(hairMenu);
    });
    const itemTitle = screen.getByText('시술 메뉴');
    expect(itemTitle).toBeInTheDocument();

    const cartList = await screen.findAllByTestId('cart');
    expect(cartList).toHaveLength(2);

    const dry = await screen.findByText('드라이');
    await act(async () => {
      await event.click(dry);
    });
    const completeButton = await screen.findByText('완료');
    await act(async () => {
      await event.click(completeButton);
    });

    const item = await screen.findByText('드라이');
    const price = await screen.findByTestId('price');
    expect(item).toBeInTheDocument();
    expect(price).toHaveTextContent('30,000');

    const modalButton = screen.getByTestId('modal');
    await act(async () => await event.click(modalButton));

    const deleteButton = await screen.findByRole('button', { name: '삭제' });
    await act(async () => {
      await event.click(deleteButton);
    });
    expect(item).not.toBeInTheDocument();
    expect(price).toHaveTextContent(0);
  });
  test('discount 추가/삭제하기', async () => {
    renderWithProviders(<Checkout />);

    const disMenu = await screen.findByTestId('discount');
    await act(async () => {
      await event.click(disMenu);
    });

    const disTitle = await screen.findByText('할인');
    expect(disTitle).toBeInTheDocument();

    const disList = await screen.findAllByTestId('dis');
    expect(disList).toHaveLength(3);

    const membershipDis = await screen.findByText('회원권 할인');
    await act(async () => {
      await event.click(membershipDis);
    });

    const completeDisButton = await screen.findByText('완료');
    await act(async () => {
      await event.click(completeDisButton);
    });

    const disItem = await screen.findByText('회원권 할인');
    expect(disItem).toBeInTheDocument();

    const modalButton = await screen.findByTestId('disModal');
    await act(async () => await event.click(modalButton));

    const deleteButton = await screen.findByRole('button', { name: '삭제' });
    await act(async () => {
      await event.click(deleteButton);
    });
    expect(disItem).not.toBeInTheDocument();
  });
});

test('item의 수량 선택 가능 ex) 기본펌 X 3', async () => {
  renderWithProviders(<Checkout />);
  const hairMenu = screen.getByTestId('item');
  await act(async () => {
    await event.click(hairMenu);
  });

  const perm = await screen.findByText('기본펌');
  await act(async () => {
    await event.click(perm);
  });

  const completeButton = await screen.findByText('완료');
  await act(async () => {
    await event.click(completeButton);
  });

  const item = await screen.findByText('기본펌');
  const price = await screen.findByTestId('price');
  expect(item).toBeInTheDocument();
  expect(price).toHaveTextContent('100,000');

  const modalButton = screen.getByTestId('modal');
  await act(async () => await event.click(modalButton));

  const countInput = await screen.findByRole('textbox');
  expect(countInput).toBeInTheDocument();

  await act(async () => {
    await event.type(countInput, '3');
  });

  const saveButton = await screen.findByRole('button', { name: '확인' });
  await act(async () => {
    await event.click(saveButton);
  });
  const count = await screen.findByTestId('count');
  expect(count).toHaveTextContent('3');
  expect(price).toHaveTextContent('300,000');
});
