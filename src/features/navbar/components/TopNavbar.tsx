import { CustomButton } from 'common/styles/button';
import { useAuth } from 'features/auth/hooks';
import { FC } from 'react';
import { Button, Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLogoutModal } from '../hooks/useLogoutModal';
import { useNavLinks } from '../hooks/useNavLinks';
import { CustomNavLink } from './CustomNavLink';
import { Logo } from './Logo';
import { SettingsDropdown } from './SettingsDropdown';

type Props = {
  onNavbarToggle: () => void;
};

const BitwiseNavbar = styled(Navbar)`
  background: ${props => props.theme.nav.backgroundColor};

  img {
    border-radius: 6px;
    border: 1px solid white;
  }

  a svg,
  a span {
    color: white;
  }
`;

export const TopNavbar: FC<Props> = () => {
  const { user } = useAuth();
  const navLinks = useNavLinks();
  const { LogoutModal } = useLogoutModal();

  return (
    <BitwiseNavbar collapseOnSelect expand='lg' className='px-3'>
      <Container>
        <Logo />
        {user ? (
          <>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-between'>
              <Nav>
                {navLinks.map(link => (
                  <CustomNavLink key={link.id} link={link} />
                ))}
              </Nav>
              <Nav>
                <SettingsDropdown user={user} />
                <LogoutModal />
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <Nav className='ms-auto'>
            <Link to='/auth/login'>
              <Button variant="link">Login</Button>
            </Link>
            <Link to='/auth/login'>
              <CustomButton>Register</CustomButton>
            </Link>
          </Nav>
        )}
      </Container>
    </BitwiseNavbar>
  );
};
