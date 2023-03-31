import App from '@src/App';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, screen, act } from './utils';

const event = userEvent.setup();
test('discount의 할인 대상 item을 선택하지 않으면 장바구니에 담긴 모든 item을 할인 적용', async () => {
  renderWithProviders(<App />);
  const hairMenu = screen.getByTestId('item');
  await act(async () => {
    await event.click(hairMenu);
  });
  const itemTitle = screen.getByText('시술 메뉴');
  expect(itemTitle).toBeInTheDocument();

  const cartList = await screen.findAllByTestId('cart');
  expect(cartList).toHaveLength(2);

  const dry = await screen.findByText('드라이');
  const plain = await screen.findByText('기본펌');
  await act(async () => {
    await event.click(dry);
    await event.click(plain);
  });

  const completeButton = await screen.findByText('완료');
  await act(async () => {
    await event.click(completeButton);
  });
  const price = await screen.findByTestId('price');
  expect(price).toHaveTextContent('130,000');

  // discount 장바구니에 추가하기
  const disMenu = await screen.findByTestId('discount');
  await act(async () => {
    await event.click(disMenu);
  });

  const disTitle = await screen.findByText('할인');
  expect(disTitle).toBeInTheDocument;

  const disList = await screen.findAllByTestId('dis');
  expect(disList).toHaveLength(3);

  const membershipDis = await screen.findByText('회원권 할인');
  const specialDis = await screen.findByText('기분이다 할인');
  await act(async () => {
    await event.click(membershipDis);
    await event.click(specialDis);
  });

  const completeDisButton = await screen.findByText('완료');
  await act(async () => {
    await event.click(completeDisButton);
  });
  const disAppliedPirce = await screen.findByTestId('price');
  expect(disAppliedPirce).toHaveTextContent('110,500');
});

test('discount 의 할인 대상 item을 선택한 경우 선택한 항목만 할인 적용', async () => {
  renderWithProviders(<App />);
  // item 장바구니에 추가하기
  const hairMenu = screen.getByTestId('item');
  await act(async () => {
    await event.click(hairMenu);
  });
  const itemTitle = screen.getByText('시술 메뉴');
  expect(itemTitle).toBeInTheDocument();

  const cartList = await screen.findAllByTestId('cart');
  expect(cartList).toHaveLength(2);

  const dry = await screen.findByText('드라이');
  const plain = await screen.findByText('기본펌');
  await act(async () => {
    await event.click(dry);
    await event.click(plain);
  });

  const completeButton = await screen.findByText('완료');
  await act(async () => {
    await event.click(completeButton);
  });
  const price = await screen.findByTestId('price');
  expect(price).toHaveTextContent('130,000');

  const disMenu = await screen.findByTestId('discount');
  await act(async () => {
    await event.click(disMenu);
  });

  const disTitle = await screen.findByText('할인');
  expect(disTitle).toBeInTheDocument;

  const membershipDis = await screen.findByText('회원권 할인');
  await act(async () => {
    await event.click(membershipDis);
  });

  const completeDisButton = await screen.findByText('완료');
  await act(async () => {
    await event.click(completeDisButton);
  });
  const disAppliedPirce = await screen.findByTestId('price');
  expect(disAppliedPirce).toHaveTextContent('117,000');

  const disList = await screen.findByTestId('disList');
  const disPrice = await screen.findByTestId('disPrice');

  expect(disList).toHaveTextContent('드라이,기본펌');
  expect(disPrice).toHaveTextContent('-13,000원');

  const updateButton = await screen.findByTestId('disModal');
  await act(async () => {
    await event.click(updateButton);
  });

  const disTargetTitle = screen.getByTestId('회원권 할인');
  expect(disTargetTitle).toBeInTheDocument();

  const notSelectedDry = screen.getByTestId('드라이');
  await act(async () => {
    await event.click(notSelectedDry);
  });
  const removeCheck = await screen.findByTestId('notSelected');
  expect(removeCheck).toBeInTheDocument();

  const saveButton = screen.getByRole('button', { name: '확인' });
  await act(async () => {
    await event.click(saveButton);
  });
  expect(disList).toHaveTextContent('기본펌');
  expect(disPrice).toHaveTextContent('-10,000원');
  expect(disAppliedPirce).toHaveTextContent('120,000');
});
