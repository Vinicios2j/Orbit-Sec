// ===== CONFIGURAÇÃO =====
// WhatsApp comercial da OrbitSec (DDI + DDD + número, somente dígitos)
const WHATSAPP_NUMBER = "5500000000000";
// WhatsApp da A3MS (cliente). Substitua pelo número dela, somente dígitos.
const A3MS_WHATSAPP = "5500000000000";

function waLink(number,message){return `https://wa.me/${number}${message?`?text=${encodeURIComponent(message)}`:""}`;}
function setExternal(el,href){if(!el)return;el.href=href;el.target="_blank";el.rel="noopener noreferrer";}

document.querySelectorAll(".plan-link").forEach(link=>{
  setExternal(link,waLink(WHATSAPP_NUMBER,`Olá! Tenho interesse no serviço ${link.dataset.plan}. Gostaria de solicitar um orçamento.`));
});
const general=waLink(WHATSAPP_NUMBER,"Olá! Gostaria de conhecer os serviços da OrbitSec e receber uma orientação.");
["general-whatsapp","footer-whatsapp","float-whatsapp"].forEach(id=>setExternal(document.getElementById(id),general));
setExternal(document.getElementById("a3ms-whatsapp"),waLink(A3MS_WHATSAPP,"Olá! Vi a A3MS no site da OrbitSec e gostaria de mais informações."));

// Formulário -> WhatsApp
document.getElementById("contact-form").addEventListener("submit",e=>{
  e.preventDefault();
  const f=e.target,msg=document.getElementById("form-msg");
  const v=n=>f.elements[n].value.trim();
  if(!v("nome")||!v("telefone")||!v("servico")){msg.textContent="Preencha nome, WhatsApp e serviço de interesse.";return;}
  if(!document.getElementById("f-auth").checked){msg.textContent="Confirme que você é responsável ou tem autorização sobre o ambiente.";return;}
  msg.textContent="";
  const linhas=["Olá! Vim pelo site da OrbitSec e gostaria de um orçamento.","",
    `*Nome:* ${v("nome")}`,
    v("empresa")&&`*Empresa:* ${v("empresa")}`,
    v("email")&&`*E-mail:* ${v("email")}`,
    `*WhatsApp:* ${v("telefone")}`,
    v("site")&&`*Site/sistema:* ${v("site")}`,
    `*Serviço:* ${v("servico")}`,
    v("mensagem")&&`*Mensagem:* ${v("mensagem")}`,
    "","✔ Declaro ser responsável ou autorizado pelo ambiente informado."].filter(Boolean);
  window.open(waLink(WHATSAPP_NUMBER,linhas.join("\n")),"_blank","noopener");
});

// fecha menu mobile ao clicar em link
document.querySelectorAll("#navlinks a").forEach(a=>a.addEventListener("click",()=>document.getElementById("navlinks").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
