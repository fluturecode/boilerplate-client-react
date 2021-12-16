import portraitPlaceholder from 'assets/img/portrait_placeholder.png';
import { User } from 'common/models';
import { FC } from 'react';
import styled from 'styled-components';

const ProfileInfoWrapper = styled.div`
  background: #efefef;
  width: 100%;
  border-radius: 6px;
  display: flex;
  align-items: center;
  color: #666;
  padding: 1rem;
  font-size: 0.9rem;

  img {
    border-radius: 50%;
    height: 32px;
    width: 32px;
    margin: 0;
    margin-right: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  }

  small {
    color: #999;
  }
`;

type Props = {
  user: User;
};

const UserDetail = styled.div`
`;

export const SettingsDropdown: FC<Props> = ({ user }) => {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <ProfileInfoWrapper>
      <img width="24" height="24" src={user.profilePicture || portraitPlaceholder} alt={fullName} />
      <UserDetail>
        <div>{user.firstName} {user.lastName.charAt(0)}.</div>
        <small>{user.role.roleName}</small>
      </UserDetail>
    </ProfileInfoWrapper>
  );
};
