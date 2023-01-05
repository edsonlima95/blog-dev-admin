import { useRouter } from "next/router"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Breadcrumb from "../../../components/Breadcrumb";
import { Layout } from "../../../components/Layout";
import ErrorMessage from "../../../components/Message";
import api from "../../../services/axios";

type CategoryProps = {
    id?: string,
    name: string,
    description?: string
}


function Category() {

    const { register, handleSubmit, reset, setValue, setError, formState: { errors } } = useForm<CategoryProps>();

    const router = useRouter()

    const id = router.query.params?.[0]

    useEffect(() => {


        if (id) {

            api.get(`/categories/${id}`).then(response => {
                const category = response.data


                setValue('name', category.name)
                setValue('description', category.desciption)

            }).catch((error) => {
                console.log(error)
            })

        }

    }, [id])


    function onSubmit(data: CategoryProps) {
        if(id){
            update(data)
        }else{

            create(data)
        }
    }

    function create(data: CategoryProps) {

        api.post("/categories", data).then((response) => {

            toast.success(response?.data.message)
            resetFields()

        }).catch((error) => {
            const { errors } = error.response.data

            if (errors) {

                for (const error of errors) {
                    setError(error.field, { message: error.message })
                }
            }

            toast.error(error.response?.data.message)
        })

    }

    function update(data: CategoryProps) {

        api.put(`/categories/${id}`, data).then((response) => {

            toast.success(response?.data.message)
            

        }).catch((error) => {
            const { errors } = error.response.data

            if (errors) {

                for (const error of errors) {
                    setError(error.field, { message: error.message })
                }
            }

            toast.error(error.response?.data.message)
        })

    }



    function resetFields() {
        reset({
            name: '',
            description: ''
        })
    }

    return (

        <Layout>
            <Breadcrumb title="Lista" link="/category/list" active="Cadastro" />
            <form onSubmit={handleSubmit(onSubmit)} className="bg-[#1a1c23] rounded-lg p-4 mt-4">
                <div className="flex gap-3">

                    <div className="w-6/12 mb-6">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-400 ">
                            Nome
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full bg-[#121317] border border-gray-700 text-white text-sm rounded-lg"
                            placeholder="Digite o nome"
                            {...register('name')}
                        />
                        {<ErrorMessage error={errors.name?.message} />}
                    </div>

                    <div className="w-6/12 mb-6">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-400 ">
                            Descrição
                        </label>
                        <input
                            type="text"
                            id="desciption"
                            className="w-full bg-[#121317] border border-gray-700 text-white text-sm rounded-lg"
                            placeholder="Digite a descrição"
                            {...register('description')}
                        />
                    </div>

                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Cadastrar
                </button>
            </form>
        </Layout>
    )

}

export default Category
