export const debounce = (func:Function, timeout = 300) =>{
    let timer: number ;
    return (...args:any)=>{
        
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(()=>{
            func(...args);
        },timeout)
    }
}