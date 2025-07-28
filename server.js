/****************************************************
 * server.js - Ejemplo completo (Express + Socket.IO + CSV)
 * para servir index.html / admin.html y manejar IP logs,
 * feedback, baneos, etc. en tiempo real.
 ****************************************************/
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const session = require('express-session');
const csv = require('fast-csv'); // Para exportar CSV (excel)

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// -----------------------------------------
// Almacenes en memoria (DEMO):
// En producción, usarías una BD real.
// -----------------------------------------
let ipLogs = [];       // { ip, time }
let feedbacks = [];    // { name, msg, time }
let bannedIPs = new Set(); // IPs bloqueadas
let globalMessage = "Mensaje global inicial 2025"; 

// -----------------------------------------
// Configurar sesión (para login, opcional)
// -----------------------------------------
app.use(session({
  secret: 'clave-secreta-2025',
  resave: false,
  saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -----------------------------------------
// Middleware para banear IP antes de servir
// -----------------------------------------
app.use((req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] 
                || req.connection.remoteAddress 
                || req.socket.remoteAddress
                || 'desconocida';
  // "::ffff:127.0.0.1" -> "127.0.0.1"
  const cleanIP = clientIP.replace(/^.*:/, '');

  // Si está baneada, 403
  if (bannedIPs.has(cleanIP)) {
    return res.status(403).send(`
      <h1>Acceso denegado</h1>
      <p>Tu IP (${cleanIP}) está bloqueada.</p>
    `);
  }
  
  // Registrar log de IP
  ipLogs.push({
    ip: cleanIP,
    time: new Date().toLocaleString()
  });
  // Limitar a 200
  if (ipLogs.length > 200) {
    ipLogs.shift();
  }
  req.clientIP = cleanIP;
  next();
});

// -----------------------------------------
// Servir archivos estáticos desde esta misma carpeta
// (Asegúrate de que index.html, admin.html, script.js,
//  style.css, etc., estén en la misma carpeta que server.js)
// -----------------------------------------
app.use(express.static(__dirname));

// -----------------------------------------
// Ruta raíz "/" -> manda index.html
// -----------------------------------------
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// -----------------------------------------
// Ruta "/admin" -> manda admin.html
// -----------------------------------------
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// -----------------------------------------
// Exportar CSV (logs + feedback)
// -----------------------------------------
app.get('/export-csv', (req, res) => {
  // Generar CSV con ipLogs + feedback
  const rows = [];
  // Encabezado
  rows.push(["Tipo","IP/NOMBRE","Mensaje","Fecha"]);

  // IP logs
  ipLogs.forEach(log => {
    rows.push(["IP", log.ip, "", log.time]);
  });

  // Feedback
  feedbacks.forEach(fb => {
    rows.push(["Feedback", fb.name, fb.msg, fb.time]);
  });

  // Configurar headers
  res.setHeader('Content-Disposition', 'attachment; filename="export_data.csv"');
  res.setHeader('Content-Type', 'text/csv; charset=UTF-8');

  csv.write(rows, { headers: false }).pipe(res);
});

// -----------------------------------------
// Login de admin (demo). Podrías usar /admin-login etc.
// Lo ponemos aquí rápido. Hardcode: user=admin, pass=devsecret123
// -----------------------------------------
app.post('/login-admin', (req, res) => {
  const { user, pass } = req.body;
  if (user === "admin" && pass === "devsecret123") {
    req.session.isAdmin = true;
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});

// Logout (simple)
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// -----------------------------------------
// Socket.IO - para notificaciones en tiempo real
// -----------------------------------------
io.on('connection', (socket) => {
  console.log("Cliente conectado.");

  // Distinguimos si es un admin
  socket.on('iamAdmin', () => {
    socket.join('admins');
    // Mandar data inicial
    socket.emit('initData', {
      ipLogs,
      feedbacks,
      globalMessage
      // etc
    });
  });

  // Feedback en tiempo real
  socket.on('newFeedback', (data) => {
    // data = { name, msg }
    const item = {
      name: data.name || "Anónimo",
      msg: data.msg,
      time: new Date().toLocaleString()
    };
    feedbacks.push(item);
    // Notificar a todos los admin
    io.to('admins').emit('feedbackAdded', item);
  });

  socket.on('disconnect', () => {
    console.log("Cliente desconectado.");
  });
});

// -----------------------------------------
// Rutas para banear IP o desbanear
// (Opcional, si quieres mandar un fetch POST desde admin.html)
// -----------------------------------------
app.post('/ban-ip', (req, res) => {
  const { ip } = req.body;
  if (ip) {
    bannedIPs.add(ip);
    // notificar a admins
    io.to('admins').emit('ipBanned', { ip });
    return res.json({ success:true, ip });
  }
  return res.json({ success:false, error:"No IP" });
});
app.post('/unban-ip', (req, res) => {
  const { ip } = req.body;
  if (ip && bannedIPs.has(ip)) {
    bannedIPs.delete(ip);
    io.to('admins').emit('ipUnbanned', { ip });
    return res.json({ success:true });
  }
  return res.json({ success:false, error:"IP not found or not banned"});
});

// -----------------------------------------
// Ruta para actualizar mensaje global en memoria
// -----------------------------------------
app.post('/global-msg', (req, res) => {
  const { message } = req.body;
  globalMessage = message || "";
  // Notificar a todos (admins y no admins)
  io.emit('globalMessage', { message: globalMessage });
  res.json({ success:true });
});

// -----------------------------------------
// Levantar servidor
// -----------------------------------------
server.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:" + PORT);
});
