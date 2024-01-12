import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModalOpenPayload, IModalStore } from '@types';

const baseName = 'modal';

const initialState: IModalStore = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: baseName,
  initialState,
  reducers: {
    openModal: (_, { payload }: PayloadAction<IModalOpenPayload>) => ({
      ...payload,
      isOpen: true,
    }),
    closeModal: () => (initialState),
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
