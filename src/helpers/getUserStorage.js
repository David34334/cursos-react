export const getUserStorage = () => {
    return {
        id: localStorage.getItem('AuthUser'),
        name: localStorage.getItem('Username')
    }
}