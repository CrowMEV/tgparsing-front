export interface Mailing {
  name: string;
  channel: string;
  image: File | null;
  message: string;
  link: string;
  linkMessage: string;
  isPro: boolean;
  sendingSms: boolean;
  sendingTestMessage: boolean;
  saveTemplate: boolean;
}
