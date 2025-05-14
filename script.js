let currentPage = 0;
const totalPages = 12;

const firebaseConfig = {
  apiKey: "AIzaSyCT3Su-7kQ3v9NHgOWhE6a3L1afWoyU_pY",
  authDomain: "echodavid-cv.firebaseapp.com",
  projectId: "echodavid-cv",
  storageBucket: "echodavid-cv.firebasestorage.app",
  messagingSenderId: "210541340833",
  appId: "1:210541340833:web:24dc9fb90a7b4db8c7e8e0",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // ¡Ahora usamos Firestore directamente desde el cliente!


document.addEventListener("DOMContentLoaded", () => {
    document
      .getElementById("multiPageForm")
      .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault(); // Evita que el formulario se envíe
        }
      });
  showPage(currentPage);
  updateProgressBar();
  initializeFormEventListeners();

  document
    .getElementById("multiPageForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      if (validatePage(totalPages - 1)) {
        // totalPages - 1 es el índice de la última página de datos
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
          if (key.endsWith("[]")) {
            const actualKey = key.slice(0, -2);
            if (!data[actualKey]) data[actualKey] = [];
            data[actualKey].push(value);
          } else {
            data[key] = value;
          }
        });
        data.timestamp = new Date().toISOString(); // Marca de tiempo del cliente

        console.log("Enviando datos directamente a Firestore:", data);

        db.collection("formulariosMedicos")
          .add(data)
          .then((docRef) => {
            console.log("Documento escrito con ID: ", docRef.id);
            alert("Formulario enviado con éxito a Firestore (directo).");
            // this.reset(); // Opcional: resetear
          })
          .catch((error) => {
            console.error("Error al añadir documento: ", error);
            alert("Error al enviar el formulario: " + error.message);
          });
        console.log("Form Data:", data);
        alert(
          "Formulario enviado con éxito. Revisa la consola para ver los datos."
        );
        // Aquí enviarías 'data' a un servidor
      } else {
        alert(
          "Por favor, corrige los errores en la página actual antes de enviar."
        );
      }
    });
});

function initializeFormEventListeners() {
  // Event listeners para 'otro' en selects
  document.querySelectorAll('select[onchange*="toggleOtro("]').forEach((el) => {
    const anInputId = el.getAttribute("onchange").match(/'([^']+)'\)/)[1];
    el.addEventListener("change", (event) =>
      toggleOtro(event.target, anInputId)
    );
  });

  document
    .querySelector('select[name="sexo"]')
    .addEventListener("change", (event) => {
      toggleOtro(event.target, "sexo_otro_valor");
      checkSexoAndAgeForPage2();
    });

  document
    .querySelector('select[name="edad"]')
    .addEventListener("change", (event) => {
      toggleOtroEdad(event.target.value); // toggleOtroEdad ya llama a checkSexoAndAgeForPage2
    });
  document
    .getElementById("edad_otro_valor")
    .addEventListener("input", checkSexoAndAgeForPage2);

  // Event listeners para funciones de toggle que necesitan gestionar 'required'
  document
    .querySelector('select[name="ha_estado_embarazada"]')
    .addEventListener("change", (e) => toggleEmbarazoDetalles(e.target.value));
  document
    .querySelector('select[name="consumo_prolongado_medicamento"]')
    .addEventListener("change", (e) =>
      toggleConsumoMedicamentoDetalles(e.target.value)
    );

  document
    .querySelectorAll(
      'input[name^="enf_cronica_madre"], input[name^="enf_cronica_padre"]'
    )
    .forEach((cb) => {
      cb.addEventListener("change", (e) => {
        const parts = e.target.name.match(/enf_cronica_(madre|padre)/);
        if (parts) {
          const pariente = parts[1];
          let enfermedadKey = e.target.value.replace(/\s+/g, "_").toLowerCase();
          if (e.target.name.includes("_otro_check")) enfermedadKey = "otro";
          toggleEnfermedadDetalles(pariente, enfermedadKey, e.target.checked);
        }
      });
    });

  document
    .querySelectorAll('input[name^="enf_cronica_actual"]')
    .forEach((cb) => {
      cb.addEventListener("change", (e) => {
        let enfermedadKey = e.target.value.replace(/\s+/g, "_").toLowerCase();
        if (e.target.name.includes("_otro_check")) enfermedadKey = "otro";
        toggleEnfermedadActualDetalles(e.target, enfermedadKey);
      });
    });

  document
    .querySelector('select[name="fuma"]')
    .addEventListener("change", (e) => toggleFumaDetalles(e.target.value));
  document
    .querySelector('select[name="consume_alcohol"]')
    .addEventListener("change", (e) => toggleAlcoholDetalles(e.target.value));
  document
    .querySelector('select[name="dificultad_dormir"]')
    .addEventListener("change", (e) =>
      toggleDificultadDormirDetalles(e.target.value)
    );
  document
    .querySelector('select[name="medicamento_dormir"]')
    .addEventListener("change", (e) =>
      toggleMedicamentoDormirNombre(e.target.value)
    );
  document
    .querySelector('select[name="condicion_medica_sueno"]')
    .addEventListener("change", (e) =>
      toggleCondicionMedicaSuenoCual(e.target.value)
    );
  document
    .querySelector('select[name="uso_pantallas_antes_dormir"]')
    .addEventListener("change", (e) => toggleTiempoPantallas(e.target.value));
  document
    .querySelector('select[name="actividad_fisica"]')
    .addEventListener("change", (e) =>
      toggleActividadFisicaDetalles(e.target.value)
    );
  document
    .querySelector('select[name="transfusiones_sangre"]')
    .addEventListener("change", (e) => toggleTransfusionAno(e.target.value));
  document
    .querySelector('select[name="uso_drogas"]')
    .addEventListener("change", (e) => toggleDrogasDetalles(e.target.value));
  document
    .querySelectorAll('input[name="tipo_sustancias[]"]')
    .forEach((cb) =>
      cb.addEventListener("change", () => toggleSustanciaFrecuencia(cb))
    );
  document
    .querySelector('select[name="vida_sexual_activa"]')
    .addEventListener("change", (e) =>
      toggleVidaSexualActivaDetalles(e.target.value)
    );

  // Set initial states correctly (important if navigating back or for pre-filled forms)
  document.dispatchEvent(new Event("formconditionsloaded")); // Custom event
}

