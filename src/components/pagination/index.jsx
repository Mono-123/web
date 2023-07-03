import { useState } from "react";
import usePagination from "../../utils/usePagination"
import "./inputStyle.css"
import { Pagination } from 'antd';
const onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
};
const App = () => (
    <>
        <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
        <br />
        <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} disabled />
    </>
);

export default () => {
    const { page, goNextPage, goPage, goPreviousPage, goFirstPage } = usePagination();
    const [jump, setJump] = useState()

    return (
        <div>

            <Pagination showQuickJumper defaultCurrent={2} total={100} onChange={onChange} />
            <br />
            <Pagination showQuickJumper defaultCurrent={2} total={100} onChange={onChange} disabled />

            <button onClick={goFirstPage}>首页</button>

            <button onClick={goPreviousPage}>上一页</button>

            当前第 {page} 页

            <button onClick={goNextPage}>下一页</button>

            <p> 跳转到第<input onChange={(e) => setJump(e.target.value)} />页
                <button onClick={(e) => goPage(jump)} disabled={!jump}>确定</button>
            </p>
        </div>
    )
}