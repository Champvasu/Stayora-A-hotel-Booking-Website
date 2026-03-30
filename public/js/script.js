// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      form.classList.add('was-validated')
      
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
    }, false)
  })
})()

const input = document.getElementById("searchInput");
const box = document.getElementById("suggestionsBox");

let timeout;

input.addEventListener("input", () => {
  clearTimeout(timeout);

  timeout = setTimeout(async () => {
    const query = input.value.trim();

    if (!query) {
      box.innerHTML = "";
      return;
    }

    const res = await fetch(`/listings/suggestions?query=${query}`);
    const data = await res.json();

    box.innerHTML = "";

    data.forEach(location => {
      const div = document.createElement("a");
      div.classList.add("list-group-item", "list-group-item-action");
      div.textContent = location;

      div.addEventListener("click", () => {
        input.value = location;
        box.innerHTML = "";
        input.form.submit(); // 🔥 auto search
      });

      box.appendChild(div);
    });

  }, 300); // debounce
});