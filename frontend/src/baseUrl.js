export const baseUrl = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return '';
    } else {
        return 'https://trashrewardingapp.onrender.com'
    }
}