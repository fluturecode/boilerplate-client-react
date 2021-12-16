import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAgenciesQuery } from 'common/api/agencyApi';
import { useGetRolesQuery } from 'common/api/roleApi';
import { useCreateUserMutation } from 'common/api/userApi';
import { FormCard, PageHeader } from 'common/components/Common';
import * as notificationService from 'common/services/notification';
import { StyledFormWrapper } from 'common/styles/form';
import { useAuth } from 'features/auth/hooks';
import { useRbac } from 'features/rbac';
import { FC } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { FormData, UserDetailForm } from '../components/UserDetailForm';

export const CreateUserView: FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { userHasPermission } = useRbac();
  const [createUser] = useCreateUserMutation();
  const { data: roles = [], isLoading: isLoadingRoles } = useGetRolesQuery();
  const { data: agencies = [], isLoading: isLoadingAgencies } = useGetAgenciesQuery(undefined, {
    skip: !userHasPermission('agency:read'),
  });

  const availableRoles = roles.filter(role => userHasPermission({ permission: 'role:read', data: role }));

  const availableAgencies = userHasPermission('agency:read') ? agencies : [];

  // If the user doesn't have permission to see list of agencies,then they can
  // only create a new user within their own agency. Hence, the agency will be
  // passed in as a default value.
  const defaultValues: Partial<FormData> = {
    agency: !userHasPermission('agency:read') ? user?.agency : undefined,
  };

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await createUser({ ...data, profilePicture: '' }).unwrap();
      notificationService.showSuccessMessage(
        `An email has been sent to ${data.email} with instructions to finish activating the account.`,
      );
      history.push('/users');
    } catch (error) {
      notificationService.showErrorMessage('Unable to add user.');
    }
  };

  const isLoading = isLoadingRoles || isLoadingAgencies;

  return (
    <Container>
      <PageHeader>
        <div>
          <h1>Create User</h1>
          <Link to='/users'>
            <FontAwesomeIcon icon={["fas", "chevron-left"]} />  Back to User List
          </Link>
        </div>
      </PageHeader>

      <FormCard>
        <Card.Body>

          {!isLoading && (
            <StyledFormWrapper>
              <UserDetailForm
                availableRoles={availableRoles}
                availableAgencies={availableAgencies}
                defaultValues={defaultValues}
                onCancel={handleFormCancel}
                onSubmit={handleFormSubmit}
              />
            </StyledFormWrapper>
          )}
        </Card.Body>
      </FormCard>
    </Container>
  );
};
