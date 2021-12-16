import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAgenciesQuery } from 'common/api/agencyApi';
import { useGetRolesQuery } from 'common/api/roleApi';
import { useGetUserByIdQuery, useUpdateUserMutation } from 'common/api/userApi';
import { FormCard, PageHeader } from 'common/components/Common';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import * as notificationService from 'common/services/notification';
import { StyledFormWrapper } from 'common/styles/form';
import { useAuth } from 'features/auth/hooks';
import { useRbac } from 'features/rbac';
import { FC, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FormData, UserDetailForm } from '../components/UserDetailForm';

interface RouteParams {
  id: string;
}

export const UpdateUserView: FC = () => {
  const { id } = useParams<RouteParams>();
  const auth = useAuth();
  const { userHasPermission } = useRbac();
  const history = useHistory();
  const [updateUser] = useUpdateUserMutation();
  const { data: user, isLoading: isLoadingUser, error: getUserError } = useGetUserByIdQuery(id);
  const { data: roles = [], isLoading: isLoadingRoles } = useGetRolesQuery();
  const { data: agencies = [], isLoading: isLoadingAgencies } = useGetAgenciesQuery(undefined, {
    skip: !userHasPermission('agency:read'),
  });

  const availableRoles = roles.filter(role => userHasPermission({ permission: 'role:read', data: role }));
  const availableAgencies = agencies.length !== 0 ? agencies : [auth.user!.agency];

  useEffect(() => {
    if (getUserError) {
      notificationService.showErrorMessage('Unable to load user. Returning to user list.');
      history.replace('/users');
    }
  }, [getUserError, history]);

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await updateUser({ id: Number(id), ...data }).unwrap();
      history.push('/users');
      notificationService.showSuccessMessage('User updated.');
    } catch (error) {
      notificationService.showErrorMessage('Unable to update user');
    }
  };

  return (
    <Container>
      <PageHeader>
        <div>
          <h1>Update User</h1>
          <Link to='/users'>
            <FontAwesomeIcon icon={["fas", "chevron-left"]} />  Back to User List
          </Link>
        </div>
      </PageHeader>

      <FormCard>
        <Card.Body>
          <WithLoadingOverlay isLoading={isLoadingUser || isLoadingRoles || isLoadingAgencies}>
      			<StyledFormWrapper>
      			  <UserDetailForm
      				availableRoles={availableRoles}
      				availableAgencies={availableAgencies}
      				defaultValues={user}
      				submitButtonLabel='UPDATE'
      				onSubmit={handleFormSubmit}
      				onCancel={handleFormCancel}
      			  />
      			</StyledFormWrapper>
    		  </WithLoadingOverlay>
        </Card.Body>
      </FormCard>
    </Container>
  );
};