document.addEventListener("formconditionsloaded", () => {
  checkSexoAndAgeForPage2();
  const vidaSexualActivaSelect = document.querySelector(
    'select[name="vida_sexual_activa"]'
  );
  if (vidaSexualActivaSelect && vidaSexualActivaSelect.value)
    toggleVidaSexualActivaDetalles(vidaSexualActivaSelect.value);

  // Re-evaluate required attributes based on current selections on load
  const form = document.getElementById("multiPageForm");
  if (form.ha_estado_embarazada.value)
    toggleEmbarazoDetalles(form.ha_estado_embarazada.value);
  if (form.consumo_prolongado_medicamento.value)
    toggleConsumoMedicamentoDetalles(form.consumo_prolongado_medicamento.value);
  if (form.fuma.value) toggleFumaDetalles(form.fuma.value);
  if (form.consume_alcohol.value)
    toggleAlcoholDetalles(form.consume_alcohol.value);
  // ... add for all other toggles that manage 'required' attributes ...
});
function showPage(pageNumber) {
  document
    .querySelectorAll(".form-page")
    .forEach((page) => page.classList.remove("active-page"));
  const targetPage = document.getElementById(`page${pageNumber}`);
  if (targetPage) {
    targetPage.classList.add("active-page");
  } else {
    console.error("Error: Página " + pageNumber + " no encontrada.");
  }
  // Opcional: poner el foco en el primer campo de la página (si no es la página 0)
  if (pageNumber > 0 && targetPage) {
    const firstInput = targetPage.querySelector(
      'input:not([type="hidden"]), select, textarea'
    );
    if (firstInput) {
      // firstInput.focus(); // Puede ser molesto en algunos casos
    }
  }
  setInitialRequiredForPage(pageNumber); // Tu función existente
}
function setInitialRequiredForPage(pageNumber) {
  const page = document.getElementById(`page${pageNumber}`);
  // Example: Fields on page 1 that are always required
  if (pageNumber === 1) {
    [
      "fecha_nacimiento",
      "sexo",
      "estado_civil",
      "ocupacion",
      "nivel_socioeconomico",
      "nivel_estudios",
      "ciudad_nacimiento",
      "ciudad_residencia",
    ].forEach((id) => {
      const el = page.querySelector(`[name="${id}"], #${id}`);
      if (el) el.setAttribute("required", "");
    });
    page.querySelector("#edad").setAttribute("required", "");
  }
  if (
    pageNumber === 2 &&
    document.getElementById("ginecologia_questions").style.display !== "none"
  ) {
    [
      "primera_menstruacion",
      "ciclos_regulares",
      "duracion_ciclo",
      "ha_estado_embarazada",
      "ultimo_papanicolaou",
    ].forEach((id) => {
      const el = page.querySelector(`[name="${id}"], #${id}`);
      if (el) el.setAttribute("required", "");
    });
  }
  // Add more for other pages as needed for fields that are *always* required when their page is shown
  if (pageNumber === 9) {
    // Vacunación
    [
      "vacuna_tetanos",
      "vacuna_hepatitis_b",
      "vacuna_influenza",
      "vacuna_covid",
      "vacunacion_infantil_completa",
    ].forEach((name) => {
      const el = page.querySelector(`select[name="${name}"]`);
      if (el) el.setAttribute("required", "");
    });
  }
}

