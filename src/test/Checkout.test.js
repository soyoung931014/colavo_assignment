import Checkout from '@src/pages/Checkout';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, screen, act } from './utils';

const event = userEvent.setup();
describe('item, discount는 각각 장바구니로 추가/ 삭제 가능', () => {
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
