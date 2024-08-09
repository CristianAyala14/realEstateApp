//redux 1: CREAR EL STORE. 
import {combineReducers, configureStore} from "@reduxjs/toolkit"
import userReducer from "./user/userSlice"
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage"

const rootReducer = combineReducers({user: userReducer})//conbinas los reducers para su persistencia
const persistConfig={key: "root", storage, version: 1} //creas la configuracion de persistencia
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck: false,
    })
  
})

export const persistor = persistStore(store)

/*
¡¡¡¡ R E D U X !!!! 
Biblioteca para manejo global de estado en una aplicacion. 
Si en una aplicacion estoy manejando los mismos datos entre varios componentes, es decir que varios componentes tengan que acceder al mismo estado
la mejor manera para desarrollar nuestra app, es haciendo que esos datos o mas bien el estado, este centralizado. Ya que si pasamos los datos por los componentes
de manera descentralizada puede ser complicado de mantener, ser escalable y hacer testing. Si todos los componentes manejan un estado centralizado, pueden acceder siempre al mismo lugar para
llegara el.

REDUX se compone de : STORE / ACTIONS / REDUCER
-Store: objeto js que almacena el estado. Es como "una base de datos" local en nuestra aplicacion.
-Action: Es un objeto js con informacion, es la instruccion que le damos a redux para operar sobre el store. Cuando suceda algun evento en nuestra app el action opera sobre el store.
  Esta compuesto por atributo type: accion a ejecutar, y payload: dato que le damos al store para que actualice el estado. pero no lo hace por si solo, solo es una instruccion,
  solo son ordenes para el store, pero para ejecutar estas ordenes usamos la funcion de redux "despatch".
-REDUCER: Funcion que espera dos parametros, estado actual del store, y el action que trae la instruccion y el payload para actualizar. 
  El reducer se ejecutara y actualizara el estado de la aplicacion devolviendo un nuevo objeto que es el estado actual de la aplicacion.

Redux permiete tener un historial de tus acctions y actualizaciones de estado en tu aplicacion para hacer debbugin. La mejor manera de utilizar redux es mediante la biblioteca REDUX-toolkit
facilita su instalacion, implementacion  y uso.. 


Luego para guardar los datos de nuestra store modificada hay que hacerlo mediante REDUX PERSIST. ya que al refrescar la pag, todo lo que se guarda en la store se resetea
*/