function validatePage(pageNumber) {
  const page = document.getElementById(`page${pageNumber}`);
  let isValid = true;

  // Clear previous errors on the current page
  page
    .querySelectorAll(".is-invalid")
    .forEach((el) => el.classList.remove("is-invalid"));
  page
    .querySelectorAll(".error-message")
    .forEach((el) => (el.style.display = "none"));

  const elementsToValidate = page.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );

  elementsToValidate.forEach((el) => {
    // Check if element is visible (simple check, might need refinement for complex visibility)
    const isVisible = !!(
      el.offsetWidth ||
      el.offsetHeight ||
      el.getClientRects().length
    );

    if (isVisible) {
      let fieldValid = true;
      if (el.type === "checkbox") {
        // For a single required checkbox, it must be checked
        if (!el.checked) fieldValid = false;
      } else if (el.type === "radio") {
        // For radio groups, check if any with the same name is checked
        const radioGroup = page.querySelectorAll(
          `input[name="${el.name}"]:checked`
        );
        if (radioGroup.length === 0) fieldValid = false;
      } else if (el.value.trim() === "") {
        fieldValid = false;
      }

      if (!fieldValid) {
        isValid = false;
        el.classList.add("is-invalid");
        let errorSpan = el.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains("error-message")) {
          // If no error span exists or it's not the correct one, create it
          const tempErrorSpan = document.createElement("span");
          tempErrorSpan.classList.add("error-message");
          el.parentNode.insertBefore(tempErrorSpan, el.nextSibling);
          errorSpan = tempErrorSpan;
        }
        errorSpan.textContent =
          el.dataset.errorMessage || "Este campo es obligatorio.";
        errorSpan.style.display = "block";
      }
    }
  });

  // Specific group validations (e.g., at least one checkbox in a group)
  // Example for "productos_tabaco" on page 6 IF "fuma" is "Si"
  if (
    pageNumber === 6 &&
    document.getElementById("fuma_detalles").offsetParent !== null
  ) {
    // if fuma_detalles is visible
    const productosTabacoCheckboxes = page.querySelectorAll(
      'input[name="productos_tabaco[]"]'
    );
    const isAnyProductoTabacoChecked = Array.from(
      productosTabacoCheckboxes
    ).some((cb) => cb.checked);
    if (!isAnyProductoTabacoChecked) {
      isValid = false;
      const groupContainer = productosTabacoCheckboxes[0]
        .closest(".form-group")
        .querySelector("label"); // Find a place to show error
      displayGroupError(
        productosTabacoCheckboxes[0].closest(".form-group"),
        "Seleccione al menos un tipo de producto."
      );
    }
  }
  if (
    pageNumber === 10 &&
    document.getElementById("drogas_detalles").offsetParent !== null
  ) {
    const tipoSustanciasCheckboxes = page.querySelectorAll(
      'input[name="tipo_sustancias[]"]'
    );
    const isAnySustanciaChecked = Array.from(tipoSustanciasCheckboxes).some(
      (cb) => cb.checked
    );
    if (!isAnySustanciaChecked) {
      isValid = false;
      displayGroupError(
        tipoSustanciasCheckboxes[0].closest(".form-group"),
        "Seleccione al menos una sustancia o 'Ninguna'."
      );
    }
  }

  return isValid;
}

