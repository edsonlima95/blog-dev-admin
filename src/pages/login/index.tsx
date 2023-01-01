import { Label, TextInput } from "flowbite-react"
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { getSession, signIn } from "next-auth/react"
import { GetServerSideProps } from "next";
import { getCookie, setCookie } from "cookies-next";
import style from './style.module.css'
import api from "../../services/axios";
import Router from 'next/router'
import { UserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";

type LoginProps = {
    name?: string;
    email: string;
    password: string;
}

function Login() {

    const { register, reset, handleSubmit, formState: { errors } } = useForm<LoginProps>();

    const { setUserProfile } = useContext(UserContext)
    const [isLogin, setIsLogin] = useState(false)


    function onSubmit(data: LoginProps) {

        if (isLogin) {
            signUp(data)
        } else {
            login(data)
        }
    }


    async function login(data: LoginProps) {
        try {

            const response = await api.post("/sign-in", data)

            const { user } = response.data
            const { token } = response.data

            setCookie("blog.token", token, {
                maxAge: 600 * 60 * 24 * 30,//30dias
                path: "/"
            })
            setCookie("blog.user_id", user.id, {
                maxAge: 600 * 60 * 24 * 30,//30dias
                path: "/"
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            setUserProfile(user)

            Router.push("/")

        } catch (e: any) {


            const { errors } = e.response.data

            if (errors) {

                for (const item of errors) {
                    toast.error(item.message)
                }
            }

            toast.error(e.response?.data.message)
        }
    }

    async function signUp(data: LoginProps) {
        try {

            const response = await api.post("/sign-up", data)

            toast.success(response.data.message)

            resetFields()

            setIsLogin(!isLogin)

            Router.push("/login")

        } catch (e: any) {


            const { errors } = e.response.data

            if (errors) {

                for (const item of errors) {
                    toast.error(item.message)
                }
            }

            toast.error(e.response?.data.message)
        }
    }

    function resetFields() {
        reset({
            name: "",
            email: "",
            password: "",

        })
    }

    return (
        <div className="bg-gray-100 grid grid-cols-2 h-screen">
            <div className={`bg-white ${style.bgLeft}`}></div>
            <div className=" flex justify-center items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg w-7/12  p-10 rounded-md" noValidate>
                    <span className="text-xl uppercase font-semibold mb-6 block text-center">Login</span>

                    {isLogin && (
                        <div className="mb-6">
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="name"
                                    value="Nome"
                                />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                placeholder="Digite seu nome"
                                {...register('name')}
                            />
                        </div>

                    )}


                    <div className="mb-6">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email"
                                value="Digite seu email"
                            />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="E-mail"
                            {...register('email')}

                        />
                    </div>
                    <div className="mb-6">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password"
                                value="Digite a senha"
                            />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            placeholder="Senha"
                            {...register('password')}
                        />
                    </div>

                    <button type="submit" className="w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-4">
                        Entrar
                    </button>

                    <span className=" mt-4 text-gray-700 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>Cadastre-se</span>
                </form>
            </div>
        </div>
    )

}

export default Login

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const token = getCookie('blog.token', ctx)

    if (token) {

        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {},
    }
}