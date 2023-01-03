import Link from "next/link"
import { Copy, HouseLine, Table } from "phosphor-react"



function MenuLeft() {

    return (
        <aside className="flex-1">

            <nav className="w-2/12 fixed top-0 h-full overflow-y-auto bg-[#1a1c23]">
                <ul className="mt-[70px] p-2 flex flex-col gap-4 text-gray-400">

                    <li className="hover:text-white hover:bg-[#262933] hover:rounded-lg p-3">
                        <Link href="/" className="flex"><HouseLine size={24} className="mr-2" /> Home</Link>
                    </li>
                    <li className="hover:text-white hover:bg-[#262933] hover:rounded-lg p-3" >
                        <Link href="/category/list" className="flex"><Copy size={24} className="mr-2" /> Categorias</Link>
                    </li>

                    <li className="hover:text-white hover:bg-[#262933] hover:rounded-lg p-3" >
                        <Link href="/post" className="flex"><Table size={24} className="mr-2" /> Posts</Link>
                    </li>
                </ul>
            </nav>


        </aside>
    )

}

export default MenuLeft