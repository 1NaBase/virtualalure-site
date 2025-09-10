export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const data = req.body;

    // 🔑 URL do seu webhook n8n (NUNCA deixar exposto no frontend)
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return res.status(200).json({ success: true, message: "Mensagem enviada com sucesso!" });
    } else {
      return res.status(500).json({ success: false, message: "Erro ao enviar para o servidor." });
    }
  } catch (error) {
    console.error("Erro:", error);
    return res.status(500).json({ success: false, message: "Erro interno do servidor." });
  }
}
