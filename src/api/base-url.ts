export const baseUrl = (): string => {
    if(process.env.NODE_ENV === 'production') {
        return window.location.origin + ":1550";
    } else {
        //return "http://localhost:58963";
        return "https://kirav.ru:1550";
    }    
} 