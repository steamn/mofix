export interface IUser {
  success: boolean;
  result: {
    name: string;
    email: string | null;
    phone: string;
    birthday: Date;
    card_status: string;
  };
}
