import type { ReyMessageProps } from "rey-mix";

export interface MessageType
  extends Omit<ReyMessageProps, "horizontal" | "vertical"> {
  horizontal?: ReyMessageProps["horizontal"];
  vertical?: ReyMessageProps["vertical"];
}
export interface MessageStateType {
  message: MessageType | null;
}

export interface MessageActionType {
  show: (message: Omit<MessageType, "open">) => void;
  showSuccess: (props: Omit<MessageType, "open" | "color">) => void;
  showError: (props: Omit<MessageType, "open" | "color">) => void;
  close: () => void;
}

export type MessageStoreType = MessageStateType & MessageActionType;
