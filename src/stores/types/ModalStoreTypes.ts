export interface ModalState {
  /** Show modal */
  isShow: boolean;

  /** Optional type of modal to show */
  type?: string;

  /** Optional modal data */
  data?: unknown;
}

export interface ModalAction {
  show: (props?: {
    type?: ModalState["type"];
    data?: ModalState["data"];
  }) => void;

  close: () => void;
}

export type ModalStore = ModalState & ModalAction;
