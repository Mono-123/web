import usePagination from "../../utils/usePagination"

export default () => {
    const { page, goNextPage, goFirstPage } = usePagination();

    return (
        <div>
            <button onClick={goFirstPage}>首页</button>

            当前第 {page} 页

            <button onClick={goNextPage}>下一页</button>
        </div>
    )
}