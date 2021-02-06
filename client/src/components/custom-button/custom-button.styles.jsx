import styled, { css } from 'styled-components';

// with our css component from styled, we can now write scss in our styled components

const buttonStyles = css`
  background-color: black;
  color: white;
  border: none;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }

  &:focus {
    outline: 1px solid black;
  }
`;

// create separate button styles
const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }

  &:focus {
    outline: 1px solid black;
  }
`;

const googleSignInStyles = css`
  background-color: #4285f4;
  color: white;

  &:hover {
    background-color: #357ae8;
    border: 1px solid black;
  }

  &:focus {
    outline: 1px solid black;
  }
`;

const shopButtonStyles = css`
  width: 80%;
  opacity: 0.7;
  position: absolute;
  top: 255px;
`;

// write a function to call inside this component below.
// const getButtonStyles = props => {
//   if (props.isGoogleSignIn) {
//     return googleSignInStyles;
//   } else
//   return props.inverted ? invertedButtonStyles : buttonStyles;
// };

const getButtonStyles = props => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }

  if (props.shopButton) {
    return { shopButtonStyles, invertedButtonStyles };
  }

  return props.inverted ? invertedButtonStyles : buttonStyles;
};

// create base style
export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;
  border: none;

  ${getButtonStyles}
`;
