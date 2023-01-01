

import Breadcrumb from "../../components/Breadcrumb"
import { Layout } from "../../components/Layout"



function Post() {

    return (
        <Layout>
            <h1 className="my-6 text-3xl">Post</h1>

            <Breadcrumb title="Post" link="/post" />
        </Layout>
    )

}

export default Post