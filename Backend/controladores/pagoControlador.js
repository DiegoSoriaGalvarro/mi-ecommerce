import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

// Configurar Mercado Pago
const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export const crearPreferencia = async (req, res) => {
  try {
    const { carrito, total } = req.body;

    const items = carrito.map((producto) => ({
      title: producto.nombre,
      unit_price: producto.precio,
      quantity: producto.cantidad,
      currency_id: "ARS",
    }));

    const preference = new Preference(mercadopago);

    const response = await preference.create({
      body: {
        items,
        back_urls: {
          success: "http://localhost:3001/success",
          failure: "http://localhost:3001/failure",
          pending: "http://localhost:3001/pending",
        },
        auto_return: "approved",
      },
    });

    console.log("Respuesta de Mercado Pago:", response);

    if (!response.init_point) {
      throw new Error("Mercado Pago no devolvió una URL de pago");
    }

    res.json({ url: response.init_point });
  } catch (error) {
    console.error("Error al generar preferencia:", error);
    res.status(500).json({ error: "Error al crear preferencia de pago" });
  }
};
