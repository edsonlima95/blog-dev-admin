import Breadcrumb from "../../../components/Breadcrumb"
import { Layout } from "../../../components/Layout"
import { useEffect, useState } from "react"
import api from "../../../services/axios"
import ReactPaginate from "react-paginate"
import usePagination from "../../../hooks/usePagination"
import { GetServerSideProps } from "next"
import { getCookie } from "cookies-next"
import { PencilLine, Trash } from 'phosphor-react'
import Link from "next/link"
import { toast } from "react-toastify"

type Category = {
    id: number,
    name: string,
    description?: string
}

function Category() {


    const [categories, setCategories] = useState<Category[]>([])

    const [search, setSearch] = useState("")

    const itemsPerPage = 3

    const { currentData, pageCount, handlePaginate } = usePagination<Category>(categories, itemsPerPage)

    useEffect(() => {

        getCategories()

    }, [])


    function getCategories() {

        api.get('/categories').then((response) => {

            setCategories(response.data)
            
        }).catch((error) => {
            console.log(error)
        })
        
    }

    function removeCategory(id: number) {
        
        api.delete(`/categories/${id}`).then((response) => {
            const { categories } = response.data
            setCategories(categories)
            
            toast.success(response.data.message)
            
        }).catch((error) => {
            console.log(error)
        })

    }




    return (
        <Layout>
            <h1 className="my-6 text-3xl">Categoria</h1>

            <Breadcrumb title="Categoria" link="/category" active="Lista" />

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">

                <table className="bg-[#1a1c23] w-full text-sm text-left text-gray-500">

                    <thead className="border-b border-b-gray-700 text-xs text-gray-400 uppercase ">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Id
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Nome
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Descrição
                            </th>
                            <th scope="col" className="py-3 px-6">


                                <form>
                                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        </div>
                                        <input type="search" onChange={(e) => setSearch(e.target.value)} id="default-search" className="block w-full p-2 pl-10 rounded-lg  focus:ring-blue-500 focus:border-blue-500 bg-[#121317] border border-gray-700 text-white text-sm" placeholder="Pesquisa..." />
                                    </div>
                                </form>

                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {currentData?.filter((value) => {
                            if (search == "") {
                                return value
                            } else if (value.name.toLowerCase().includes(search.toLowerCase())) {
                                return value
                            }
                        }).map(category =>

                            <tr key={category.id} className="border-b  border-gray-800">

                                <td className="py-4 px-6">{category.id}</td>
                                <td className="py-4 px-6">{category.name}</td>
                                <td className="py-4 px-6">{category.description ? category.description : '-'}</td>
                                <td className="py-4 px-6 flex gap-4 items-center justify-center">
                                    <Link href={`/category/${category.id}`}>
                                        <PencilLine size={20} className="text-white bg-blue-700 w-10 p-2 rounded-full h-10" />
                                    </Link>
                                    <Link href="" onClick={() => removeCategory(category?.id)}>
                                        <Trash size={20} className="text-white bg-red-500 w-10 p-2 rounded-full h-10" />
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>
            <div className="flex justify-end">

                <ReactPaginate
                    className="inline-flex -space-x-px mt-4"
                    previousClassName="px-3 py-2 ml-0 leading-tight text-gray-400 bg-[#1a1c23] border border-gray-800 rounded-l-lg rounded-l-lg"
                    pageClassName="px-3 py-2 leading-tight text-gray-500 bg-[#1a1c23] border border-gray-800 hover:bg-gray-700 hover:text-white"
                    activeClassName="bg-blue-900 text-white"
                    nextClassName="px-3 py-2 ml-0 leading-tight text-gray-400 bg-[#1a1c23] border border-gray-800 rounded-r-lg"
                    breakLabel="..."
                    nextLabel="próximo"
                    onPageChange={handlePaginate}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="voltar"
                />

            </div>
        </Layout>
    )

}


export const getServerSideProps: GetServerSideProps = async (ctx) => {


    const token = getCookie('blog.token', ctx)

    if (!token) {

        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }

}

export default Category