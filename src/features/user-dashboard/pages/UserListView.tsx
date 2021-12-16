import { CustomRenderer, GenericTable, TableHeader } from 'common/components';
import ActionButton, { ActionButtonProps } from 'common/components/ActionButton';
import { useConfirmationModal } from 'common/hooks';
import { User } from 'common/models';
import {
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useGetUsersQuery,
  useResendActivationEmailMutation,
} from 'common/api/userApi';
import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { Link, useHistory } from 'react-router-dom';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { HasPermission, useRbac } from 'features/rbac';
import * as notificationService from 'common/services/notification';
import { CreateButton } from 'common/styles/button';
import { Badge, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PageHeader, TableCard } from 'common/components/Common';

type UserTableItem = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  activatedAt: Date | ActionButtonProps;
  role: string;
  actions: ActionButtonProps[];
};

export const UserListView: FC = () => {
  const history = useHistory();
  const { userHasPermission } = useRbac();
  const { data: users = [], isLoading: isLoadingUsers } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [resendActivationEmail] = useResendActivationEmailMutation();
  const { Modal: ConfirmationModal, openModal, closeModal } = useConfirmationModal();

  const getUsersFullName = (user: User) => `${user.firstName} ${user.lastName}`;

  const handleResendActivationEmail = (user: User) => {
    const message = `Resend Activation Email to ${getUsersFullName(user)}?`;

    const onConfirm = () => {
      resendActivationEmail({ id: user.id });
      closeModal();
      notificationService.showSuccessMessage('Activation email has been sent.');
    };

    const onCancel = () => closeModal();

    openModal(message, onConfirm, onCancel);
  };

  const handleDelete = (user: User) => {
    const message = `Delete ${getUsersFullName(user)}?`;

    const onConfirm = () => {
      deleteUser(user.id);
      closeModal();
      notificationService.showSuccessMessage('User deleted.');
    };

    const onCancel = () => closeModal();

    openModal(message, onConfirm, onCancel);
  };

  const handlePasswordReset = (user: User) => {
    const message = `Send Reset Password Email to ${getUsersFullName(user)}?`;

    const onConfirm = () => {
      forgotPassword({ email: user.email });
      closeModal();
    };

    const onCancel = () => closeModal();

    openModal(message, onConfirm, onCancel);
  };

  const navigateToUpdateView = (user: User) => {
    history.push(`/users/update-user/${user.id}`);
  };

  const headers: TableHeader<UserTableItem>[] = [
    { key: 'lastName', label: 'Last Name' },
    { key: 'firstName', label: 'First Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'activatedAt', label: 'Activated' },
    { key: 'actions', label: '' },
  ];

  const roleColor = (role: string) => {
    return {
      'Super Administrator': 'danger',
      'Admin': 'warning',
      'User': 'secondary',
      'Editor': 'info'
    }[role] || 'secondary';
  }

  const items: UserTableItem[] = users.map(user => ({
    id: user.id,
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.email,
    role: user.role.roleName,
    activatedAt: user.activatedAt
      ? new Date(user.activatedAt)
      : {
          icon: 'envelope',
          tooltipText: 'Resend Activation Email',
          onClick: () => handleResendActivationEmail(user),
          show: userHasPermission({ permission: 'user:resend-activation-email', data: user }),
        },
    actions: [
      {
        icon: 'edit',
        tooltipText: 'Edit',
        onClick: () => navigateToUpdateView(user),
        show: userHasPermission({ permission: 'user:update', data: user }),
      },
      {
        icon: 'trash-alt',
        tooltipText: 'Delete',
        onClick: () => handleDelete(user),
        show: userHasPermission({ permission: 'user:delete', data: user }),
      },
      {
        icon: 'lock',
        tooltipText: 'Reset Password',
        onClick: () => handlePasswordReset(user),
        show: userHasPermission({ permission: 'user:send-reset-password-email', data: user }),
      },
    ],
  }));

  const customRenderers: CustomRenderer<UserTableItem>[] = [
    {
      key: 'role',
      renderer: ({ role }) => (
        <Badge pill bg={roleColor(role)}>{role}</Badge>
      )
    },
    {
      key: 'activatedAt',
      renderer: ({ activatedAt }) => (
        <>
          {activatedAt instanceof Date ? (
            new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(activatedAt)
          ) : (
            <>
              <span>Not Activated</span>
              <ActionButton {...activatedAt} />
            </>
          )}
        </>
      ),
    },
    {
      key: 'actions',
      renderer: ({ actions, id }: UserTableItem) => (
        <>
          {actions.map(action => (
            <ActionButton key={id} {...action} />
          ))}
        </>
      ),
    },
  ];

  return (
    <Container>
      <PageHeader>
        <div>
          <h1>User List</h1>
          <Link to='/'>
            <FontAwesomeIcon icon={["fas", "chevron-left"]} />  Back to Dashboard
          </Link>
        </div>
        <HasPermission perform='user:create'>
          <div>
            <Link to='/users/create-user'>
              <CreateButton>Add User</CreateButton>
            </Link>
          </div>
        </HasPermission>
      </PageHeader>

      <TableCard>
        <Card.Body>
          <WithLoadingOverlay isLoading={isLoadingUsers}>
            <GenericTable<UserTableItem> headers={headers} items={items} customRenderers={customRenderers} />
          </WithLoadingOverlay>
          </Card.Body>
      </TableCard>
      <ConfirmationModal />
    </Container>
  );
};