function displayGroupError(groupElement, message) {
  // Add is-invalid to a wrapper if it exists, or create an error message
  let errorSpan = groupElement.querySelector(".error-message");
  if (!errorSpan) {
    errorSpan = document.createElement("span");
    errorSpan.classList.add("error-message");
    // Try to append after the label or at the end of the group
    const label = groupElement.querySelector("label");
    if (label && label.nextSibling) {
      label.parentNode.insertBefore(errorSpan, label.nextSibling);
    } else {
      groupElement.appendChild(errorSpan);
    }
  }
  errorSpan.textContent = message;
  errorSpan.style.display = "block";
  // Optionally mark the group itself
  const checkboxGroupDiv =
    groupElement.querySelector(".checkbox-group") ||
    groupElement.querySelector(".radio-group");
  if (checkboxGroupDiv) checkboxGroupDiv.classList.add("is-invalid");
}

function nextPage() {
  // Si estamos en la página de introducción (Página 0), no validar.
  if (currentPage === 0) {
    // No se marca como "completada" en la barra de progreso, ya que la barra es para las páginas de datos.
    currentPage++;
    showPage(currentPage);
    updateProgressBar();
    return;
  }

  // Para las demás páginas, validar antes de avanzar.
  if (!validatePage(currentPage)) {
    alert(
      "Por favor, complete todos los campos obligatorios marcados en rojo."
    );
    return;
  }

  if (currentPage < totalPages - 1) {
    // totalPages - 1 es el índice de la última página (page11)
    // Lógica de skip para Salud de la Mujer (si es relevante y no se cambió)
    if (currentPage === 1) {
      // Saliendo de la página 1 (Datos Demográficos)
      checkSexoAndAgeForPage2(); // Asegurar que las condiciones estén actualizadas
      const sexoSelect = document.getElementById("sexo");
      if (
        sexoSelect &&
        sexoSelect.value !== "Femenino" &&
        document.getElementById("ginecologia_questions").style.display ===
          "none"
      ) {
        if (
          confirm(
            "No seleccionó 'Femenino' para el sexo. ¿Desea omitir la sección de Salud de la Mujer (Página 2)?"
          )
        ) {
          markPageCompleted(currentPage); // Marcar página 1 como completada
          currentPage = 3; // Saltar a la página 3
          showPage(currentPage);
          updateProgressBar();
          return;
        }
      }
    }
    // Lógica de skip para Salud Sexual (si es relevante y no se cambió)
    // Si currentPage es el índice de la página ANTES de Salud Sexual (page10)
    if (currentPage === totalPages - 2) {
      // Asumiendo que page11 es la última de datos (índice totalPages-1)
      const vidaSexualSelect = document.querySelector(
        'select[name="vida_sexual_activa"]'
      );
      if (
        vidaSexualSelect &&
        (vidaSexualSelect.value === "No" ||
          vidaSexualSelect.value === "Prefiero no responder")
      ) {
        if (
          confirm(
            "Ha indicado que no tiene vida sexual activa o prefiere no responder. ¿Desea omitir la sección de Salud Sexual (Página 11)?"
          )
        ) {
          markPageCompleted(currentPage); // Marcar la página actual (10) como completada
          // Simular que la última página (11) también se "completa" y enviar
          currentPage = totalPages - 1; // Ir al índice de la página 11
          markPageCompleted(currentPage); // Marcar la 11 como completada en la barra
          alert(
            "Formulario listo para ser enviado. Se omitió la página de salud sexual."
          );
          // No se llama a showPage(currentPage) para la página omitida
          // El botón de submit está en la página 11 (que es page[totalPages-1])
          // Aquí podrías directamente llamar al submit o dejar que el usuario lo haga
          // Para este flujo, lo mejor es dejar que la última página visible tenga el botón submit
          // Si la página 11 es la última y se omite, el submit debería estar en la 10.
          // Este flujo de skip es complejo con el submit al final.
          // Por simplicidad, el skip aquí podría solo llevar a la última página con el botón submit.
          // O, si el submit está en la página 10, entonces:
          // document.getElementById('multiPageForm').requestSubmit(); // Forzar submit programático
          // O cambiar la estructura para que el botón de submit aparezca en la penúltima página si la última se omite
          showPage(currentPage); // Mostrar la página 11 (vacía/omitida) para el botón de submit
          // O, si se omite de verdad, el botón de submit debe estar en la página anterior visible.
          updateProgressBar();
          return;
        }
      }
    }

    markPageCompleted(currentPage);
    currentPage++;
    showPage(currentPage);
    updateProgressBar();
  }
}

