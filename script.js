/************************************************************
 * 1. Mapa de caracteres y configuraciones
 ************************************************************/
const charMap = {
  // Mapeo de caracteres para "traducirNormal"
  '\u0262': 'G','\u026A': 'I','\u0274': 'N','\u0280': 'R','\u028F': 'Y',
  '\u0299': 'B','\u029C': 'H','\u029F': 'L','\u0391': 'A','\u0392': 'B',
  '\u0395': 'E','\u0396': 'Z','\u0397': 'H','\u0399': 'I','\u039A': 'K',
  '\u039C': 'M','\u039D': 'N','\u039F': 'O','\u03A1': 'P','\u03A4': 'T',
  '\u03A5': 'Y','\u03A7': 'X','\u03B1': 'a','\u03B2': 'b','\u03B5': 'e',
  '\u03B7': 'n','\u03B9': 'i','\u03BA': 'k','\u03BF': 'o','\u03C1': 'p',
  '\u03C3': 'o','\u03C4': 't','\u03C5': 'y','\u03C7': 'x','\u03C9': 'w',
  '\u03D5': 'p','\u0404': 'E','\u0406': 'I','\u0410': 'A','\u0412': 'B',
  '\u0415': 'E','\u041A': 'K','\u041C': 'M','\u041D': 'H','\u041E': 'O',
  '\u0420': 'P','\u0421': 'C','\u0422': 'T','\u0423': 'Y','\u0425': 'X',
  '\u0430': 'a','\u0432': 'b','\u0435': 'e','\u043A': 'k','\u043C': 'm',
  '\u043D': 'n','\u043E': 'o','\u0440': 'p','\u0441': 'c','\u0442': 't',
  '\u0443': 'y','\u0445': 'x','\u0454': 'e','\u0456': 'i','\u1D00': 'A',
  '\u1D04': 'C','\u1D05': 'D','\u1D07': 'E','\u1D0A': 'J','\u1D0B': 'K',
  '\u1D0C': 'L','\u1D0D': 'M','\u1D0E': 'N','\u1D0F': 'O','\u1D10': 'O',
  '\u1D15': 'OU','\u1D18': 'P','\u1D19': 'R','\u1D1A': 'R','\u1D1B': 'T',
  '\u1D1C': 'U','\u1D20': 'V','\u1D21': 'W','\u1D22': 'Z','\uA730': 'F',
  '\uA731': 'S','\uA7AF': 'Q',

  // Añadidos “especiales”
  'a': 'ά','b': 'в','c': 'ς','d': 'ȡ','e': 'έ','f': 'ғ',
  'g': 'ģ','h': 'ħ','i': 'เ','j': 'ј','k': 'ƙ','l': 'Ļ',
  'm': 'м','n': 'ή','ñ': 'ñ','o': 'ό','p': 'ρ','q': 'q',
  'r': 'ŕ','s': 'ş','t': 'ţ','u': 'ù','v': 'ν','w': 'ώ',
  'x': 'χ','y': 'ч','z': 'ž'
};

const modosBase = [
  { id: "normal",   name: "Modo Normal",   custom: false },
  { id: "elite",    name: "Modo Elite",    custom: false },
  { id: "glitch",   name: "Modo Glitch",   custom: false },
  { id: "greek",    name: "Modo Griego",   custom: false },
  { id: "cyrillic", name: "Modo Cirílico", custom: false },
  { id: "anime",    name: "Modo Anime",    custom: false }
];

/************************************************************
 * 2. DOM y Variables
 ************************************************************/
// Saber si estamos en admin.html o index.html
let isAdminPage = false;
if (document.body && document.body.id === "adminPage") {
  isAdminPage = true;
}

// index.html elements
let inputTextEl       = document.getElementById("inputText");
let outputTextEl      = document.getElementById("outputText");
let translateBtn      = document.getElementById("translateBtn");
let copyResultBtn     = document.getElementById("copyResultBtn");
let clearHistoryBtn   = document.getElementById("clearHistoryBtn");
let historyListEl     = document.getElementById("history-list");
let modeSelect        = document.getElementById("modeSelect");
let btnConfig         = document.getElementById("btn-config");
let configPanel       = document.getElementById("config-panel");
let btnCerrarConfig   = document.getElementById("btn-cerrar-config");
let selectTema        = document.getElementById("select-tema");
let chkHistorial      = document.getElementById("chk-historial");
let btnBorrarHist     = document.getElementById("btn-borrar-hist");
let selectLanguage    = document.getElementById("select-language");
let universalMessagesDiv = document.getElementById("universal-messages");
// Feedback form
let feedbackForm      = document.getElementById("feedbackForm");
let feedbackNameEl    = document.getElementById("feedbackName");
let feedbackMsgEl     = document.getElementById("feedbackMsg");

