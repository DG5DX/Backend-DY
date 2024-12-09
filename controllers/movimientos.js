import movimientosModel from "../models/movimientos.js";

// En el post solo se ingresara informacion inicia, no se ingresaran datos en el articulo
const postMovimientos = async (req, res) => {
	try {
		const { ...datos } = req.body;
		const movimientos = await movimientosModel.create(datos);
		res.json({ movimientos });
	} catch (error) {
		res
			.status(400)
			.json({ error: "hubo un error al registrar un nuevo movimiento" });
		console.log(error);
	}
};

// Al crear el articulo se editara agregandole los datos
const putMovimientos = async (req, res) => {
	try {
		const { ide } = req.params;
		const { ...datos } = req.body;
		const movimientos = await movimientosModel.findByIdAndUpdate(ide, datos, {
			new: true,
		});
		res.json({ movimientos });
	} catch (error) {
		res.status(400).json({
			error: "parece que hubo un error en la actualizacion del movimiento",
		});
		console.log(error);
	}
};

const getMovimientos = async (req, res) => {
	try {
		const movimientos = await movimientosModel
			.find()
			.populate("comprador", "nombre")
			.populate("articulos.id", "nombre");
		res.json({ movimientos });
	} catch (error) {
		res.status(400).json({
			error: "parece que hubo un error  al traer todos los movimiento",
		});
		console.log(error);
	}
};

const getMovimiento = async (req, res) => {
	try {
		const { id } = req.params;
		const movimientos = await movimientosModel.findById(id);
		res.json({ movimientos });
	} catch (error) {
		res
			.status(400)
			.json({ error: "parece que hubo un error al buscar el movimiento" });
	}
};

const getActivosinactivos = async (req, res) => {
	try {
		const { accion } = req.params;
		if (accion == "activos") {
			const activos = await movimientosModel.find({ estado: 1 });
			res.json({ activos });
		} else if (accion == "inactivos") {
			const inactivos = await movimientosModel.find({ estado: 0 });
			res.json({ inactivos });
		}
	} catch (error) {}
};

const putActivarInactivar = async (req, res) => {
	try {
		const { accion } = req.params;
		const { id } = req.params;
		if (accion == "activar") {
			const movimientos = await movimientosModel.findByIdAndUpdate(
				id,
				{ estado: 1 },
				{ new: true }
			);
			res.json({ movimientos });
		} else if (accion == "inactivar") {
			const movimientos = await movimientosModel.findByIdAndUpdate(
				id,
				{ estado: 0 },
				{ new: true }
			);
			res.json({ movimientos });
		}
	} catch (error) {
		res
			.status(400)
			.json({ error: "parece que hubo un error al hacer la operacion" });
		console.log(error);
	}
};

const getMovimientoTipo = async (req, res) => {
	try {
		const { tipo } = req.params;
		if (tipo == "entradas" || tipo == 1) {
			const entradas = await movimientosModel.find({ tipo: 1 });
			res.json({ entradas });
		} else if (tipo == "salidas" || tipo == 2) {
			const salidas = await movimientosModel.find({ tipo: 2 });
			res.json({ salidas });
		} else if (tipo == "devolucion Entrada" || tipo == 3) {
			const devolucionesEntrada = await movimientosModel.find({ tipo: 3 });
			res.json({ devolucionesEntrada });
		} else if (tipo == "devolucion salida" || tipo == 4) {
			const devolucionesSalida = await movimientosModel.find({ tipo: 4 });
			res.json({ devolucionesSalida });
		}
	} catch (error) {
		res.status(400).json({ error: "hubo un error al realizar la operacion" });
		console.log(error);
	}
};

const getMovimientosFechas = async (req, res) => {
	try {
		const { fechaInicio, fechaFin } = req.params;
		const movimientos = await movimientosModel.find({
			fecha: {
				$gte: new Date(fechaInicio),
				$lte: new Date(fechaFin),
			},
		});
		res.json({ movimientos });
	} catch (error) {
		res.status(400).json({ error: "error al realizar la operacion" });
		console.log(error);
	}
};

export {
	postMovimientos,
	putMovimientos,
	getMovimientos,
	getMovimiento,
	getActivosinactivos,
	putActivarInactivar,
	getMovimientoTipo,
	getMovimientosFechas,
};
