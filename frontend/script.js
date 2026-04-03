console.log("JS LOADED NEW");

document.addEventListener("DOMContentLoaded", function () {

  console.log("DOM READY");

  // ─── SCROLL ANIMATION ─────────────────────────
  const sections = document.querySelectorAll("section");

  function revealSections() {
    sections.forEach((sec) => {
      const top = sec.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        sec.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealSections);
  revealSections();


  // ─── TRAVEL FORM ─────────────────────────────
  const travelForm = document.getElementById("travelForm");

  if (travelForm) {
    travelForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      console.log("Travel form submitted");

      const data = {
        name: document.getElementById("tname").value,
        phone: document.getElementById("tphone").value,
        date: document.getElementById("tdate").value,
        passengers: document.getElementById("passengers").value,
        service: document.getElementById("tservice").value,
        details: document.getElementById("tdetails").value
      };

      try {
        console.log("Sending request...");
        const res = await fetch("https://full-stack-project-x16t.onrender.com/api/travel",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        });

        const result = await res.json();
        alert(result.message);

      } catch (error) {
        console.error(error);
        alert("Travel API failed ❌");
      }
    });
  }


  // ─── PACK FORM ───────────────────────────────
  const packForm = document.getElementById("packForm");

  if (packForm) {
    packForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      console.log("Pack form submitted");

      const data = {
        name: document.getElementById("pname").value,
        phone: document.getElementById("pphone").value,
        date: document.getElementById("pdate").value,
        pickup: document.getElementById("pickup").value,
        drop: document.getElementById("drop").value,
        truck: document.getElementById("truck").value
      };

      try {
        const res = await fetch("https://full-stack-project-x16t.onrender.com/api/pack",{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        const result = await res.json();
        alert(result.message);

      } catch (error) {
        console.error(error);
        alert("Pack API failed ❌");
      }
    });
  }

});
