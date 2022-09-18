export interface IContact {
    "id": number,
    "ownerEmail": string,
    "name": string,
    "phone": string,
    "email"?: string
}

export interface IUser {
    "id": number,
    "name": string,
    "email": string,
    "token": string
}

export interface ILoginForm {
    "email": string,
    "password": string
}