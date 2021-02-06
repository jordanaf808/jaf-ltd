// {css} allows us to write and render css in a styled component. see OptionContainer.
// import styled, { css } from 'styled-components';
// no longer need it because we consolidated styled components.
import styled from 'styled-components';
// to style this link component with this style component we need to import it.
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

// Style a <Link> element. instead of 'styled.div', call it as a function().
// we pass component we'd like to style and continue with string interpolation ``
//
export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

// this is where we use a feature we got from importing {css}
// const OptionContainerStyles = css`
//   padding: 10px 15px;
//   cursor: pointer;
// `;
// export const OptionDiv = styled.div`
//   ${OptionContainerStyles}
// `;
