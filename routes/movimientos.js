import Router from "router";
import { check } from "express-validator";
import validarCampos from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validarjwt.js";
import helperMovimientos from "../helpers/movimientos.js";
const router = Router();
import {
    postMovimientos,
    putMovimientos,
    getMovimientos,
    getMovimiento,
    getActivosinactivos,
    putActivarInactivar,
    getMovimientoTipo,
    getMovimientosFechas
} from "../controllers/movimientos.js";

//registrar un nuevo movimiento
router.post("/",[
    validarJWT,
    check("tipo","el tipo debe ser un numero").isString(),
    check("numeroFactura","la factura debe ser un texto").isString(),
    check("fecha","el formato de la fecha es incorrecto").isString(),
    /* check("articulos","articulos debe ser un array").isArray(),
    check("articulos.*.id","el id no es valido").isMongoId(),
    check("articulos.*.id","el id no existe").custom(helperMovimientos.validarIdArticulo),
    check("articulos.*.cantidad","cantidad debe ser un numero").isNumeric(),
    check("articulos.*.precio", "El precio no puede ir vacio").trim().notEmpty(),
    check("articulos.*.precio", "debe ser un valor numerico").isNumeric(),
    check("articulos.*.valor", "El valor no puede ir vacio").trim().notEmpty(),
    check("articulos.*.valor", "debe ser un valor numerico").isNumeric(),
    check("articulos.*.iva", "El iva no puede ir vacio").trim().notEmpty(), */
    check("total","debe ser un valor numerico").isNumeric(),
    validarCampos
], postMovimientos);

//actualizar un movimiento
router.put("/:ide",[
    validarJWT,
    check("ide","el id no es valido").isMongoId(),
    check("ide","el id no existe").custom(helperMovimientos.validarId),
    validarCampos
],putMovimientos);

//traer todos los movimientos
router.get("/",[
    validarJWT,
], getMovimientos);

//traer un movimiento por id
router.get("/movimiento/:id",[
    validarJWT,
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe").custom(helperMovimientos.validarId),
    validarCampos
], getMovimiento);

//traer todos los movimientos activos
router.get("/movimientos/:accion",[
    validarJWT
], getActivosinactivos);

//activar o inactivar un movimiento
router.put("/:accion/:id",[
    validarJWT,
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe").custom(helperMovimientos.validarId),
    validarCampos
], putActivarInactivar);



//de aqui para abajo son las peticiones especificas

//traer movimientos por tipo
router.get("/tipo/:tipo",[
    validarJWT
],getMovimientoTipo)

//traer movimientos entre fechas
router.get("/fechas/:fechaInicio/:fechaFin",[
    validarJWT,
    check("fechaInicio","la fecha no es valida debe ser algo como esto '2024-05-01'").isDate(),
    check("fechaFin","la fecha no es valida debe ser algo como esto '2024-05-01'").isDate(),
    validarCampos
],getMovimientosFechas)

export default router;
