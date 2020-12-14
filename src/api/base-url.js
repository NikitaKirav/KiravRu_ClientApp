export const baseUrl = () => {
    if(process.env.NODE_ENV === 'production') {
        return window.location.origin + ":1550";
    } else {
        return "http://localhost:58963";
        //return "http://kirav.ru:1550";
    }    
} 