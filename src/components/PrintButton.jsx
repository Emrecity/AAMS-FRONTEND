import toast from "react-hot-toast"

export const usePrint= (id)=>{
    const printPage=()=>{
        let data =document.getElementById(id)
        if(data){
            let NewWindows = window.open('')
            NewWindows.document.write(data.outerHTML)
            NewWindows.print()
            NewWindows.close()
        }
        if(!data){
        toast.error(`can't get element`)
    }
    }

    return {printPage}
 
}