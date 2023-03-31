import App from '@src/App';
import { renderWithProviders, screen } from './utils';

test('test: 고객이름은 곽지우', async () => {
  renderWithProviders(<App />);
  const text = await screen.findByText('곽지우');
  expect(text).toHaveTextContent('곽지우');
});
