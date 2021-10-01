import Form from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Error from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

const Reset = ({ token }) => {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await reset().catch(console.error);
    resetForm();
  };
  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;
  return (
    <Form method='POST' onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <Error error={error || successfulError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You Can Now Sign In!</p>
        )}

        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            placeholder='Your Email Address'
            autoComplete='email'
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            placeholder='Password'
            autoComplete='password'
            value={inputs.password}
            onChange={handleChange}
          />
        </label>

        <button type='submit'>Request Reset</button>
      </fieldset>
    </Form>
  );
};

export default Reset;
