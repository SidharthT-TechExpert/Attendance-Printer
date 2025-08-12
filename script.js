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
  "Muhammed Shibili.k",
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
          <input type="checkbox" class="custom-tooltip" data-tooltip="Attending alternative CS" onchange="mark('${name}','other',this)"> 🟨
          <input type="checkbox" class="custom-tooltip" data-tooltip="Absent" onchange="mark('${name}','absent',this)"> ❌
     </div>
    `;
      listDiv.appendChild(div);
    });
}

function mark(name, state, checkbox) {
  const cbs = document.querySelectorAll(`.person input[onchange*="'${name}'"]`);
  cbs.forEach((cb) => {
    if (cb !== checkbox) cb.checked = false;
  });
  status[name] = checkbox.checked ? state : "present";
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

  const presentees =
    `\n\n🟩 Presentees\n\n` +
    Object.keys(status)
      .filter((n) => status[n] === "present")
      .map((n) => `✅ ${n}`)
      .join("\n");

  const other =
    "\n\n🟨 Attending alternative cs\n\n" +
    Object.keys(status)
      .filter((n) => status[n] === "other")
      .map((n) => `☑️ ${n}`)
      .join("\n");

  let count = 1;
  const absentees =
    "\n\n❌ Absentees ❌\n\n" +
    Object.keys(status)
      .filter((n) => status[n] === "absent")
      .map((n) => `${count++}. ${n}`)
      .join("\n");

  count = 1;
  const RP =
    "\n\n🔃 Refresh Period 🔃\n\n" +
    Object.keys(status)
      .filter((n) => status[n] === "RP")
      .map((n) => `${count++}. ${n}`)
      .join("\n");

  const link = `\n\n🔗 Link: \n   Tldv:\n   Meet list:\n\n ✍ Report By : `;

  document.getElementById("output").value =
    Detalis + Report + presentees + other + absentees + RP + link;
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

function copyOutput() {
  const output = document.getElementById("output");
  navigator.clipboard
    .writeText(output.value)
    .then(() => {
      const btn = document.querySelector(".copy-btn");
      btn.innerText = "✅ Copied!";
      setTimeout(() => (btn.innerText = "📋 Copy"), 2000);
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}

document.getElementById("currentDate").innerText = formatDate(new Date());