// admin.html elements
let loginSection       = document.getElementById("loginSection");
let adminPanel         = document.getElementById("adminPanel");
let adminLoginBtn      = document.getElementById("adminLoginBtn");
let adminUserInput     = document.getElementById("adminUser");
let adminPassInput     = document.getElementById("adminPass");
let adminLoginError    = document.getElementById("adminLoginError");
let adminIP            = document.getElementById("adminIP");
let adminCountry       = document.getElementById("adminCountry");
let adminVisits        = document.getElementById("adminVisits");
let adminLogs          = document.getElementById("adminLogs");
let adminMsgInput      = document.getElementById("adminMsgInput");
let adminUpdateMsgBtn  = document.getElementById("adminUpdateMsgBtn");
let variantListEl      = document.getElementById("variantList");
let adminAddVariantBtn = document.getElementById("adminAddVariantBtn");
let adminTranslationsEl= document.getElementById("adminTranslations");
let logoutBtn          = document.getElementById("logoutBtn");
let clearAllHistoryBtn = document.getElementById("clearAllHistoryBtn");
let ipInput            = document.getElementById("ipInput");
let banIpBtn           = document.getElementById("banIpBtn");
let unbanIpBtn         = document.getElementById("unbanIpBtn");
let bannedIpList       = document.getElementById("bannedIpList");
let wordInput          = document.getElementById("wordInput");
let blockWordBtn       = document.getElementById("blockWordBtn");
let unblockWordBtn     = document.getElementById("unblockWordBtn");
let blockedWordsList   = document.getElementById("blockedWordsList");
let adminFeedbackList  = document.getElementById("adminFeedbackList");
let usageChartCanvas   = document.getElementById("usageChart");

// Variables “globales”
let config = { tema: 'auto', guardarHistorial: true, idioma: 'es' };
let historialArray = [];
let blockedIPs     = [];
let blockedWords   = [];
let ipLogs         = [];
let feedbacks      = [];

/************************************************************
 * 3. COOKIES
 ************************************************************/
function getCookie(name){
  let parts = document.cookie.split(';');
  for(let i=0; i<parts.length; i++){
    let part = parts[i].trim();
    if(part.indexOf(name+"=")===0){
      return decodeURIComponent(part.substring(name.length+1));
    }
  }
  return "";
}
function setCookie(name, value, days=365){
  let d = new Date();
  d.setTime(d.getTime() + days*24*60*60*1000);
  let expires = "expires="+ d.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + "; " + expires + "; path=/";
}
function deleteCookie(name){
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

/************************************************************
 * 4. TRADUCCIONES
 ************************************************************/
// “traducirNormal” usa charMap
function traducirNormal(txt){
  let out = txt.normalize('NFKC');
  let result = "";
  for(let i=0; i<out.length; i++){
    let ch = out[i];
    let lower = ch.toLowerCase();
    if(charMap[lower]){
      // Mantener mayúscula si la original es mayúscula
      if(ch === ch.toUpperCase()){
        result += charMap[lower].toUpperCase();
      } else {
        result += charMap[lower];
      }
    } else {
      result += ch;
    }
  }
  // Quitar diacríticos residuales
  result = result.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[\u200B-\u200D\uFEFF]/g,'');
  return result;
}

// Modo Elite (caracteres alternos)
const eliteMap = {
  a:'4', e:'3', i:'1', o:'0', u:'µ',
  b:'8', c:'(', d:'[)', g:'6', l:'|_', 
  s:'5', t:'7'
};
function traducirElite(txt){
  let r = "";
  for(let i=0; i<txt.length; i++){
    let ch = txt[i];
    let lower = ch.toLowerCase();
    r += (eliteMap[lower] || ch);
  }
  return r;
}

