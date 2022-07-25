import moment from 'moment'

const API = 'https://apiproducers.pointsoft.com.br/api'
//const API = 'http://192.168.1.128:8080/api'
//const API = 'https://producersapi.herokuapp.com/api'


const apiFetchPost = async (endpoint, body) => {

    const headers = new Headers();
    headers.append("Content-Type", "application/json")
    headers.append("Accept", 'application/json')

    const response = await fetch(API + endpoint, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })

    if ((response.status >= 200 && response.status <= 299) || response.status === 400) {
        const json = await response.json()
        if (json) {
            return {
                data: json,
                status: response.status
            }
        } else {
            return {
                data: null,
                status: response.status
            }
        }
    } else {
        return {
            data: null,
            status: response.status,
        }
    }
}

const apiFetchGet = async (endpoint) => {

    const response = await fetch(API + endpoint)
    if (response.status >= 200 && response.status <= 299) {
        const json = await response.json()
        if (json) {
            return {
                data: json,
                status: response.status
            }
        } else {
            return {
                data: null,
                status: response.status
            }
        }
    } else {
        return {
            data: null,
            status: response.status,
        }
    }
}

const apiFetchPut = async (endpoint, body) => {

    const headers = new Headers();
    headers.append("Content-Type", "application/json")
    headers.append("Accept", 'application/json')

    const response = await fetch(API + endpoint, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
    })

    if ((response.status >= 200 && response.status <= 299) || response.status === 400) {
        const json = await response.json()
        if (json) {
            return {
                data: json,
                status: response.status
            }
        } else {
            return {
                data: null,
                status: response.status
            }
        }
    } else {
        return {
            data: null,
            status: response.status,
        }
    }
}

const apiFetchDelete = async (endpoint) => {

    const response = await fetch(`${API + endpoint}`, { method: 'DELETE' })
    if (response.status >= 200 && response.status <= 299) {
        return {
            status: response.status
        }
    } else {
        return {
            status: response.status,
        }
    }
}

