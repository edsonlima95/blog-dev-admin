import { ReactNode } from "react";
import Header from "../Header";
import MenuLeft from "../MenuLeft";

type LayoutProps = {
    children: ReactNode
}

function Layout({ children }: LayoutProps) {



    return (
        <>
            <div className="flex">

                <MenuLeft />

                <main className="w-10/12">

                    <Header />

                    <div className="p-4">
                        {children}
                    </div>

                </main>

            </div>
        </>
    )
}

export { Layout }