function prevPage() {
  if (currentPage > 0) {
    // Ahora se puede volver hasta la página 0
    // Lógica de skip al retroceder (si es relevante y no se cambió)
    if (
      currentPage === 3 &&
      document.getElementById("ginecologia_questions").style.display === "none"
    ) {
      currentPage = 1; // Volver a la página 1 (Datos Demográficos)
    } else {
      currentPage--;
    }
    showPage(currentPage);
    updateProgressBar();
  }
}

function updateProgressBar() {
  const steps = document.querySelectorAll(".progress-step");
  const lines = document.querySelectorAll(".progress-line");

  if (currentPage === 0) {
    // Si estamos en la página de introducción
    steps.forEach((step) => step.classList.remove("active", "completed"));
    lines.forEach((line) => line.classList.remove("active"));
    return;
  }

  // currentPage aquí es >= 1 (para las páginas del formulario real)
  steps.forEach((step) => {
    const stepNumber = parseInt(step.dataset.step); // data-step es 1-indexed
    if (stepNumber < currentPage) {
      step.classList.add("completed");
      step.classList.remove("active");
    } else if (stepNumber === currentPage) {
      step.classList.add("active");
      step.classList.remove("completed");
    } else {
      step.classList.remove("active", "completed");
    }
  });

  lines.forEach((line, index) => {
    // `index` de `lines` es 0 a (numSteps - 2)
    // La línea `index` está después de `step[index]` (que es `data-step="${index + 1}"`)
    // y antes de `step[index + 1]` (que es `data-step="${index + 2}"`)
    // Una línea está activa si el `currentPage` (1-indexed) ha superado el step que precede a la línea.
    // Es decir, si `currentPage > index + 1`.
    if (currentPage > index + 1) {
      line.classList.add("active");
    } else {
      line.classList.remove("active");
    }
  });
}

function markPageCompleted(pageNumber) {
  // No marcamos progreso para la página de introducción (Página 0) en la barra
  if (pageNumber === 0) {
    return;
  }
  // pageNumber aquí es >= 1 (para las páginas del formulario real)
  const step = document.querySelector(
    `.progress-step[data-step="${pageNumber}"]`
  );
  if (step) {
    step.classList.add("completed");
    step.classList.remove("active");
  }

  // Activar la línea anterior a este step completado
  // Si se completa la página 1, no hay línea antes.
  // Si se completa la página 2, la línea entre 1 y 2 (índice 0 de lines) debe activarse.
  // `pageNumber` es el data-step (1-indexed) del step que se acaba de completar.
  if (pageNumber > 1) {
    const lineIndex = pageNumber - 2; // línea entre step N-1 y N (que es pageNumber)
    const line = document.querySelectorAll(".progress-line")[lineIndex];
    if (line) {
      line.classList.add("active");
    }
  }
}

// --- Funciones de Toggle (actualizadas para manejar 'required') ---

function setRequired(elementId, isRequired) {
  const el = document.getElementById(elementId);
  if (el) {
    if (isRequired) el.setAttribute("required", "");
    else el.removeAttribute("required");
  }
}

function toggleOtro(selectElement, otroInputId) {
  const otroInput = document.getElementById(otroInputId);
  const isOtroSelected =
    selectElement.value === "otro" ||
    selectElement.value === "otro_edad" ||
    selectElement.value === "otro_sexo";
  otroInput.classList.toggle("hidden", !isOtroSelected);
  setRequired(otroInputId, isOtroSelected);
  if (!isOtroSelected) otroInput.value = "";
}

function toggleOtroEdad(value) {
  const otroInput = document.getElementById("edad_otro_valor");
  const isOtroSelected = value === "otro_edad";
  otroInput.classList.toggle("hidden", !isOtroSelected);
  setRequired("edad_otro_valor", isOtroSelected);
  if (!isOtroSelected) otroInput.value = "";
  checkSexoAndAgeForPage2();
}

function toggleOtroNumHijos(value) {
  const especificador = document.getElementById("num_hijos_especificar");
  const showEspecificador = value === "mas_de_2";
  especificador.classList.toggle("hidden", !showEspecificador);
  setRequired("num_hijos_especificar", showEspecificador);
  if (!showEspecificador) especificador.value = "";
}

function toggleOtroCheckbox(checkboxElement, otroInputId) {
  const otroInput = document.getElementById(otroInputId);
  otroInput.classList.toggle("hidden", !checkboxElement.checked);
  // No ponemos 'required' aquí usualmente, a menos que el "otro" sea la única opción válida si se marca.
  // setRequired(otroInputId, checkboxElement.checked);
  if (!checkboxElement.checked) otroInput.value = "";
}