export default {

    API: API,

    onSignIn: async (email, password) => {
        const data = { email: email, password: password }
        const request = await apiFetchPost('/signin', data)
        return request
    },

    getAllManagers: async () => {
        const response = await apiFetchGet('/managers')
        return response
    },

    getManagerById: async (id) => {
        const response = await apiFetchGet(`/managers/${id}`)
        return response
    },

    createManager: async (values) => {

        const data = {
            name: values.name,
            nickname: values.nickname,
            birthDate: values.birthDate,
            phone: values.phone,
            cpf: values.cpf,
            email: values.email,
            role: values.role,
        }

        const request = await apiFetchPost('/managers', data)
        return request
    },

    updateManager: async (id, values) => {

        const data = {
            name: values.name,
            nickname: values.nickname,
            birthDate: values.birthDate,
            phone: values.phone,
            cpf: values.cpf,
            email: values.email,
            role: values.role
        }

        const request = await apiFetchPut(`/managers/${id}`, data)
        return request
    },

    deleteManager: async (id) => {
        const request = await apiFetchDelete(`/managers/${id}`)
        return request
    },

    getAllProducers: async () => {
        const response = await apiFetchGet('/producers')
        return response
    },

    getProducerById: async (id) => {
        const response = await apiFetchGet(`/producers/${id}`)
        return response
    },

    createProducer: async (values, products, userId) => {
        const data = {
            name: values.name,
            nickname: values.nickname,
            birthDate: values.birthDate,
            rg: values.rg,
            cpf: values.cpf,
            phone: values.phone,
            email: values.email,
            address: {
                zipCode: values.address.zipCode,
                uf: values.address.uf,
                city: values.address.city,
                district: values.address.district,
                street: values.address.street,
                houseNumber: values.address.houseNumber,
                reference: values.address.reference,
            },
            farmingActivity: {
                activityName: {
                    value: values.farmingActivity.activityName.value
                },
                period: values.farmingActivity.period,
                averageCash: parseFloat(values.farmingActivity.averageCash),
                activityName2: values.farmingActivity.activityName2
            },
            products: products,
            manager: {
                id: userId,
            },
        }

        const request = await apiFetchPost('/producers', data)
        return request
    },

    updateProducer: async (id, values, products, userId) => {

        const data = {
            name: values.name,
            nickname: values.nickname,
            birthDate: values.birthDate,
            rg: values.rg,
            cpf: values.cpf,
            phone: values.phone,
            email: values.email,
            address: {
                zipCode: values.address.zipCode,
                uf: values.address.uf,
                city: values.address.city,
                district: values.address.district,
                street: values.address.street,
                houseNumber: values.address.houseNumber,
                reference: values.address.reference,
            },
            farmingActivity: {
                activityName: {
                    value: values.farmingActivity.activityName.value
                },
                period: values.farmingActivity.period,
                averageCash: parseFloat(values.farmingActivity.averageCash),
                activityName2: values.farmingActivity.activityName2
            },
            products: products,
            manager: {
                id: userId,
            },
        }

        const request = await apiFetchPut(`/producers/${id}`, data)
        return request
    },

    deleteProducer: async (id) => {
        const request = await apiFetchDelete(`/producers/${id}`)
        return request
    },

    createProduct: async (label) => {
        const data = { label }
        const request = await apiFetchPost('/products', data)
        return request
    },

    updateProduct: async (id, label) => {
        const data = { value: id, label: label }
        const request = await apiFetchPut(`/products/${id}`, data)
        return request
    },

    getAllProducts: async () => {
        const response = await apiFetchGet('/products')
        return response
    },

    getProductById: async (id) => {
        const response = await apiFetchGet(`/products/${id}`)
        return response
    },

    getProducersByProduct: async (id) => {
        const response = await apiFetchGet(`/products/${id}/producers`)
        return response
    },

    deleteProduct: async (id) => {
        const request = await apiFetchDelete(`/products/${id}`)
        return request
    },

    createActivity: async (label) => {
        const data = { label: label }
        const request = await apiFetchPost('/activities', data)
        return request
    },

    updateActivity: async (id, label) => {
        const data = { value: id, label: label }
        const request = await apiFetchPut(`/activities/${id}`, data)
        return request
    },

    getAllActivities: async () => {
        const response = await apiFetchGet('/activities')
        return response
    },

    getActivityById: async (id) => {
        const response = await apiFetchGet(`/activities/${id}`)
        return response
    },

    getProducersByActivity: async (id) => {
        const response = await apiFetchGet(`/producers/findByActivity/${id}`)
        return response
    },

    deleteActivity: async (id) => {
        const request = await apiFetchDelete(`/activities/${id}`)
        return request
    },

    createTask: async (description, date, id) => {
        const formatDate = moment(date).format('yyyy-MM-DD')
        const data = {
            description: description,
            status: false,
            date: formatDate,
            manager: {
                id: id,
            },
        }
        const request = await apiFetchPost('/tasks', data)
        return request
    },

    getAllTasks: async () => {
        const response = await apiFetchGet('/tasks')
        return response
    },

    getAllTodayTasks: async () => {
        const response = await apiFetchGet('/tasks/todaytasks')
        return response
    },

    getAllFutureTasks: async () => {
        const response = await apiFetchGet('/tasks/futuretasks')
        return response
    },

    setStateTasks: async (id, status) => {
        const data = { status: status }
        const request = await apiFetchPut(`/tasks/${id}`, data)
        return request
    },

    deleteTask: async (id) => {
        const request = await apiFetchDelete(`/tasks/${id}`)
        return request
    },

    getAllSales: async () => {
        const response = await apiFetchGet('/sales-producers')
        return response
    },

    getProducerSales: async (id) => {
        const response = await apiFetchGet(`/producers/${id}/sales`)
        return response
    },

    deleteSale: async (id) => {
        const request = await apiFetchDelete(`/sales-producers/${id}`)
        return request
    },

    createSite: async (name) => {
        const data = { name: name}
        const request = await apiFetchPost('/sites', data)
        return request
    },

    getAllSites: async () => {
        const response = await apiFetchGet('/sites')
        return response
    },

    getSiteById: async (id) => {
        const response = await apiFetchGet(`/sites/${id}`)
        return response
    },

    updateSite: async (id, name) => {
        const data = { id: id, name: name }
        const request = await apiFetchPut(`/sites/${id}`, data)
        return request
    },

    deleteSite: async (id) => {
        const request = await apiFetchDelete(`/sites/${id}`)
        return request
    },

    createRain: async (date, volume, siteId) => {
        const data = { date: date, volume: volume, site: { id: siteId } }
        const request = await apiFetchPost('/rains', data)
        return request
    },

    getAllRains: async () => {
        const response = await apiFetchGet('/rains')
        return response
    },

    getRainById: async (id) => {
        const response = await apiFetchGet(`/rains/${id}`)
        return response
    },

    loadRainsByPereiod: async (start, end) => {
        const response = await apiFetchGet(`/rains/ByPeriod/${start}/${end}`)
        return response
    },

    updateRain: async (id, date, volume) => {
        const data = { id: id, date: date, volume: volume  }
        const request = await apiFetchPut(`/rains/${id}`, data)
        return request
    },

    deleteeRain: async (id) => {
        const request = await apiFetchDelete(`/rains/${id}`)
        return request
    },

    sendEmailRecovery: async (email) => {
        try {
            const headers = new Headers()
            headers.append("Content-Type", "application/x-www-form-urlencoded")

            const formData = new URLSearchParams()
            formData.append('email', email)

            const request = await fetch(`${API}/recovery/`, {
                method: 'POST',
                headers: headers,
                body: formData.toString()
            })
            return request
        } catch (e) {
            console.log('Erro: sendEmailRecovery ' + e)
        }
        return null
    },

    validateLink: async (mail, time, token) => {
        const response = await apiFetchGet(`/recovery/${mail}/${time}/${token}`)
        return response
    },

    setNewPassword: async (email, time, token, newPassword) => {
        const data = {
            email: email,
            time: time,
            token: token,
            newPassword: newPassword
        }

        const request = await apiFetchPut('/recovery/', data)
        return request
    },

    getSalesByProducer: async (id) => {
        const response = await apiFetchGet(`/producers/${id}/sales`)
        return response
    },

    createSaleProducer: async (date, quantity, valor, parameter, city, id, product) => {

        try {
            
            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const data = {
                date: date,
                quantity: quantity,
                valor: valor,
                parameter: parameter,
                city: city,
                producer: {
                    id: id,
                },
                product: {
                    value: product,
                },
            }
            console.log(data)
            const request = await fetch(`${API}/sales-producers`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
            
            return request

        } catch (e) {
            console.log('Erro: createSaleProducer ' + e)
        }

    },
}
