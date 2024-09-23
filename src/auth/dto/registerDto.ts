import { Gender } from "@prisma/client"

export class RegisterClients {
    email: string
    password: string
    name: string
    gender: Gender
    age: number
}

export class RegisterProvider {
    email:string
    password:string
    name:string
    gender:Gender
    age:number
    aboutMe:string
}