export const baseUrl = (): string => {
    if(process.env.NODE_ENV === 'production') {
        return window.location.protocol + '//' + window.location.hostname + ":80";
    } else {
        //return "http://localhost:58963";
        //return "https://kirav.ru:1550";
        //return "http://localhost:5000";
        return window.location.protocol + '//' + window.location.hostname + ":5000";
    }    
} 