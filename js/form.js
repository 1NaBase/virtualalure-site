
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const messageEl = document.getElementById("form-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // não deixa o form recarregar a página

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        messageEl.textContent = "✅ Mensagem enviada com sucesso!";
        messageEl.classList.remove("hidden", "text-red-400");
        messageEl.classList.add("text-green-400");
        form.reset();
      } else {
        messageEl.textContent = "❌ Erro ao enviar. Tente novamente.";
        messageEl.classList.remove("hidden", "text-green-400");
        messageEl.classList.add("text-red-400");
      }
    } catch (err) {
      console.error(err);
      messageEl.textContent = "⚠️ Erro de conexão com o servidor.";
      messageEl.classList.remove("hidden", "text-green-400");
      messageEl.classList.add("text-red-400");
    }
  });
});

