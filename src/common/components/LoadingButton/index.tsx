import { FC } from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import styled from 'styled-components';

const BootstrapButton: FC<ButtonProps> = ({ children, ...rest }) => <Button {...rest}>{children}</Button>;

type LoadingButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
};

const StyledButton = styled(BootstrapButton)`
  color: ${props => props.theme.buttons.submitTextColor};
  background-color: ${props => props.theme.buttons.submitBackgroundColor};
  border-color: ${props => props.theme.buttons.submitBorderColor};
  padding: 0.5rem 1rem;

  & .spinner-border {
    margin-right: 1em;
  }
`;

export const LoadingButton: FC<LoadingButtonProps> = ({ disabled, loading, children, onClick }) => {
  return (
    <StyledButton type='submit' disabled={disabled || loading} onClick={onClick}>
      {loading && <span className='spinner-border spinner-border-sm' />}
      {children}
    </StyledButton>
  );
};
