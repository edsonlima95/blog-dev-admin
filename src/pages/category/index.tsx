import Breadcrumb from "../../components/Breadcrumb"
import { Layout } from "../../components/Layout"



function Category() {

    return (
        <Layout>
            <h1 className="my-6 text-3xl">Categoria</h1>

            <Breadcrumb title="Categoria" link="/category"/>
        </Layout>
    )

}

export default Category