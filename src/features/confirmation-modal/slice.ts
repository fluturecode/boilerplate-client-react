import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/redux';

export interface ConfirmationModalState {
  show: boolean;
  loading: boolean;
  message: string;
  cancelButtonLabel: string;
  confirmButtonLabel: string;
}

export type ConfirmationModalOpenPayload = Partial<Pick<ConfirmationModalState, 'message' | 'cancelButtonLabel' | 'confirmButtonLabel'>>;

const initialState: ConfirmationModalState =
  {
    show: false,
    loading: false,
    message: '',
    cancelButtonLabel: 'CANCEL',
    confirmButtonLabel: 'CONFIRM',
  };

export const confirmationModalSlice = createSlice({
  name: 'confirmationModal',
  initialState,
  reducers: {
    modalOpened: (state: ConfirmationModalState, action: PayloadAction<ConfirmationModalOpenPayload>) => {
      const { message, cancelButtonLabel, confirmButtonLabel } = action.payload;
      state.show = true;
      state.message = message || initialState.message;
      state.cancelButtonLabel = cancelButtonLabel || initialState.cancelButtonLabel;
      state.confirmButtonLabel = confirmButtonLabel || initialState.confirmButtonLabel;
    },

    modalClosed: (state: ConfirmationModalState) => {
      state.show = false;
      state.loading = false;
    }
  }
})

export const selectConfirmationModalState = (state: RootState): ConfirmationModalState => state.confirmationModal;