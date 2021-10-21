import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import RequestReset, {
  REQUEST_RESET_MUTATION,
} from '../components/RequestReset';
import userEvent from '@testing-library/user-event';

const email = 'alonso@example.com';

const mocks = [
  {
    request: { query: REQUEST_RESET_MUTATION, variables: { email } },
    result: { data: { sendUserPasswordResetLink: null } },
  },
];

describe('<RequestRest/>', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('calls the mutation when submitted', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );
    userEvent.type(screen.getByPlaceholderText(/Your Email Address/), email);
    userEvent.click(screen.getByText(/Request Reset/));

    const success = await screen.findByText(/Success/i);
    expect(success).toBeInTheDocument();
  });
});