// Modo glitch
const glitchUp   = ["\u030d","\u030e","\u0304","\u0305","\u033f","\u0311","\u0306","\u0310"];
const glitchDown = ["\u0316","\u0317","\u0318","\u0319","\u031c"];
function traducirGlitch(txt){
  let r="";
  for(let i=0; i<txt.length; i++){
    let ch = txt[i];
    if(ch===" "||ch==="\n"){
      r+=ch;
      continue;
    }
    r+= ch;
    let upCount   = Math.floor(Math.random()*2)+1;
    let downCount = Math.floor(Math.random()*2);
    for(let u=0; u<upCount; u++){
      r += glitchUp[Math.floor(Math.random()*glitchUp.length)];
    }
    for(let d=0; d<downCount; d++){
      r += glitchDown[Math.floor(Math.random()*glitchDown.length)];
    }
  }
  return r;
}

// Modo Greek / Modo Cyrillic -> Por ahora reutilizamos “traducirNormal”
function traducirGreek(txt){ return traducirNormal(txt); }
function traducirCyrillic(txt){ return traducirNormal(txt); }

// Modo Anime
function traducirAnime(txt){
  let base = traducirNormal(txt);
  // Reemplazos:
  base = base.replace(/\bamigo\b/gi, "nakama");
  base = base.replace(/\bcasa\b/gi, "dojo");
  base = base.replace(/\bguerra\b/gi, "sensei battle");
  // Insert emoticones
  const emoticons = ["(>w<)", "(UwU)", "(^_^)", "(n_n)", "(T_T)"];
  let final = "";
  let words = base.split(/\s+/);
  let count = 0;
  for(let i=0; i<words.length; i++){
    final += words[i] + " ";
    count++;
    if(count >= 5 + Math.floor(Math.random()*3)){
      final += emoticons[Math.floor(Math.random()*emoticons.length)] + " ";
      count = 0;
    }
  }
  // sufijo -chan
  final = final.replace(/\b(\w{4,10})\b/g, function(match){
    if(Math.random()<0.2){
      return match + "-chan";
    }
    return match;
  });
  return final.trim();
}

function applyTranslation(txt, mode){
  switch(mode){
    case "elite":    return traducirElite(txt);
    case "glitch":   return traducirGlitch(txt);
    case "greek":    return traducirGreek(txt);
    case "cyrillic": return traducirCyrillic(txt);
    case "anime":    return traducirAnime(txt);
    default:         return traducirNormal(txt);
  }
}

/************************************************************
 * 5. INDEX: traducir, historial, feedback
 ************************************************************/
/** Revisa si el texto contiene alguna “palabra bloqueada”. */
function findBlockedWord(text){
  let lowerText= text.toLowerCase();
  for(let i=0; i<blockedWords.length; i++){
    let w= blockedWords[i];
    if(w && lowerText.indexOf(w)!==-1){
      return w;
    }
  }
  return null;
}

/** Lógica principal al pulsar “Traducir”. */
function doTranslate(){
  let text= "";
  if(inputTextEl && inputTextEl.value){
    text= inputTextEl.value.trim();
  }
  if(!text) return; // nada que traducir

  let found= findBlockedWord(text);
  if(found){
    alert("Este texto contiene una palabra bloqueada: " + found);
    return;
  }
  let mode="normal";
  if(modeSelect && modeSelect.value){
    mode= modeSelect.value;
  }
  let output= applyTranslation(text, mode);
  if(outputTextEl){
    outputTextEl.value= output;
  }

  // Historial
  let entry= { original:text, translated:output };
  historialArray.unshift(entry);
  if(historialArray.length>50){
    historialArray.pop();
  }
  if(config.guardarHistorial){
    setCookie("history", JSON.stringify(historialArray));
  }
  renderHistory();
}

function renderHistory(){
  if(!historyListEl) return;
  historyListEl.innerHTML="";

  if(historialArray.length===0){
    let p= document.createElement("p");
    p.id="history-empty";
    p.textContent= (config.idioma==="en")
      ? "No translation history."
      : "No hay traducciones en el historial.";
    historyListEl.appendChild(p);
    return;
  }

  for(let i=0; i<historialArray.length; i++){
    let item= historialArray[i];
    let div= document.createElement("div");
    div.className="history-entry";

    // Original
    let orig= document.createElement("div");
    orig.className="history-original";
    orig.textContent= item.original;
    let copyO= document.createElement("button");
    copyO.className="icon-btn copy-btn";
    copyO.textContent="📋";
    copyO.addEventListener("click", function(){
      copyToClipboard(item.original);
    });
    orig.appendChild(copyO);

    // Traducido
    let trans= document.createElement("div");
    trans.className="history-translated";
    trans.textContent= item.translated;
    let copyT= document.createElement("button");
    copyT.className="icon-btn copy-btn";
    copyT.textContent="📋";
    copyT.addEventListener("click", function(){
      copyToClipboard(item.translated);
    });
    trans.appendChild(copyT);

    div.appendChild(orig);
    div.appendChild(trans);

    // Insertar al inicio
    historyListEl.prepend(div);
  }
}

