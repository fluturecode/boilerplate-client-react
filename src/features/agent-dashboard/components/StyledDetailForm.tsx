import { FC } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import styled from 'styled-components';

const BootstrapButton: FC<ButtonProps> = ({ children, ...rest }) => <Button {...rest}>{children}</Button>;

export const StyledFormWrapper = styled.div`
  max-width: 500px;
  min-width: 500px;
  padding: 50px;
  background-color: ${(props) => props.theme.forms.backgroundColor};
  border-radius: 0.25rem;

  & label {
    color: white;
  }

  & .invalid-feedback {
    /* Modify style of validation error messages here */
  }
`;

export const StyledFormTitle = styled.p`
  color: ${(props) => props.theme.forms.titleColor};
  font-size: 2em;
  font-weight: 500;
`;

export const StyledFormButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  & button {
    margin-right: 10px;
  }

  & button:last-of-type {
    margin-right: 0;
  }
`;

export const StyledCancelButton = styled(BootstrapButton)`
  min-width: 146px;
  min-height: 24px;
  padding: 10px;
  margin: 0;
  background-color: ${(props) => props.theme.buttons.backgroundColor};
  border-color: ${(props) => props.theme.buttons.border};
  color: ${(props) => props.theme.buttons.textColorDark};
  &,
  &:hover,
  &:active,
  &:focus {
    background-color: ${(props) => props.theme.buttons.hoverBackgroundColor} !important;
    border-color: ${(props) => props.theme.buttons.textColorLight} !important;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(52 58 64 / 50%);
  }
`;

export const StyledSubmitButton = styled(BootstrapButton)`
  min-width: 146px;
  min-height: 24px;
  padding: 10px;
  margin: 0;

  &,
  &:hover,
  &:active,
  &:focus {
    background-color: ${(props) => props.theme.accent} !important;
    border-color: ${(props) => props.theme.accentBorder} !important;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(52 58 64 / 50%);
  }
`;
