import Cookies from 'js-cookie'

export const isLogged = () => {
    const user = Cookies.get('@producerpoint:user')
    return user ? true : false
}

export const doLogout = () => {
    Cookies.remove('@producerpoint:user')
}