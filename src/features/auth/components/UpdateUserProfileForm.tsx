import { FC, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { LoadingButton } from 'common/components/LoadingButton';

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
  defaultValues?: Partial<FormData>;
};

const schema: yup.SchemaOf<FormData> = yup.object().shape({
  firstName: yup.string().trim().required(Constants.errorMessages.FIRST_NAME_REQUIRED),
  lastName: yup.string().trim().required(Constants.errorMessages.LAST_NAME_REQUIRED),
  email: yup.string().required(Constants.errorMessages.EMAIL_REQUIRED).email(Constants.errorMessages.INVALID_EMAIL),
});

export const UpdateUserProfileForm: FC<Props> = ({ onSubmit, defaultValues }) => {
  const {
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    register,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor='firstName'>First Name</Form.Label>
        <Form.Control id='firstName' type='text' {...register('firstName')} isInvalid={!!errors.firstName} />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.firstName?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='lastName'>Last Name</Form.Label>
        <Form.Control id='lastName' type='text' {...register('lastName')} isInvalid={!!errors.lastName} />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.lastName?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control id='email' type='email' {...register('email')} isInvalid={!!errors.email} />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <div className='d-grid gap-2 mt-3'>
        <LoadingButton disabled={!isValid} loading={isSubmitting}>
          UPDATE
        </LoadingButton>
      </div>
    </Form>
  );
};
