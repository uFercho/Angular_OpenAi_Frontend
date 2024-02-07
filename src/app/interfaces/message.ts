export interface Message {
  text: string;
  isGpt: boolean;
  info?: MessageInfo;
  audioUrl?: string;
  imageInfo?: MessageImageInfo;
}

export interface MessageInfo {
  userScore: number;
  errors: string[];
  message: string;
}

export interface MessageImageInfo {
  url: string;
  alt: string;
}
