
  const form = document.getElementById('contact-form');
  const messageEl = document.getElementById('form-message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // URL do webhook do n8n (substitua pela sua real)
    const webhookUrl = "https://n8n.oficialvirtuallure.xyz/webhook-test/formulario";

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        messageEl.textContent = "✅ Mensagem enviada com sucesso!";
        messageEl.classList.remove("hidden", "text-red-400");
        messageEl.classList.add("text-green-400");
        form.reset();
      } else {
        messageEl.textContent = "❌ Erro ao enviar. Tente novamente.";
        messageEl.classList.remove("hidden", "text-green-400");
        messageEl.classList.add("text-red-400");
      }
    } catch (error) {
      console.error("Erro:", error);
      messageEl.textContent = "⚠️ Erro de conexão com o servidor.";
      messageEl.classList.remove("hidden", "text-green-400");
      messageEl.classList.add("text-red-400");
    }
  });

