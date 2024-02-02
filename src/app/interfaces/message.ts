export interface Message {
  text: string;
  isGpt: boolean;
  info?: MessageInfo;
}

export interface MessageInfo {
  userScore: number;
  errors: string[];
  message: string;
}