/** Comprueba si la IP del usuario está baneada (guardada en cookie). */
function checkIPBlocked(){
  let userIP= getCookie("userIP");
  let banC= getCookie("bannedIPs");
  if(!userIP || !banC) return false;
  try{
    let arr= JSON.parse(banC);
    return (arr.indexOf(userIP)!==-1);
  } catch(e){
    return false;
  }
}

/** Guarda feedback en cookie. */
function saveFeedback(name, msg){
  let fbC= getCookie("feedbacks");
  if(fbC){
    try{ feedbacks=JSON.parse(fbC); }catch(e){}
  }
  let item= {
    name: (name || "Anónimo"),
    msg,
    time: new Date().toLocaleString()
  };
  feedbacks.push(item);
  setCookie("feedbacks", JSON.stringify(feedbacks));
}

/************************************************************
 * 6. INDEX: initIndex
 ************************************************************/
function initIndex(){
  // Leer cookies de configuración
  let langC= getCookie("lang");
  if(langC==="en" || langC==="es"){
    config.idioma= langC;
  }
  let temaC= getCookie("tema");
  if(temaC==="auto"||temaC==="claro"||temaC==="oscuro"){
    config.tema= temaC;
  }
  let histOpt= getCookie("guardarHistorial");
  if(histOpt){
    config.guardarHistorial= (histOpt==="1");
  }

  // Historial
  let histData= getCookie("history");
  if(histData){
    try{ historialArray= JSON.parse(histData); }catch(e){}
  }
  // IPs y palabras
  let bannedC= getCookie("bannedIPs");
  if(bannedC){
    try{ blockedIPs= JSON.parse(bannedC);}catch(e){}
  }
  let wordsC= getCookie("blockedWords");
  if(wordsC){
    try{ blockedWords= JSON.parse(wordsC);}catch(e){}
  }
  // Feedback
  let fbC= getCookie("feedbacks");
  if(fbC){
    try{ feedbacks= JSON.parse(fbC);}catch(e){}
  }

  // Aplicar idioma y tema
  applyTranslations(config.idioma);
  applyTheme(config.tema);
  renderHistory();

  // Generar IP
  let userIP= getCookie("userIP");
  let userCountry= getCookie("userCountry");
  let ipLogsC= getCookie("ipLogs");
  if(ipLogsC){
    try{ ipLogs= JSON.parse(ipLogsC);}catch(e){}
  }
  if(!userIP){
    // Generar ip random
    let parts=[];
    for(let i=0;i<4;i++){
      parts.push(Math.floor(Math.random()*256));
    }
    userIP= parts.join(".");
    setCookie("userIP", userIP);
    // País random
    let countries=["México","España","Argentina","Colombia","Chile","EEUU","Japón","Francia","Alemania","Corea"];
    userCountry= countries[Math.floor(Math.random()*countries.length)];
    setCookie("userCountry", userCountry);
  }
  // Log IP
  ipLogs.push({ ip:userIP, time:new Date().toLocaleString() });
  if(ipLogs.length>50){
    ipLogs.shift();
  }
  setCookie("ipLogs", JSON.stringify(ipLogs));

  // Contador de visitas
  let visitsCount= parseInt(getCookie("visitsCount")||"0");
  visitsCount++;
  setCookie("visitsCount", visitsCount);

  // Si la IP está bloqueada
  if(checkIPBlocked()){
    let translatorSec= document.getElementById("mainTranslatorSection");
    if(translatorSec){
      translatorSec.innerHTML=`
        <h2 style='color:#ff6b6b; text-align:center;'>ACCESO DENEGADO</h2>
        <p class='error-msg' style='text-align:center;'>
          Tu IP está bloqueada. No puedes usar el traductor.
        </p>`;
    }
    return;
  }

  // Rellenar modos
  fillModeSelect();

  // Mensaje global
  let gMsg= getCookie("globalMessage");
  if(gMsg && gMsg.trim()!==""){
    if(universalMessagesDiv){
      universalMessagesDiv.textContent= gMsg;
      universalMessagesDiv.style.display="block";
    }
  } else if(universalMessagesDiv){
    universalMessagesDiv.style.display="none";
  }

  // Listeners
  if(translateBtn){
    translateBtn.addEventListener("click", doTranslate);
  }
  if(copyResultBtn){
    copyResultBtn.addEventListener("click", function(){
      if(outputTextEl && outputTextEl.value){
        copyToClipboard(outputTextEl.value);
      }
    });
  }
  if(clearHistoryBtn){
    clearHistoryBtn.addEventListener("click", function(){
      historialArray=[];
      deleteCookie("history");
      renderHistory();
      alert((config.idioma==="en")?"History cleared.":"Historial borrado.");
    });
  }
  if(modeSelect){
    modeSelect.addEventListener("change", doTranslate);
  }

  // Config panel
  if(btnConfig){
    btnConfig.addEventListener("click", function(){
      if(configPanel){
        configPanel.classList.remove("hidden");
      }
      if(selectTema){
        selectTema.value= config.tema;
      }
      if(chkHistorial){
        chkHistorial.checked= config.guardarHistorial;
      }
      if(selectLanguage){
        selectLanguage.value= config.idioma;
      }
    });
  }
  if(btnCerrarConfig){
    btnCerrarConfig.addEventListener("click", function(){
      if(configPanel){
        configPanel.classList.add("hidden");
      }
    });
  }
  if(selectTema){
    selectTema.addEventListener("change", function(){
      config.tema= selectTema.value;
      setCookie("tema", config.tema);
      applyTheme(config.tema);
    });
  }
  if(chkHistorial){
    chkHistorial.addEventListener("change", function(){
      config.guardarHistorial= chkHistorial.checked;
      setCookie("guardarHistorial", config.guardarHistorial?"1":"0");
    });
  }
  if(selectLanguage){
    selectLanguage.addEventListener("change", function(){
      config.idioma= selectLanguage.value;
      setCookie("lang", config.idioma);
      applyTranslations(config.idioma);
    });
  }
  if(btnBorrarHist){
    btnBorrarHist.addEventListener("click", function(){
      deleteCookie("history");
      historialArray=[];
      renderHistory();
      alert((config.idioma==="en")
        ?"History and cookies cleared."
        :"Historial y cookies borrados.");
    });
  }

  // Feedback
  if(feedbackForm){
    feedbackForm.addEventListener("submit", function(ev){
      ev.preventDefault();
      let nameVal="";
      let msgVal="";
      if(feedbackNameEl && feedbackNameEl.value){
        nameVal= feedbackNameEl.value.trim();
      }
      if(feedbackMsgEl && feedbackMsgEl.value){
        msgVal= feedbackMsgEl.value.trim();
      }
      if(!msgVal){
        alert("Debes escribir un mensaje antes de enviar.");
        return;
      }
      saveFeedback(nameVal, msgVal);
      alert("¡Gracias por tu feedback!");
      if(feedbackNameEl){ feedbackNameEl.value=""; }
      if(feedbackMsgEl){ feedbackMsgEl.value=""; }
    });
  }
}