function checkSexoAndAgeForPage2() {
  const sexo = document.getElementById("sexo").value;
  const ginecologiaQuestions = document.getElementById("ginecologia_questions");
  const ginecologiaSkipMessage = document.getElementById(
    "ginecologia_skip_message"
  );
  const mastografiaQuestion = document.getElementById("mastografia_question");
  const isFemenino = sexo === "Femenino";

  ginecologiaQuestions.style.display = isFemenino ? "block" : "none";
  ginecologiaSkipMessage.classList.toggle("hidden", isFemenino);

  const ginePreguntasIds = [
    "primera_menstruacion",
    "ciclos_regulares",
    "duracion_ciclo",
    "ha_estado_embarazada",
    "ultimo_papanicolaou",
  ];
  ginePreguntasIds.forEach((id) => setRequired(id, isFemenino));

  if (isFemenino) {
    let edadNum = 0;
    const edadSelected = document.getElementById("edad").value;
    if (edadSelected === "otro_edad") {
      edadNum =
        parseInt(document.getElementById("edad_otro_valor").value, 10) || 0;
    } else if (edadSelected) {
      edadNum = parseInt(edadSelected, 10);
    }
    const showMastografia = edadNum > 40;
    mastografiaQuestion.classList.toggle("hidden", !showMastografia);
    setRequired("ultima_mastografia", showMastografia);
  } else {
    mastografiaQuestion.classList.add("hidden");
    setRequired("ultima_mastografia", false);
  }
}

function toggleEmbarazoDetalles(value) {
  const detallesDiv = document.getElementById("embarazo_detalles");
  const showDetalles = value === "Si";
  detallesDiv.classList.toggle("hidden", !showDetalles);
  setRequired("num_embarazos", showDetalles);
  // Validar el grupo de checkboxes de complicaciones si se muestra
}

function toggleConsumoMedicamentoDetalles(value) {
  const detallesDiv = document.getElementById("consumo_medicamento_detalles");
  const showDetalles = value === "Si";
  detallesDiv.classList.toggle("hidden", !showDetalles);
  setRequired("nombre_medicamento_prolongado", showDetalles);
}

function toggleEnfermedadDetalles(pariente, enfermedadKey, isChecked) {
  const detallesDivId = `detalles_${pariente}_${enfermedadKey
    .replace(/\s+/g, "_")
    .toLowerCase()}`;
  const detallesDiv = document.getElementById(detallesDivId);
  if (!detallesDiv) return;

  detallesDiv.classList.toggle("hidden", !isChecked);
  const inputsToRequire = [
    `edad_diag_${pariente}_${enfermedadKey}`,
    `estado_${pariente}_${enfermedadKey}`,
    `hosp_${pariente}_${enfermedadKey}`,
    `ant_fam_adic_${pariente}_${enfermedadKey}`,
    `trat_actual_${pariente}_${enfermedadKey}`,
    `controles_${pariente}_${enfermedadKey}`,
  ];
  inputsToRequire.forEach((idSuffix) => {
    const el = document.querySelector(`[name="${idSuffix}"]`);
    if (el) setRequired(el.id || el.name, isChecked); // Asumiendo que name o id son suficientes para setRequired
  });
  if (!isChecked) {
    detallesDiv.querySelectorAll("input, select").forEach((input) => {
      if (input.type === "checkbox" || input.type === "radio")
        input.checked = false;
      else input.value = "";
      input.removeAttribute("required"); // Clear required too
    });
  }
}

function toggleFumaDetalles(value) {
  const detallesDiv = document.getElementById("fuma_detalles");
  const showDetalles = value === "Si";
  detallesDiv.classList.toggle("hidden", !showDetalles);
  [
    "cantidad_tabaco_dia",
    "edad_inicio_fumar",
    "anos_fumando",
    "intento_dejar_fumar",
  ].forEach((id) => setRequired(id, showDetalles));
  // Adicionalmente, el grupo de checkboxes "productos_tabaco[]" debe tener al menos uno si showDetalles es true.
}

