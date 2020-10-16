export const baseUrl = () => {
    console.log(process.env.NODE_ENV);
    if(process.env.NODE_ENV === 'production') {
        return "http://54.93.233.204:1550";
    } else {
        return "http://localhost:58963";
        //return "http://54.93.233.204:1550";
    }    
} 