/** Rellena el select de modos con los “base” y los “custom” guardados en cookies. */
function fillModeSelect(){
  if(!modeSelect) return;
  modeSelect.innerHTML="";

  // Modo base
  for(let i=0; i<modosBase.length; i++){
    let m= modosBase[i];
    let opt= document.createElement("option");
    opt.value= m.id;
    opt.textContent= m.name;
    modeSelect.appendChild(opt);
  }
  // Modos custom
  let activeModes= getCookie("activeModes");
  if(activeModes){
    try{
      let customArr= JSON.parse(activeModes);
      for(let j=0; j<customArr.length; j++){
        let cm= customArr[j];
        let opt= document.createElement("option");
        opt.value= cm.id;
        opt.textContent= cm.name;
        modeSelect.appendChild(opt);
      }
    }catch(e){}
  }
}

/************************************************************
 * 7. ADMIN: initAdmin
 ************************************************************/
function initAdmin(){
  applyTheme(getCookie("tema")||"auto");
  let adminSession= getCookie("adminSession");
  if(adminSession==="1"){
    if(loginSection){
      loginSection.classList.add("hidden");
    }
    if(adminPanel){
      adminPanel.classList.remove("d-none");
    }
    loadAdminData();
  } else {
    if(loginSection){
      loginSection.classList.remove("hidden");
    }
    if(adminPanel){
      adminPanel.classList.add("d-none");
    }
  }
  if(adminLoginBtn){
    adminLoginBtn.addEventListener("click", function(){
      let user="";
      let pass="";
      if(adminUserInput && adminUserInput.value){
        user= adminUserInput.value.trim();
      }
      if(adminPassInput && adminPassInput.value){
        pass= adminPassInput.value.trim();
      }
      // Hardcodeado: user=admin, pass=devsecret123
      if(user==="admin" && pass==="devsecret123"){
        setCookie("adminSession","1");
        if(adminLoginError){
          adminLoginError.style.display="none";
        }
        if(loginSection){
          loginSection.classList.add("hidden");
        }
        if(adminPanel){
          adminPanel.classList.remove("d-none");
        }
        loadAdminData();
      } else {
        if(adminLoginError){
          adminLoginError.style.display="block";
        }
      }
    });
  }
}

