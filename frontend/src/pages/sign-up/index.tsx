import { useState } from "react";
import logo from "@/assets/logo.svg"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth";

export function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const signup = useAuthStore((state) => state.signup)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const signupMutate = await signup({
                name,
                email,
                password
            })
            if (signupMutate) {
                toast.success("Cadastro realizado com sucesso!")
            }
        } catch (error) {
            console.error(error)
            toast.error("Erro ao realizar o cadastro")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center gap-6">
            <img src={logo} className="w-64 h-22" />
            <Card className="w-full max-w-md rounded-xl bg-gray-50 p-7 gap-7">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Crie sua conta
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Informe seu nome, e-mail e senha de acesso
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="nome">
                                Nome
                            </Label>
                            <Input
                                id="nome"
                                type="Seu nome"
                                className="px-4 py-3 rounded-lg border-gray-300"
                                placeholder="exemplo@mail.com"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                className="px-4 py-3 rounded-lg border-gray-300"
                                placeholder="exemplo@mail.com"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">
                                Senha
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                className="px-4 py-3 rounded-lg border-gray-300"
                                placeholder="Digite sua senha"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-indigo-700 text-white px-6 py-3"
                            disabled={isLoading}
                        >
                            Cadastrar
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card className="w-full max-w-md rounded-xl p-7 gap-5 bg-gray-50">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Já tem uma conta?
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                        Entre agora mesmo
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        variant={"outline"}
                        className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200" asChild
                    >
                        <Link to={"/login"}>Acessar conta</Link>
                    </Button>
                </CardContent>
            </Card>

        </div>
    )
}