import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import SignUp, { SIGNUP_MUTATION } from '../components/SignUp';
import { fakeUser } from '../lib/testUtils';
import userEvent from '@testing-library/user-event';
import { CURRENT_USER_QUERY } from '../components/User';

const me = fakeUser();
const password = 'alonso';
const mocks = [
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: { name: me.name, email: me.email, password },
    },
    result: {
      data: {
        createUser: {
          __typename: 'User',
          id: 'blah',
          email: me.email,
          name: me.name,
        },
      },
    },
  },

//   {
//     request: { query: CURRENT_USER_QUERY },
//     result: { data: { authenticatedItem: me } },
//   },
];

describe('<SignUp/>', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <SignUp />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('calls the mutation properly', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <SignUp />
      </MockedProvider>
    );
    await userEvent.type(screen.getByPlaceholderText(/name/i), me.name);
    await userEvent.type(screen.getByPlaceholderText(/email/i), me.email);
    await userEvent.type(screen.getByPlaceholderText(/password/i), password);

    await userEvent.click(screen.getByText('Sign Up!'));
    await screen.findByText(
      `Signed up with ${me.email} - Please Go Ahead and Sign In!`
    );
  });
});