/** Carga datos (IPs, feedback, etc.) al panel admin. */
function loadAdminData(){
  if(adminIP){
    adminIP.textContent= getCookie("userIP")||"--";
  }
  if(adminCountry){
    adminCountry.textContent= getCookie("userCountry")||"--";
  }
  if(adminVisits){
    adminVisits.textContent= getCookie("visitsCount")||"0";
  }
  let logsC= getCookie("ipLogs");
  if(logsC){
    try{ ipLogs= JSON.parse(logsC);}catch(e){}
  }
  renderIPLogs();

  if(adminMsgInput){
    adminMsgInput.value= getCookie("globalMessage")||"";
  }

  let bannedC= getCookie("bannedIPs");
  if(bannedC){
    try{ blockedIPs= JSON.parse(bannedC);}catch(e){}
  }
  renderBannedIPs();

  let wordsC= getCookie("blockedWords");
  if(wordsC){
    try{ blockedWords= JSON.parse(wordsC);}catch(e){}
  }
  renderBlockedWords();

  let histC= getCookie("history");
  if(histC){
    try{ historialArray= JSON.parse(histC);}catch(e){}
  }
  renderAdminTranslations();

  let fbC= getCookie("feedbacks");
  if(fbC){
    try{ feedbacks= JSON.parse(fbC);}catch(e){}
  }
  renderAdminFeedback();

  renderVariantList();
  renderUsageChart();
}

/** Muestra últimas 30 IP logs en admin. */
function renderIPLogs(){
  if(!adminLogs) return;
  adminLogs.innerHTML="";
  let last30= ipLogs.slice(-30);
  for(let i=0; i<last30.length; i++){
    let log= last30[i];
    let li= document.createElement("li");
    li.className="list-group-item bg-transparent text-light";
    li.textContent= log.ip+" -> "+ log.time;
    adminLogs.appendChild(li);
  }
}

/** Crea una “gráfica pro” usando Chart.js para las visitas por día. */
function renderUsageChart(){
  if(!usageChartCanvas || typeof Chart==="undefined"){
    return;
  }
  // Agrupar ipLogs por día (DD/MM/AAAA)
  let map={};
  for(let i=0; i<ipLogs.length; i++){
    let dayStr= ipLogs[i].time.split(",")[0].trim();
    let day= dayStr.split(" ")[0]||dayStr; 
    if(!map[day]) map[day]=0;
    map[day]++;
  }
  let labels= Object.keys(map).sort();
  let data= labels.map(k => map[k]);

  // Destruir previa si quisieras (si re-dibujas)...
  // Por ahora, asumimos se dibuja 1 sola vez.

  new Chart(usageChartCanvas, {
    type:'line', // Cambiamos a 'line' para lucir distinto
    data:{
      labels: labels,
      datasets:[{
        label:'Visitas por Día',
        data: data,
        borderColor:'rgba(75,192,192,1)',
        backgroundColor:'rgba(75,192,192,0.2)',
        fill:true,
        tension:0.2
      }]
    },
    options:{
      responsive:true,
      plugins:{
        legend:{
          display:true
        },
        title:{
          display:true,
          text:'Estadísticas de Visitas'
        },
        tooltip:{
          mode:'index'
        }
      },
      scales:{
        x:{
          title:{
            display:true,
            text:'Día'
          }
        },
        y:{
          title:{
            display:true,
            text:'Visitas'
          },
          beginAtZero:true
        }
      }
    }
  });
}

