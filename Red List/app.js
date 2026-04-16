(function () {
  const screens = {
    login: document.getElementById("screen-login"),
    register: document.getElementById("screen-register"),
    loading: document.getElementById("screen-loading"),
    dashboard: document.getElementById("screen-dashboard"),
    confirmLogout: document.getElementById("screen-confirm-logout"),
    loggedOut: document.getElementById("screen-logged-out"),
  };

  const loginEmail = document.getElementById("login-email");
  const loginPassword = document.getElementById("login-password");
  const loginError = document.getElementById("login-error");
  const toggleLoginPassword = document.getElementById("toggle-login-password");
  const loginSubmit = document.getElementById("login-submit");
  const goRegister = document.getElementById("go-register");
  const createAccountCta = document.getElementById("create-account-cta");

  const registerName = document.getElementById("register-name");
  const registerBirth = document.getElementById("register-birth");
  const registerEmail = document.getElementById("register-email");
  const registerPassword = document.getElementById("register-password");
  const registerPasswordRepeat = document.getElementById("register-password-repeat");
  const registerRole = document.getElementById("register-role");
  const registerId = document.getElementById("register-id");
  const registerError = document.getElementById("register-error");
  const registerSubmit = document.getElementById("register-submit");
  const goLogin = document.getElementById("go-login");

  const topbarUserId = document.getElementById("topbar-user-id");
  const navReportes = document.getElementById("nav-reportes");
  const navConsecuencias = document.getElementById("nav-consecuencias");
  const viewReportes = document.getElementById("view-reportes");
  const viewConsecuencias = document.getElementById("view-consecuencias");
  const reportsTableBody = document.getElementById("reports-table-body");
  const consequencesTableBody = document.getElementById("consequences-table-body");
  const searchInput = document.getElementById("search-input");
  const backMenu = document.getElementById("back-menu");
  const logoutTrigger = document.getElementById("logout-trigger");
  const confirmLogout = document.getElementById("confirm-logout");
  const cancelLogout = document.getElementById("cancel-logout");
  const restartLogin = document.getElementById("restart-login");

  const sampleReports = [
    {
      nombre: "Ana López",
      grupo: "4DPGM",
      reporte: "Mala conducta",
      sancion: "Citatorios",
      fecha: "12/04/2026",
      hora: "08:15",
      area: "Patio",
      docente: "Mtra. Reyes",
      nivel: "Media",
      estado: "Activo",
    },
    {
      nombre: "Juan Pérez",
      grupo: "4APRO",
      reporte: "Bullying",
      sancion: "Suspensión",
      fecha: "13/04/2026",
      hora: "10:40",
      area: "Aula 8",
      docente: "Profr. Luna",
      nivel: "Alta",
      estado: "Revisión",
    },
    {
      nombre: "María Ruiz",
      grupo: "2BMEC",
      reporte: "Daño a instalaciones",
      sancion: "Horas de servicio",
      fecha: "14/04/2026",
      hora: "11:20",
      area: "Laboratorio",
      docente: "Ing. Soto",
      nivel: "Alta",
      estado: "Pendiente",
    },
    {
      nombre: "Luis Torres",
      grupo: "6CPRO",
      reporte: "Retardo constante",
      sancion: "Llamar a padres",
      fecha: "15/04/2026",
      hora: "07:10",
      area: "Acceso",
      docente: "Mtra. Vela",
      nivel: "Baja",
      estado: "Cerrado",
    },
  ];

  const sampleConsequences = [
    {
      id: "C-01",
      consecuencia: "Horas de servicio",
      descripcion: "Apoyo en limpieza escolar",
      duracion: "5 horas",
      nivel: "Media",
      aplicaA: "Estudiantes",
      autorizacion: "Prefectura",
      seguimiento: "Semanal",
      areaResponsable: "Servicios escolares",
      notificacion: "Tutor",
      observaciones: "Cumplimiento obligatorio",
    },
    {
      id: "C-02",
      consecuencia: "Citatorios",
      descripcion: "Cita formal con tutor",
      duracion: "1 día",
      nivel: "Baja",
      aplicaA: "Estudiantes",
      autorizacion: "Dirección",
      seguimiento: "Único",
      areaResponsable: "Trabajo social",
      notificacion: "Padres",
      observaciones: "Debe presentarse firmado",
    },
    {
      id: "C-03",
      consecuencia: "Reprobar",
      descripcion: "Sanción académica parcial",
      duracion: "Bimestre",
      nivel: "Alta",
      aplicaA: "Casos graves",
      autorizacion: "Consejo",
      seguimiento: "Mensual",
      areaResponsable: "Coordinación",
      notificacion: "Tutor y alumno",
      observaciones: "Requiere expediente",
    },
    {
      id: "C-04",
      consecuencia: "Suspensión",
      descripcion: "Separación temporal",
      duracion: "3 días",
      nivel: "Alta",
      aplicaA: "Estudiantes",
      autorizacion: "Dirección",
      seguimiento: "Posterior",
      areaResponsable: "Prefectura",
      notificacion: "Padres",
      observaciones: "Regreso con carta",
    },
    {
      id: "C-05",
      consecuencia: "Llamar a padres",
      descripcion: "Contacto inmediato",
      duracion: "Mismo día",
      nivel: "Media",
      aplicaA: "Estudiantes",
      autorizacion: "Docente",
      seguimiento: "Diario",
      areaResponsable: "Control escolar",
      notificacion: "Padres",
      observaciones: "Registrar llamada",
    },
  ];

  const state = {
    currentUserId: "00000000000",
    filteredReports: sampleReports.slice(),
  };

  function showScreen(name) {
    Object.values(screens).forEach((screen) => screen.classList.add("hidden"));
    screens[name].classList.remove("hidden");
  }

  function showError(element, message) {
    element.textContent = message;
    element.classList.remove("hidden");
  }

  function clearError(element) {
    element.textContent = "";
    element.classList.add("hidden");
  }

  function setPasswordVisibility(input, button) {
    const nextType = input.type === "password" ? "text" : "password";
    input.type = nextType;
    button.textContent = nextType === "password" ? "Ver" : "Ocultar";
  }

  function renderReports(rows) {
    reportsTableBody.innerHTML = rows
      .map(
        (row) => `
          <tr>
            <td>${escapeHtml(row.nombre)}</td>
            <td>${escapeHtml(row.grupo)}</td>
            <td>${escapeHtml(row.reporte)}</td>
            <td>${escapeHtml(row.sancion)}</td>
            <td>${escapeHtml(row.fecha)}</td>
            <td>${escapeHtml(row.hora)}</td>
            <td>${escapeHtml(row.area)}</td>
            <td>${escapeHtml(row.docente)}</td>
            <td>${escapeHtml(row.nivel)}</td>
            <td>${escapeHtml(row.estado)}</td>
          </tr>
        `
      )
      .join("");
  }

  function renderConsequences(rows) {
    consequencesTableBody.innerHTML = rows
      .map(
        (row) => `
          <tr>
            <td>${escapeHtml(row.id)}</td>
            <td>${escapeHtml(row.consecuencia)}</td>
            <td>${escapeHtml(row.descripcion)}</td>
            <td>${escapeHtml(row.duracion)}</td>
            <td>${escapeHtml(row.nivel)}</td>
            <td>${escapeHtml(row.aplicaA)}</td>
            <td>${escapeHtml(row.autorizacion)}</td>
            <td>${escapeHtml(row.seguimiento)}</td>
            <td>${escapeHtml(row.areaResponsable)}</td>
            <td>${escapeHtml(row.notificacion)}</td>
            <td>${escapeHtml(row.observaciones)}</td>
          </tr>
        `
      )
      .join("");
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = String(text);
    return div.innerHTML;
  }

  function showReportsView() {
    navReportes.classList.add("is-active");
    navConsecuencias.classList.remove("is-active");
    viewReportes.classList.remove("hidden");
    viewConsecuencias.classList.add("hidden");
  }

  function showConsequencesView() {
    navConsecuencias.classList.add("is-active");
    navReportes.classList.remove("is-active");
    viewConsecuencias.classList.remove("hidden");
    viewReportes.classList.add("hidden");
  }

  function startLoadingThenDashboard() {
    showScreen("loading");
    window.setTimeout(function () {
      topbarUserId.textContent = state.currentUserId;
      showReportsView();
      renderReports(sampleReports);
      showScreen("dashboard");
    }, 2400);
  }

  function handleLogin() {
    clearError(loginError);

    if (!loginEmail.value.trim() || !loginPassword.value.trim()) {
      showError(loginError, "Escribe texto en correo y contraseña para iniciar sesión.");
      return;
    }

    state.currentUserId = "244020800510346";
    startLoadingThenDashboard();
  }

  function validateRegister() {
    clearError(registerError);

    const name = registerName.value.trim();
    const birth = registerBirth.value;
    const email = registerEmail.value.trim();
    const password = registerPassword.value;
    const repeatPassword = registerPasswordRepeat.value;
    const role = registerRole.value;
    const id = registerId.value.trim();

    if (!name || !birth || !email || !password || !repeatPassword || !role || !id) {
      showError(registerError, "Completa todos los campos.");
      return false;
    }

    if (name.length > 30) {
      showError(registerError, "El nombre no puede exceder 30 caracteres.");
      return false;
    }

    if (email.length > 30) {
      showError(registerError, "El correo no puede exceder 30 caracteres.");
      return false;
    }

    if (password.length < 8 || password.length > 15) {
      showError(registerError, "La contraseña debe tener entre 8 y 15 caracteres.");
      return false;
    }

    if (id.length > 11) {
      showError(registerError, "La matrícula o número de empleado no puede exceder 11 caracteres.");
      return false;
    }

    if (password !== repeatPassword) {
      showError(registerError, "Las contraseñas no coinciden.");
      return false;
    }

    state.currentUserId = id;
    return true;
  }

  function resetAuthForms() {
    loginEmail.value = "";
    loginPassword.value = "";
    registerName.value = "";
    registerBirth.value = "";
    registerEmail.value = "";
    registerPassword.value = "";
    registerPasswordRepeat.value = "";
    registerRole.value = "";
    registerId.value = "";
    searchInput.value = "";
    clearError(loginError);
    clearError(registerError);
    state.filteredReports = sampleReports.slice();
    renderReports(state.filteredReports);
  }

  toggleLoginPassword.addEventListener("click", function () {
    setPasswordVisibility(loginPassword, toggleLoginPassword);
  });

  loginSubmit.addEventListener("click", handleLogin);
  goRegister.addEventListener("click", function () {
    clearError(loginError);
    showScreen("register");
  });
  createAccountCta.addEventListener("click", function () {
    clearError(loginError);
    showScreen("register");
  });
  goLogin.addEventListener("click", function () {
    clearError(registerError);
    showScreen("login");
  });

  registerSubmit.addEventListener("click", function () {
    if (!validateRegister()) {
      return;
    }
    startLoadingThenDashboard();
  });

  navReportes.addEventListener("click", showReportsView);
  navConsecuencias.addEventListener("click", showConsequencesView);
  backMenu.addEventListener("click", showReportsView);

  searchInput.addEventListener("input", function () {
    const term = searchInput.value.trim().toLowerCase();
    state.filteredReports = sampleReports.filter(function (row) {
      return Object.values(row).some(function (value) {
        return String(value).toLowerCase().includes(term);
      });
    });
    renderReports(state.filteredReports);
  });

  logoutTrigger.addEventListener("click", function () {
    showScreen("confirmLogout");
  });

  confirmLogout.addEventListener("click", function () {
    showScreen("loggedOut");
  });

  cancelLogout.addEventListener("click", function () {
    showScreen("dashboard");
  });

  restartLogin.addEventListener("click", function () {
    resetAuthForms();
    showScreen("login");
  });

  renderReports(sampleReports);
  renderConsequences(sampleConsequences);
  showScreen("login");
})();
