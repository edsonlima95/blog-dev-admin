import { Gear, SignOut, UserPlus } from "phosphor-react"
import { useState } from "react"




function Header() {

    const [show, setShow] = useState(false)

    function showProfile() {
        setShow(!show)
    }
    
    return (
        <header className="bg-[#1a1c23] min-h-[70px] flex justify-end items-center px-8">

            <button type="button"><Gear size={24} onClick={showProfile} className="text-gray-400" /></button>

            <div className={`${show ? 'block' : 'hidden'}`}>
                <div className="fixed top-20 right-5 p-3 rounded-lg w-[330px]  bg-[#1a1c23] ">
                    <div className="flex items-center border-b  border-gray-500">
                        <div className="w-12 h-12 mb-3">
                            <img className="rounded-full" src="/images/perfil.jpg" alt="Rounded avatar" />
                        </div>
                        <span className="text-gray-400 block ml-3 font-bold mb-3">Olá, Edson Lima</span>
                    </div>

                    <ul className="gap-2 flex flex-col mt-5 items-center ">
                        <li className="flex items-center w-full hover:bg-zinc-700  rounded-md mb-4 cursor-pointer">
                            <div className="bg-zinc-700 rounded-full p-2">
                                <UserPlus className="text-gray-300" size={26} weight="fill" />
                            </div>
                            <span className="ml-2 text-gray-400 font-bold  flex-1">Perfil</span>

                        </li>
                        <li className="flex items-center w-full hover:bg-zinc-700  rounded-md cursor-pointer">
                            <div className="bg-zinc-700 rounded-full p-2">
                                <SignOut className="text-gray-300" size={26} weight="fill" />
                            </div>
                            <span className="ml-2 text-gray-400 font-bold  flex-1">Sair</span>

                        </li>

                    </ul>
                </div>
            </div>

        </header>

    )
}

export default Header