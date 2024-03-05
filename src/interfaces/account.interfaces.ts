export interface IFormUserCreate {
  answerQuestion: string;
  email: string;
  password: string;
  securityQuestion?: string;
  repeatPassword: string;
  checkbox: NonNullable<boolean | undefined>;
  error?: string;
}