if(adminUpdateMsgBtn){
  adminUpdateMsgBtn.addEventListener("click", function(){
    let val="";
    if(adminMsgInput && adminMsgInput.value){
      val= adminMsgInput.value.trim();
    }
    setCookie("globalMessage", val);
    alert("Mensaje global actualizado");
  });
}

/** Muestra top 10 del historial en admin. */
function renderAdminTranslations(){
  if(!adminTranslationsEl) return;
  adminTranslationsEl.innerHTML="";
  let limit= Math.min(historialArray.length, 10);
  for(let i=0; i<limit; i++){
    let e= historialArray[i];
    let li= document.createElement("li");
    li.className="list-group-item bg-transparent text-light";
    li.textContent= e.original + " -> " + e.translated;
    adminTranslationsEl.appendChild(li);
  }
}

/** Muestra últimos 20 feedback. */
function renderAdminFeedback(){
  if(!adminFeedbackList) return;
  adminFeedbackList.innerHTML="";
  let last20= feedbacks.slice(-20);
  for(let i=0; i<last20.length; i++){
    let fb= last20[i];
    let li= document.createElement("li");
    li.className="list-group-item bg-transparent text-light";
    li.textContent= `[${fb.time}] ${fb.name}: ${fb.msg}`;
    adminFeedbackList.appendChild(li);
  }
}

/** Muestra IPs baneadas en admin. */
function renderBannedIPs(){
  if(!bannedIpList) return;
  bannedIpList.innerHTML="";
  for(let i=0; i<blockedIPs.length; i++){
    let ip= blockedIPs[i];
    let li= document.createElement("li");
    li.className="list-group-item bg-transparent text-danger";
    li.textContent= ip;
    bannedIpList.appendChild(li);
  }
}
if(banIpBtn){
  banIpBtn.addEventListener("click", function(){
    if(!ipInput || !ipInput.value) return;
    let val= ipInput.value.trim();
    if(val && blockedIPs.indexOf(val)===-1){
      blockedIPs.push(val);
      setCookie("bannedIPs", JSON.stringify(blockedIPs));
      renderBannedIPs();
      alert("IP bloqueada: " + val);
    }
    ipInput.value="";
  });
}
if(unbanIpBtn){
  unbanIpBtn.addEventListener("click", function(){
    if(!ipInput || !ipInput.value) return;
    let val= ipInput.value.trim();
    let idx= blockedIPs.indexOf(val);
    if(val && idx!==-1){
      blockedIPs.splice(idx,1);
      setCookie("bannedIPs", JSON.stringify(blockedIPs));
      renderBannedIPs();
      alert("IP desbloqueada: " + val);
    }
    ipInput.value="";
  });
}

/** Muestra las palabras bloqueadas */
function renderBlockedWords(){
  if(!blockedWordsList) return;
  blockedWordsList.innerHTML="";
  for(let i=0; i<blockedWords.length; i++){
    let w= blockedWords[i];
    let li= document.createElement("li");
    li.className="list-group-item bg-transparent text-warning";
    li.textContent= w;
    blockedWordsList.appendChild(li);
  }
}
if(blockWordBtn){
  blockWordBtn.addEventListener("click", function(){
    if(!wordInput || !wordInput.value) return;
    let w= wordInput.value.trim().toLowerCase();
    if(!w) return;
    if(blockedWords.indexOf(w)===-1){
      blockedWords.push(w);
      setCookie("blockedWords", JSON.stringify(blockedWords));
      renderBlockedWords();
      alert("Palabra bloqueada: " + w);
    }
    wordInput.value="";
  });
}
if(unblockWordBtn){
  unblockWordBtn.addEventListener("click", function(){
    if(!wordInput || !wordInput.value) return;
    let w= wordInput.value.trim().toLowerCase();
    let idx= blockedWords.indexOf(w);
    if(idx!==-1){
      blockedWords.splice(idx,1);
      setCookie("blockedWords", JSON.stringify(blockedWords));
      renderBlockedWords();
      alert("Palabra desbloqueada: " + w);
    }
    wordInput.value="";
  });
}

