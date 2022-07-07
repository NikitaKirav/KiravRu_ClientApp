export const baseUrl = (): string => {
    if(process.env.NODE_ENV === 'production') {
        return window.location.protocol + '//' + window.location.hostname + ":443";
    } else {
        return window.location.protocol + '//' + window.location.hostname + ":5000";
    }    
} 