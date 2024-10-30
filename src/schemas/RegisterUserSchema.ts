import z from 'zod'
export const userRegisterSchema = z.object({
    username: z.string().min(3, {message:"O nome do usuário deve ter no minimo 3 caracteres"}),
    password: z.string().min(3, {message:"A senha deve ter no minimo 3 caracteres"}),
    email: z.string().email({message:"e-mail inválido"}),
    confirm_password: z.string()
}).refine(({ password, confirm_password}) => password === confirm_password, {
    message: "Senhas diferentes",
    path: ["confirm_password"]
  })