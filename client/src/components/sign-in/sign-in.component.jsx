import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user.actions';

import './sign-in.styles.scss';

// class SignIn extends React.Component {
// constructor(props) {
//   super(props);

//   this.state = {
//     email: '',
//     password: '',
//   };
// }

// convert to Hook.

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  // convert from this.state to useState
  // we still want to pass in an object to useState because we want the methods below to still work
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    // destructured from the props we pass in.
    // const { emailSignInStart } = this.props;
    // get from userCredentials
    // const { email, password } = this.state;
    emailSignInStart(email, password);
  };

  const handleChange = event => {
    const { value, name } = event.target;
    // this.setState({ [name]: value });
    // similarly to our reducer logic, we want to spread in all the userCredentials and the credentials we want to change
    setCredentials({ ...userCredentials, [name]: value });
  };

  // remove render() for hook
  // render() {
  // passed in as props
  // const { googleSignInStart } = this.props;

  // instead of         <form onSubmit={this.handleSubmit}>
  // destructure email and password above
  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          label='email'
          value={email}
          handleChange={handleChange}
          required
        />
        <FormInput
          name='password'
          type='password'
          label='password'
          value={password}
          handleChange={handleChange}
          required
        />
        <CustomButton type='submit'> Sign In </CustomButton>
        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
          Sign In with Google
        </CustomButton>
      </form>
    </div>
  );
};
// }

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
