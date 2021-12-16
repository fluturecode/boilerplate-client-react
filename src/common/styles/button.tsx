import { FC } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import styled from 'styled-components';

const BootstrapButton: FC<ButtonProps> = ({ children, ...rest }) => <Button {...rest}>{children}</Button>;

export const CreateButton = styled(BootstrapButton)`
  color: ${props => props.theme.buttons.primaryTextColor};
  background-color: ${props => props.theme.buttons.primaryBackgroundColor};
  border-color: ${props => props.theme.buttons.primaryBorderColor};
  text-transform: uppercase;
  padding: 0.4rem 1rem;
  border-radius: 6px;

  &:hover {
    background-color: ${props => props.theme.buttons.primaryHoverBackgroundColor};
    border-color: ${props => props.theme.buttons.primaryHoverBorderColor};
  }
`;

export const CancelButton = styled(BootstrapButton)`
  color: ${props => props.theme.buttons.cancelTextColor};
  background-color: ${props => props.theme.buttons.cancelBackgroundColor};
  border-color: ${props => props.theme.buttons.cancelBorderColor};
  text-transform: uppercase;
  padding: 0.4rem 1rem;
  border-radius: 6px;
`;

export const SubmitButton = styled(BootstrapButton)`
  color: ${props => props.theme.buttons.primaryTextColor};
  background-color: ${props => props.theme.buttons.primaryBackgroundColor};
  border-color: ${props => props.theme.buttons.primaryBorderColor};
  text-transform: uppercase;
  padding: 0.4rem 1rem;
  border-radius: 6px;
`;

export const CustomButton = styled(BootstrapButton)`
  text-transform: uppercase;
  background-color: ${props => props.theme.buttons.backgroundColor};
  border-color: ${props => props.theme.buttons.backgroundColor};
  color: ${props => props.theme.buttons.text};
  width: ${props => props.theme.buttons.width};
  padding: 0.4rem 1rem;
  border-radius: 6px;

  &:hover {
    background-color: ${props => props.theme.buttons.hoverBackgroundColor};
    border-color: ${props => props.theme.buttons.hoverBorderColor};
  }

  &:disabled {
    background-color: ${props => props.theme.buttons.disabledBackgroundColor};
    border-color: #999;
    border: ${props => props.theme.buttons.disabledBackgroundColor};;
    color: #999;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  & button {
    margin-right: 10px;
    border-radius: 6px;
  }

  & button:last-of-type {
    margin-right: 0;
  }
`;
