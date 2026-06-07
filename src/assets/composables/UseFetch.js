import{ref} from  "vue";
export function UseFetch(url){
const data = ref(null);
const loading = ref(false);
const error =ref (null);
const fetchData=async()=>{
loading.value=true;
error.value=null;
try{
const res=await fetch(url);
if(!res.ok)throw new error("API ERROR");
const result =await res.json();
data.value=result.users;
}catch(err){
    error.value=err.message;
}

finally{
    loading.value=false;
}
};
return{data,loading,error,fetchData};
}











