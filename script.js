
const API_URL = "https://orbitsec.squareweb.app";
const WHATSAPP_NUMBER = "5511989227678";
const A3MS_WHATSAPP = WHATSAPP_NUMBER;

function waLink(number, message) {
  return `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

function setExternal(el, href) {
  if (!el) return;
  el.href = href;
  el.target = "_blank";
  el.rel = "noopener noreferrer";
}

document.querySelectorAll(".plan-link").forEach((link) => {
  setExternal(
    link,
    waLink(
      WHATSAPP_NUMBER,
      `Olá! Vi o serviço ${link.dataset.plan} no site da OrbitSec e gostaria de saber mais e solicitar um orçamento.`
    )
  );
});

const general = waLink(
  WHATSAPP_NUMBER,
  "Olá! Gostaria de conhecer os serviços da OrbitSec e receber uma orientação."
);

["general-whatsapp", "footer-whatsapp", "float-whatsapp"].forEach((id) => {
  setExternal(document.getElementById(id), general);
});

setExternal(
  document.getElementById("a3ms-whatsapp"),
  waLink(
    A3MS_WHATSAPP,
    "Olá! Vi o projeto A3MS Baterias e Relógios no site da OrbitSec e gostaria de mais informações."
  )
);

const form = document.getElementById("contact-form");
const formMsg = document.getElementById("form-msg");
const formBtn = document.getElementById("form-btn");

function showFormMsg(message, ok = false) {
  if (!formMsg) return;
  formMsg.textContent = message;
  formMsg.className = ok ? "form-msg ok" : "form-msg";
}

if (form && formMsg && formBtn) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const v = (n) => form.elements[n].value.trim();

    if (!v("nome") || !v("telefone") || !v("servico")) {
      return showFormMsg("Preencha nome, WhatsApp e serviço de interesse.");
    }

    if (!document.getElementById("f-auth").checked) {
      return showFormMsg("Confirme que você é responsável ou tem autorização sobre o ambiente.");
    }

    const payload = {
      nome: v("nome"),
      empresa: v("empresa"),
      email: v("email"),
      telefone: v("telefone"),
      site: v("site"),
      servico: v("servico"),
      mensagem: v("mensagem"),
      autorizado: true,
      _gotcha: v("_gotcha"),
    };

    formBtn.disabled = true;
    formBtn.textContent = "Enviando…";
    showFormMsg("");

    try {
      const r = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await r.json().catch(() => ({}));

      if (!r.ok) {
        throw new Error(data.error || "Não foi possível enviar agora.");
      }

      form.reset();
      showFormMsg("✓ Solicitação enviada! Em breve entraremos em contato com você.", true);
    } catch (err) {
      formMsg.className = "form-msg";
      formMsg.textContent = `${
        err.message === "Failed to fetch"
          ? "Não foi possível enviar agora."
          : err.message
      } `;

      const a = document.createElement("a");
      a.textContent = "Falar pelo WhatsApp";

      setExternal(
        a,
        waLink(
          WHATSAPP_NUMBER,
          `Olá! Tentei enviar o formulário do site. Meu nome é ${payload.nome} e tenho interesse em: ${payload.servico}.`
        )
      );

      formMsg.appendChild(a);
    } finally {
      formBtn.disabled = false;
      formBtn.textContent = "Enviar solicitação ↗";
    }
  });
}

const navlinks = document.getElementById("navlinks");

if (navlinks) {
  document.querySelectorAll("#navlinks a").forEach((a) => {
    a.addEventListener("click", () => {
      navlinks.classList.remove("open");
    });
  });
}

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}
