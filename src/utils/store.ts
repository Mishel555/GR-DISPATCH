import { Action } from '@reduxjs/toolkit';

const isActionPending = (name: string) => (action: Action) => action.type.startsWith(`${name}/`) && action.type.endsWith('/pending');
const isActionRejected = (name: string) => (action: Action) => action.type.startsWith(`${name}/`) && action.type.endsWith('/rejected');
const isActionFulfilled = (name: string) => (action: Action) => action.type.startsWith(`${name}/`) && action.type.endsWith('/fulfilled');

export {
  isActionPending,
  isActionRejected,
  isActionFulfilled,
};