/** Muestra los modos custom en admin */
function renderVariantList(){
  if(!variantListEl) return;
  variantListEl.innerHTML="";
  let activeModes= getCookie("activeModes");
  let arr=[];
  if(activeModes){
    try{ arr= JSON.parse(activeModes);} catch(e){}
  }
  for(let i=0; i<arr.length; i++){
    let am= arr[i];
    let li= document.createElement("li");
    li.className="list-group-item bg-transparent text-info";
    li.textContent= am.name + " ";
    let delBtn= document.createElement("button");
    delBtn.className="delete-mode-btn btn btn-sm btn-danger ms-2";
    delBtn.textContent="X";
    delBtn.addEventListener("click", function(){
      let filtered= arr.filter(x => x.id!== am.id);
      setCookie("activeModes", JSON.stringify(filtered));
      renderVariantList();
    });
    li.appendChild(delBtn);
    variantListEl.appendChild(li);
  }
}
if(adminAddVariantBtn){
  adminAddVariantBtn.addEventListener("click", function(){
    let nameEl= document.getElementById("variantName");
    let sepEl= document.getElementById("variantSep");
    if(!nameEl || !sepEl) return;
    let name= nameEl.value.trim();
    let sep= sepEl.value.trim();
    if(!name) return;

    let activeModes= getCookie("activeModes");
    let arr=[];
    if(activeModes){
      try{ arr= JSON.parse(activeModes);}catch(e){}
    }
    let newM= { id:"custom-"+Date.now(), name:name, sep:sep };
    arr.push(newM);
    setCookie("activeModes", JSON.stringify(arr));
    alert("Nuevo modo añadido: "+ name);
    renderVariantList();
  });
}

/** Botón “Cerrar Sesión” en admin */
if(logoutBtn){
  logoutBtn.addEventListener("click", function(){
    deleteCookie("adminSession");
    if(adminPanel){
      adminPanel.classList.add("d-none");
    }
    if(loginSection){
      loginSection.classList.remove("hidden");
    }
    if(adminUserInput){ adminUserInput.value=""; }
    if(adminPassInput){ adminPassInput.value=""; }
  });
}

/** Botón “Borrar todo el historial” en admin */
if(clearAllHistoryBtn){
  clearAllHistoryBtn.addEventListener("click", function(){
    deleteCookie("history");
    historialArray=[];
    if(adminTranslationsEl){
      adminTranslationsEl.innerHTML="";
    }
    alert("Historial de traducciones eliminado.");
  });
}

/************************************************************
 * 8. MULTILENGUAJE Y TEMA
 ************************************************************/
function applyTranslations(lang){
  let subt= document.getElementById("siteSubtitle");
  if(translateBtn && copyResultBtn && clearHistoryBtn && subt){
    if(lang==="en"){
      subt.textContent="Translate and transform text with special characters (Anime mode included)";
      translateBtn.textContent="Translate";
      copyResultBtn.textContent="Copy Translation";
      clearHistoryBtn.textContent="Clear History";
      let emptyEl= document.getElementById("history-empty");
      if(emptyEl){
        emptyEl.textContent="No translation history.";
      }
    } else {
      subt.textContent="Traduce y transforma texto con caracteres especiales (incluido Modo Anime)";
      translateBtn.textContent="Traducir";
      copyResultBtn.textContent="Copiar traducción";
      clearHistoryBtn.textContent="Borrar historial";
      let emptyEl= document.getElementById("history-empty");
      if(emptyEl){
        emptyEl.textContent="No hay traducciones en el historial.";
      }
    }
  }
}

function applyTheme(theme){
  document.body.classList.remove("tema-claro","tema-oscuro");
  if(theme==="claro"){
    document.body.classList.add("tema-claro");
  } else if(theme==="oscuro"){
    document.body.classList.add("tema-oscuro");
  }
}

/************************************************************
 * 9. UTILS
 ************************************************************/
function copyToClipboard(text){
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).catch(function(err){
      console.error(err);
    });
  } else {
    let temp= document.createElement("textarea");
    temp.value= text;
    document.body.appendChild(temp);
    temp.select();
    try{
      document.execCommand("copy");
    } catch(e){}
    document.body.removeChild(temp);
  }
}

function openDiscord(){
  window.open('https://discord.gg/YwmPXE5rk9','_blank');
}
window.openDiscord= openDiscord;

/************************************************************
 * 10. DOMContentLoaded => init
 ************************************************************/
document.addEventListener("DOMContentLoaded", function(){
  if(isAdminPage){
    initAdmin();
  } else {
    initIndex();
  }
});
