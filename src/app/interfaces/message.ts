export interface Message {
  text: string;
  isGpt: boolean;
  info?: MessageInfo;
  audioUrl?: string;
}

export interface MessageInfo {
  userScore: number;
  errors: string[];
  message: string;
}
