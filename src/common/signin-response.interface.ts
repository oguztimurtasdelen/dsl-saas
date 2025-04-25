export interface SignInResponseInterface {
    token: string;
    refreshToken: string;
    expiresIn: number;
    profile: {
        name: string;
        surname: string;
        userRole: string;
        avatar: string;
    }
}