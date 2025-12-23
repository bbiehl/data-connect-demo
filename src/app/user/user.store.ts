import { GetUserByIdData } from "@dataconnect/generated";

type UserState = {
    currentUser: GetUserByIdData | null;
    pending: boolean;
    error: string | null;
};