function toggleAlcoholDetalles(value) {
  const detallesDiv = document.getElementById("alcohol_detalles");
  const showDetalles = value === "Si";
  detallesDiv.classList.toggle("hidden", !showDetalles);
  ["frecuencia_alcohol", "cantidad_alcohol_ocasion"].forEach((name) => {
    const el = document.querySelector(`select[name="${name}"]`);
    if (el) setRequired(el.id || el.name, showDetalles);
  });
  // Grupo de checkboxes "tipo_bebidas_alcohol[]"
}

function toggleDificultadDormirDetalles(value) {
  const detallesDiv = document.getElementById("dificultad_dormir_detalles");
  const showDetalles = value === "Si";
  detallesDiv.classList.toggle("hidden", !showDetalles);
  [
    "frecuencia_dificultad_dormir",
    "tipo_dificultad_dormir",
    "medicamento_dormir",
  ].forEach((name) => {
    const el = document.querySelector(`select[name="${name}"]`);
    if (el) setRequired(el.id || el.name, showDetalles);
  });
  if (!showDetalles) {
    // Ocultar y quitar required de sub-secciones
    [
      "medicamento_dormir_nombre_div",
      "no_medicamento_dormir_div",
      "condicion_medica_sueno_cual_div",
      "no_condicion_medica_sueno_div",
      "tiempo_pantallas_div",
    ].forEach((id) => {
      document.getElementById(id).classList.add("hidden");
      document
        .getElementById(id)
        .querySelectorAll("input, select")
        .forEach((subEl) => subEl.removeAttribute("required"));
    });
  }
}

function toggleMedicamentoDormirNombre(value) {
  const nombreDiv = document.getElementById("medicamento_dormir_nombre_div");
  const noMedicamentoDiv = document.getElementById("no_medicamento_dormir_div");
  const tomaMedicamento = value === "Si";
  const noTomaMedicamento = value === "No";

  nombreDiv.classList.toggle("hidden", !tomaMedicamento);
  setRequired("medicamento_dormir_nombre", tomaMedicamento);

  noMedicamentoDiv.classList.toggle("hidden", !noTomaMedicamento);
  setRequired(
    noMedicamentoDiv.querySelector('select[name="condicion_medica_sueno"]')?.id,
    noTomaMedicamento
  );

  if (!noTomaMedicamento) {
    // Si no se selecciona "No", ocultar y quitar required de sus sub-secciones
    [
      "condicion_medica_sueno_cual_div",
      "no_condicion_medica_sueno_div",
      "tiempo_pantallas_div",
    ].forEach((id) => {
      document.getElementById(id).classList.add("hidden");
      document
        .getElementById(id)
        .querySelectorAll("input, select")
        .forEach((subEl) => subEl.removeAttribute("required"));
    });
  }
}

function toggleCondicionMedicaSuenoCual(value) {
  const cualDiv = document.getElementById("condicion_medica_sueno_cual_div");
  const noCondicionDiv = document.getElementById(
    "no_condicion_medica_sueno_div"
  );
  const tieneCondicion = value === "Si";
  const noTieneCondicion = value === "No";

  cualDiv.classList.toggle("hidden", !tieneCondicion);
  setRequired(
    cualDiv.querySelector('select[name="condicion_medica_sueno_cual_tipo"]')
      ?.id,
    tieneCondicion
  );

  noCondicionDiv.classList.toggle("hidden", !noTieneCondicion);
  setRequired(
    noCondicionDiv.querySelector('select[name="uso_pantallas_antes_dormir"]')
      ?.id,
    noTieneCondicion
  );
  // Grupo de checkboxes "consumo_antes_dormir[]"

  if (!noTieneCondicion) {
    document.getElementById("tiempo_pantallas_div").classList.add("hidden");
    setRequired(
      document.getElementById("tiempo_pantallas_div").querySelector("select")
        ?.id,
      false
    );
  }
}

function toggleTiempoPantallas(value) {
  const tiempoDiv = document.getElementById("tiempo_pantallas_div");
  const showTiempo = value === "Si";
  tiempoDiv.classList.toggle("hidden", !showTiempo);
  setRequired(
    tiempoDiv.querySelector('select[name="tiempo_promedio_pantallas"]')?.id,
    showTiempo
  );
}

function toggleActividadFisicaDetalles(value) {
  const detallesDiv = document.getElementById("actividad_fisica_detalles");
  const showDetalles = value === "Si";
  detallesDiv.classList.toggle("hidden", !showDetalles);
  [
    "frecuencia_actividad_fisica",
    "tiempo_sesion_actividad_fisica",
    "recomendacion_medica_actividad",
    "anos_actividad_fisica",
    "mejora_salud_actividad",
  ].forEach((name) => {
    const el = detallesDiv.querySelector(`select[name="${name}"]`);
    if (el) setRequired(el.id || el.name, showDetalles);
  });
  // Grupo "tipo_actividad_fisica[]"
}

