import Link from "next/link"
import { HouseLine } from "phosphor-react"

type BreadcrumbProps = {
    title: string,
    link: string,
}

function Breadcrumb({title, link}: BreadcrumbProps) {

    return (
        <>
            <nav className="flex bg-[#1a1c23] p-4 rounded-md" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white"
                        >
                         <HouseLine size={18} weight="fill" className="mr-2"/>
                            Home
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg
                                className="w-6 h-6 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <Link
                                href={`${link}`}
                                className="ml-1 text-sm font-medium text-gray-400 md:ml-2 hover:text-white">
                                {title}
    
                            </Link>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg
                                className="w-6 h-6 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                                Lista
                            </span>
                        </div>
                    </li>
                </ol>
            </nav>
        </>
    )

}

export default Breadcrumb