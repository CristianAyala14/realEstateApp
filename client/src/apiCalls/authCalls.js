import { axiosCall, axiosWithAuth } from "./axiosConfig";

export async function singUpReq(user){
    try {
        const response = await axiosCall.post("/auth/singup", user)
        return {status: response.status, data: response.data.message, user: response.data.payload, accessToken: response.data.accessToken};
    } catch (error) {
        console.log(error)
        //si viene error de servidor (axios hace que salte por este catch tanto si es error de servidor como si es de no coneccion)
        //entonces hay que entender que objeto viene para desestructurarlo y enviarlo al front end prolijamente.
        //eror servidor?
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        //error no coneccion
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}

export async function singInReq(user){
    try {
        const response = await axiosCall.post("/auth/singin", user)
        return {status: response.status, data: response.data.message, user: response.data.payload, accessToken: response.data.accessToken};
    } catch (error) {
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}
export async function logOutReq(){
    try {
        const response = await axiosCall.get("/auth/logout")
        return {status: response.status, data: response.data.message, user: response.data.payload, accessToken: response.data.accessToken};
    } catch (error) {
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}

export async function refreshTokenReq(){
    try {
        const response = await axiosCall.get("/auth/refresh")
        return {status: response.status, data: response.data.message, user: response.data.payload, accessToken: response.data.accessToken};
    } catch (error) {
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}

export async function rutaProtegidaReq(){
    try {
        const response = await axiosWithAuth.get("/auth/rutaprotegida")
        return {status: response.status, data: response.data.message, user: response.data.payload, accessToken: response.data.accessToken};
    } catch (error) {
        if(error.response.data.message){
            return {status: error.response.status, data: error.response.data.message};
        }else{
            return {status: error.response.status, data: "No server response."};
        }
    }
}



// Ya tenemos preparada la llamada refreshTokenReq(), que esta configurada para hacer la solicitud con la cookie
// que alverga el refresh token para generar un nuevo acces token.
// Lo que debemos hacer ahora es generar una instancia de axios que envie en su header el accesToken, 
// para que este pueda ser testeado por los middlewares de protected routes de mi backend.
// Pero estas llamadas que poseen este header, deben estar programadas para que, si resiben un error de 
// que caduca el token, que hagan una llamada con la solicitud refreshTokenreq.

// Al incluir el access token en nuestros headers, tomamos control de cuando enviarlos y cuando no. asi no estan
// entre solicitudes. Por ej una duda que tenia antes es que por que el acces token no se podia guardar en una cookie
// como el refresh, y eso es porque se enviaria automaticamente en cada solicitud. En cambio si lo hacemos por headers,
// decidimos en que llamadas integrarlo. El refresh token si lo guardamos en una cookie, y tambien tenia la duda siguiente:
// pero esta cookie tambien viaja entre todas las solicitudes, y resolvi que cuando nosotros creamos la cookie
// con el rfresh token, añadimos el atributo path que es para que se envie desde el front end solo cuando la solicitud 
// que la alberga coincida con ese path de inicio al crearla. Entonces de esta manera
// mantenemos nuestros token seguros, y los enviamos solo cuando hay que hacerlo. 

// 1- CREAR UNA INSTANCIA DE AXIOS QUE ALBERGUE EL ACCES TOKEN DEL STATE EN SU HEADER. 
// 2- PROGAMARLO PARA QUE SI RECIBE UN ERROR DE QUE CADUCO, SE HAGA LA LLAMADA A REFRESHTOKENREQ.
// 3- BACKEND: HACER UN MIDDLEWARE QUE VERIFIQUE EL ACCES TOKEN EN LAS RUTAS PROTEGIDAS.