function toggleEnfermedadActualDetalles(checkbox, enfermedadKey) {
  const detallesDivId = `detalles_enf_actual_${enfermedadKey}`;
  const detallesDiv = document.getElementById(detallesDivId);
  const tratamientoDiv = document.getElementById("tratamiento_enf_cronica_div");

  if (detallesDiv) {
    detallesDiv.classList.toggle("hidden", !checkbox.checked);
    setRequired(detallesDiv.querySelector("input")?.id, checkbox.checked); // Año de diagnóstico
  }

  const anyChecked = Array.from(
    document.querySelectorAll('input[name="enf_cronica_actual[]"]:checked')
  ).some((cb) => cb.value !== "Ninguna");
  tratamientoDiv.classList.toggle("hidden", !anyChecked);
  setRequired(tratamientoDiv.querySelector("select")?.id, anyChecked);
}

function toggleTransfusionAno(value) {
  const anoDiv = document.getElementById("transfusion_ano_div");
  const showAno = value === "Si";
  anoDiv.classList.toggle("hidden", !showAno);
  setRequired("transfusion_ano", showAno);
}

function toggleDrogasDetalles(value) {
  const detallesDiv = document.getElementById("drogas_detalles");
  const frecuenciaDiv = document.getElementById(
    "frecuencia_consumo_sustancias_div"
  );
  const showDetalles = value === "Si actualmente" || value === "Si pasado";

  detallesDiv.classList.toggle("hidden", !showDetalles);
  setRequired("edad_inicio_consumo_sustancias", showDetalles);
  // "tipo_sustancias[]"

  const showFrecuencia = value === "Si actualmente"; // Frecuencia sólo si consume actualmente
  frecuenciaDiv.classList.toggle("hidden", !showFrecuencia);
  setRequired(
    frecuenciaDiv.querySelector("select")?.id,
    showFrecuencia &&
      Array.from(
        document.querySelectorAll('input[name="tipo_sustancias[]"]:checked')
      ).some((cb) => cb.value !== "Ninguna")
  );

  if (!showDetalles) {
    frecuenciaDiv.classList.add("hidden");
    setRequired(frecuenciaDiv.querySelector("select")?.id, false);
  }
}

function toggleSustanciaFrecuencia(checkboxElement) {
  // Can be called without element on load/toggle
  const frecuenciaDiv = document.getElementById(
    "frecuencia_consumo_sustancias_div"
  );
  const usoDrogasSelect = document.querySelector(
    'select[name="uso_drogas"]'
  ).value;
  const anySustanciaChecked = Array.from(
    document.querySelectorAll('input[name="tipo_sustancias[]"]:checked')
  ).some((cb) => cb.value !== "Ninguna");

  const showFrecuencia =
    usoDrogasSelect === "Si actualmente" && anySustanciaChecked;
  frecuenciaDiv.classList.toggle("hidden", !showFrecuencia);
  setRequired(frecuenciaDiv.querySelector("select")?.id, showFrecuencia);
}

function toggleVidaSexualActivaDetalles(value) {
  const detallesDiv = document.getElementById("vida_sexual_activa_detalles");
  const saludSexualQuestions = document.getElementById(
    "salud_sexual_questions"
  );
  const saludSexualSkipMessage = document.getElementById(
    "salud_sexual_skip_message"
  );
  const showDetalles = value === "Si";

  detallesDiv.classList.toggle("hidden", !showDetalles);
  [
    "num_parejas_sexuales_12_meses",
    "proteccion_ets",
    "conoce_salud_sexual_pareja",
  ].forEach((name) => {
    const el = detallesDiv.querySelector(`select[name="${name}"]`);
    if (el) setRequired(el.id || el.name, showDetalles);
  });
  // "diagnostico_ets[]", "metodo_anticonceptivo[]"

  if (value === "No" || value === "Prefiero no responder") {
    saludSexualQuestions.style.display = "none";
    saludSexualSkipMessage.classList.remove("hidden");
  } else {
    saludSexualQuestions.style.display = "block";
    saludSexualSkipMessage.classList.add("hidden");
  }
}
