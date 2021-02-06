import React, { useState } from 'react';

import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';

// we need to store what the user types in the Form component in the state.

// class SignUp extends React.Component {
//   constructor() {
//     super();
const SignUp = ({ signUpStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  //   this.state = {
  //     displayName: '',
  //     email: '',
  //     password: '',
  //     confirmPassword: '',
  //   };
  // }

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    // const { signUpStart } = this.props;
    // const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    signUpStart({ displayName, email, password });

    //   try {
    //     // 'auth.create...' is a Firebase method that returns a 'userAuth' object which we access by destructuring.
    //     // create user with email and password from this.state above.
    //     const { user } = await auth.createUserWithEmailAndPassword(
    //       email,
    //       password
    //     );
    //     // We successfully created a new user document with the above function and received a 'userAuth' object from Firebase in return. We send that to this function and the displayName as an object as the second argument, so we can save this new user in our database.
    //     await createUserProfileDocument(user, { displayName });
    //     // clear form after sending:
    //     this.setState({
    //       displayName: '',
    //       email: '',
    //       password: '',
    //       confirmPassword: '',
    //     });
    //   } catch (error) {
    //     console.error(error);
    //   }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    // this.setState({ [name]: value });
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  // render() {
  // const { displayName, email, password, confirmPassword } = this.state;
  return (
    <div className='sign-up'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='E-Mail'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          label='Confirm Password'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  signUpStart: userCredentials => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
