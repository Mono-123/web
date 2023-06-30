import { useState } from "react";
import usePagination from "../../utils/usePagination"
// import "./inputStyle.css"

export default () => {
    const { page, goNextPage, goPage,goFirstPage } = usePagination();
    const[jump,setJump]=useState()

    return (
        <div>
            <button onClick={goFirstPage}>首页</button>

            当前第 {page} 页

            <button onClick={goNextPage}>下一页</button>

           <p> 跳转到<input type="number" onChange={(e)=>setJump(e.target.value)}/>
            <button onClick={goPage(jump)} disabled={!jump}>确定</button></p>
        </div>
    )
}