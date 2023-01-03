import { useState } from "react";



function usePagination<T>(data: T[], itemsPerPage: number) {

    //PAGINAÇÂO
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;

    const currentData = data?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data?.length / itemsPerPage);

    //Manipula os links da paginação
    function handlePaginate(event: { selected: number }) {

        const newOffset = (event.selected * itemsPerPage) % data?.length;
        setItemOffset(newOffset);

    };

    return {
        currentData,
        pageCount,
        handlePaginate
    }

}

export default usePagination