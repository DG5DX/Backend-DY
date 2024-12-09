import validarCampos from "../middlewares/validarCampos.js";
// import helperArticulos from "../helpers/articulos.js";
import http from "../controllers/clientes.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validarjwt.js";

const router = Router();

router.get("/", validarJWT, http.getClientes);

router.post(
	"/",
	[
		check("nombre", "El nombre no puede estar vacio").trim().notEmpty(),
		check("numCedula", "El numero de cedula no puede estar vacio")
			.trim()
			.notEmpty(),
		check("numCedula", "El numero de cedula debe ser numerico").isNumeric(),
		check("telefono", "El telefono no puede estar vacio").trim().notEmpty(),
		check("email", "El correo no puede estar vacio").trim().notEmpty(),
		check("email", "El correo debe ser un correo valido").isEmail(),
		validarCampos,
		validarJWT,
	],
	http.postClientes
);

router.put(
	"/:id",
	[
		check("id", "El id debe ser un mongoID valido").isMongoId(),
		check("nombre", "El nombre no puede estar vacio").trim().notEmpty(),
		check("numCedula", "El numero de cedula no puede estar vacio")
			.trim()
			.notEmpty(),
		check("numCedula", "El numero de cedula debe ser numerico").isNumeric(),
		check("telefono", "El telefono no puede estar vacio").trim().notEmpty(),
		check("email", "El correo no puede estar vacio").trim().notEmpty(),
		check("email", "El correo debe ser un correo valido").isEmail(),
		validarCampos,
		validarJWT,
	],
	http.putClientes
);
router.put(
	"/activar/:id",
	[
		check("id", "El id debe ser un mongoId valido").isMongoId,
		validarCampos,
		validarJWT,
	],
	http.putClientesActivar
);
router.put(
	"/inactivar/:id",
	[
		check("id", "El id debe ser un mongoId valido").isMongoId,
		validarCampos,
		validarJWT,
	],
	http.putClientesInactivar
);

export default router;
