import Clientes from "../models/clientes.js";

const httpClientes = {
	getClientes: async (req, res) => {
		try {
			const clientes = await Clientes.find();
			res.json({ clientes });
		} catch (error) {
			res.json({ error });
		}
	},
	postClientes: async (req, res) => {
		try {
			const { ...datos } = req.body;
			const clientes = await Clientes.create(datos);
			res.json({ clientes });
		} catch (error) {
			res.json({ error });
		}
	},
	putClientes: async (req, res) => {
		try {
			const { id } = req.params;
			const { ...datos } = req.body;
			const clientes = await Clientes.findByIdAndUpdate(id, datos, {
				new: true,
			});
			res.json({ clientes });
		} catch (error) {
			res.json({ error });
		}
	},
	putClientesActivar: async (req, res) => {
		try {
			const { id } = req.params;
			const clientes = await Clientes.findByIdAndUpdate(
				id,
				{ estado: 1 },
				{ new: true }
			);
			res.json({ clientes });
		} catch (error) {
			res.json({ error });
		}
	},
	putClientesInactivar: async (req, res) => {
		try {
			const { id } = req.params;
			const clientes = await Clientes.findByIdAndUpdate(
				id,
				{ estado: 0 },
				{ new: true }
			);
			res.json({ clientes });
		} catch (error) {
			res.json({ error });
		}
	},
};

export default httpClientes;