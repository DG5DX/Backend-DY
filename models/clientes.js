import mongoose from "mongoose";

const clientesSchema = new mongoose.Schema({
	nombre: String,
	numCedula: Number,
	telefono: String,
	email: String,
	estado: { type: Number, default: 1 },
});

export default mongoose.model("Clientes", clientesSchema);
