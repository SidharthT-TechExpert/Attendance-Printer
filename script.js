const Group_1 = [
  "Achyuth J",
  "Adarsh Babu",
  "Aifa Sana Uk",
  "Akhil Joy (Aj)",
  "Aswathy K",
  "Arun Narayan Nair",
  "Chitra Arun (RP)",
  "Christin Johny",
  "Fasalu Rahman",
  "Govind S Kumar",
  "Jagan",
  "Jasima (RP)",
  "Kadeejatu Zaiba",
  "Karthik B",
  "Krishna (RP)",
  "Midhun Manoj",
  "Neethu George",
  "Praveena E S",
  "Riyas Kv (RP)",
  "Sidharth T",
  "Thaskeem J",
  "Visal Vijayan (RP)",
];

const Group_2 = [
  "Ahammed Junaid",
  "Ajnas Muhammed",
  "Akhil",
  "Arshad M",
  "Arun M",
  "Bijo P A",
  "Gowry N",
  "Mohamed Nabeel",
  "Muhammed Shibili K",
  "Reuben Varghese",
  "Sarath A",
  "Solaman KJ",
  "Swagath TV",
  "Tijo Thomas",
  "Eid Bilal",
  "Minto Thomas",
  "Muzammil Muhammed",
  "Anuja Joy (RP)",
  "Anusha (RP)",
  "Aswathi KV (RP)",
  "Fairose (RP)",
  "Minto (RP)",
  "Mubasir (RP)",
  "Najila (RP)",
  "Nazneen (RP)",
  "Sahla (RP)",
  "Shahitha (RP)",
  "Shahna (RP)",
];

const Combined = [...Group_1, ...Group_2];
const checkboxes = document.querySelectorAll('input[name="group"]');

let rawNames;
let displayNames = [];
let status = {};
let isRP = {};
let Group = "";

// Initialize Bootstrap tooltips
document.addEventListener("DOMContentLoaded", function () {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});

checkboxes.forEach((cb) => {
  cb.addEventListener("change", function () {
    if (this.checked) {
      rawNames =
        this.value === "group1"
          ? Group_1
          : this.value === "group2"
          ? Group_2
          : Combined;

      Group =
        this.value === "group1"
          ? "Group 1"
          : this.value === "group2"
          ? "Group 2"
          : "Combined";

      displayNames = [];
      status = {};
      isRP = {};

      displayNames = rawNames
        .filter((n) => {
          if (n.includes("(RP)")) {
            const cleanName = n.replace(" (RP)", "");
            isRP[cleanName] = true;
            status[cleanName] = "RP";
            return false;
          }
          return true;
        })
        .map((n) => {
          status[n] = "present";
          return n;
        });

      renderList();

      checkboxes.forEach((other) => {
        if (other !== this) other.checked = false;
      });
    } else {
      displayNames = [];
      status = {};
      isRP = {};
      rawNames = [];
      renderList();
    }
  });
});

function renderList() {
  const listDiv = document.getElementById("list");
  listDiv.innerHTML = "";

  displayNames
    .sort((a, b) => a.localeCompare(b))
    .forEach((name) => {
      const div = document.createElement("div");
      div.className = "person" + (isRP[name] ? " rp-row" : "");
      div.innerHTML = `
      <span class="name">${name}</span>
      <div class="d-flex gap-2">
          <input name='alt' type="checkbox"  class="custom-tooltip" data-tooltip="Attending alternative CS" onchange="mark('${name}','other',this)"> 🟨
          <input name='Absent' type="checkbox" class="custom-tooltip" data-tooltip="Absent" onchange="mark('${name}','absent',this)"> ❌
     </div>
    `;
      listDiv.appendChild(div);
    });
}

function mark(name, state, checkbox) {
  const cbs = document.querySelectorAll(`.person input[onchange*="'${name}'"]`);
  cbs.forEach((cb) => {
    if (cb !== checkbox) cb.checked = false; // uncheck others
  });
  status[name] = checkbox.checked ? state : "present";
  updateNameColors();
}

function updateNameColors() {
  document.querySelectorAll(".person").forEach((row) => {
    const altChecked = row.querySelector('input[name="alt"]').checked;
    const absentChecked = row.querySelector('input[name="Absent"]').checked;
    const nameSpan = row.querySelector(".name");

    if (nameSpan) {
      // Reset styles first
      nameSpan.style.color = "";
      nameSpan.style.fontWeight = "bold";
      nameSpan.style.textShadow = "";

      if (altChecked) {
        nameSpan.style.color = "var(--bs-warning)"; // yellow
        nameSpan.style.fontWeight = "bold";
        nameSpan.style.textShadow = "1px 1px 2px red";
      } else if (absentChecked) {
        nameSpan.style.color = "var(--bs-danger)"; // red
        nameSpan.style.fontWeight = "bold";
        nameSpan.style.textShadow = "1px 1px 2px darkred";
      }
    }
  });
}

