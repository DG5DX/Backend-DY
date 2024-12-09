import mongoose from "mongoose";
const movimientosSchema = new mongoose.Schema(
	{
		tipo: {
			type: String,
			enum: ["entrada", "salida", "devolucion entrada", "devolucion salida"],
			required: true,
		},
		numeroFactura: { type: String, required: true },
		fecha: { type: Date, required: true },
		comprador: { type: mongoose.Schema.Types.ObjectId, ref: "Clientes" },
		articulos: [
			{
				id: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: "articulos",
				},
				cantidad: { type: Number, required: true },
				precio: { type: Number, required: true },
				valor: Number,
				iva: Number,
				total: Number,
			},
		],
		total: { type: Number, required: true },
		estado: { type: Number, required: true, default: 1 }, // 1:activo 0:inactivo
	},
	{
		timestamps: true,
	}
);

const movimientosModel = mongoose.model("movimientos", movimientosSchema);
export default movimientosModel;
