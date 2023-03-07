
export interface AuthResponse  {
    status: boolean;
    msg?: string;
    name?: string;
    email?: string
    uid?: string;
    token?: string;
}

export interface User {
    uid: string
    name: string
    email: string
}