function generateOutput() {
  const Mean = "📒 COMMUNICATION SESSION REPORT";
  const Batch = " BCR71";
  const date = formatDate(new Date());
  const GroupName = Group;
  const Time = " 11:30Am - 12:30Pm";
  const Coordinators =
    Group === "Group 1"
      ? " Arun Narayan Nair & Jagan"
      : Group === "Group 2"
      ? " Muhammed Shibili K & Ajnas Muhammed"
      : " Arun Narayan Nair & Muhammed Shibili K $ Ajnas Muhammed";
  const Trainer = " Afzal Nazar";
  const Duck = "🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷";

  const Detalis = `${Duck}\n${Mean} \n🎓 Batch :${Batch} ${GroupName} \n📅 Date :${date}\n⏰ Time :${Time} \n👨🏻‍🏫 Trainer :${Trainer}\n👫 Coordinators :${Coordinators}\n${Duck}\n\n`;
  const Report = "♻ Session Overview:\n";

  let count = 1;
  const presentees =
    `\n\n🟩 Presentees\n\n` +
    Object.keys(status)
      .filter((n) => status[n] === "present")
      .sort((a, b) => a.localeCompare(b))
      .map((n) => `✅ ${n}`)
      .join("\n");

  count = 1;
  let other =
    "\n\n🟨 Attending alternative cs\n\n" +
    Object.keys(status)
      .filter((n) => status[n] === "other")
      .sort((a, b) => a.localeCompare(b))
      .map((n) => `${count++}. ${n}`)
      .join("\n");
  other = count === 1 ? "" : other;

  count = 1;
  let absentees =
    "\n\n❌ Absentees ❌\n\n" +
    Object.keys(status)
      .filter((n) => status[n] === "absent")
      .sort((a, b) => a.localeCompare(b))
      .map((n) => `${count++}. ${n}`)
      .join("\n");
  absentees = count === 1 ? "" : absentees;

  count = 1;
  let RP =
    "\n\n🔃 Refresh Period 🔃\n\n" +
    Object.keys(status)
      .filter((n) => status[n] === "RP")
      .sort((a, b) => a.localeCompare(b))
      .map((n) => `${count++}. ${n}`)
      .join("\n");
  RP = count === 1 ? "" : RP;

  const link = `\n\n🔗 Link: \n   Tldv:\n   Meet list:\n\n ✍ Report By : `;

  // FINAL OUTPUT
  const finalText =
    Detalis + Report + presentees + other + absentees + RP + link;

  // Show in view mode
  document.getElementById("outputView").textContent = finalText;

  // Keep edit mode synced
  document.getElementById("outputEdit").value = finalText;
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function copyOutput() {
  const viewMode = document.getElementById("outputView");
  const editMode = document.getElementById("outputEdit");
  const copyBtn = document.querySelector(".copy-btn");

  // Get text from whichever mode is visible
  const textToCopy =
    editMode.style.display === "block" ? editMode.value : viewMode.textContent;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      copyBtn.innerText = "✅ Copied!";
      setTimeout(() => (copyBtn.innerText = "📋 Copy"), 2000);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

let editingMode = false;

function toggleEdit() {
  const outputView = document.getElementById("outputView");
  const outputEdit = document.getElementById("outputEdit");
  const editBtn = document.getElementById("editBtn");
  const toolbar = document.getElementById("outputToolbar");

  if (!editingMode) {
    const toolbar = document.querySelector(".output-toolbar");
    const header = document.querySelector("header");
    toolbar.style.top = `${header.offsetHeight}px`;

    editingMode = true;
    document.getElementById("list").style.display = "none";
    toolbar.classList.add("fullscreen");

    outputEdit.style.display = "block";
    outputEdit.classList.add("edit-fullscreen");
    outputView.style.display = "none";

    editBtn.textContent = "💾 Save";
    outputEdit.focus();
  } else {
    editingMode = false;
    outputView.textContent = outputEdit.value;

    outputEdit.style.display = "none";
    outputEdit.classList.remove("edit-fullscreen");
    outputView.style.display = "block";

    toolbar.classList.remove("fullscreen");
    editBtn.textContent = "✏️ Edit";

    document.getElementById("list").style.display = "block";
    renderList();
  }
}

function closeOutput() {
  document.getElementById("outputView").textContent = "";
  document.getElementById("outputEdit").value = "";
}

document.getElementById("currentDate").innerText = formatDate(new Date());
