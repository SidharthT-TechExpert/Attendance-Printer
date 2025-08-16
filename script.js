const Group_1 = [
  "Achyuth J",
  "Adarsh Babu",
  "Aifa Sana Uk",
  "Akhil Joy (Aj)",
  "Aswathy K (RP)",
  "Arun Narayan Nair (C)",
  "Chitra Arun (RP)",
  "Christin Johny",
  "Fasalu Rahman",
  "Govind S Kumar",
  "Jagan (C)",
  "Jasima (RP)",
  "Kadeejatu Zaiba",
  "Karthik B",
  "Krishna (RP)",
  "Midhun Manoj (RP)",
  "Neethu George",
  "Praveena E S",
  "Riyas Kv (RP)",
  "Sidharth T",
  "Thaskeem J",
  "Visal Vijayan (RP)",
];

const Group_2 = [
  "Ahammed Junaid",
  "Ajnas Muhammed (C)",
  "Akhil",
  "Arshad Chappangan",
  "Bijo P A",
  "Gowry N",
  "Mohamed Nabeel",
  "Muhammed Shibili K (C)",
  "Reuben Varghese",
  "Sarath A",
  "Juvek Swamiji (RP)",
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
let attendanceStatus = {};
let isRP = {};
let Coordinators = {};
let Group = "";

// Initialize Bootstrap tooltips
document.addEventListener("DOMContentLoaded", function () {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  const currentDate = document.getElementById("currentDate");
  currentDate.textContent = formatDate(new Date());
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
      attendanceStatus = {};
      isRP = {};

      displayNames = rawNames
        .filter((n) => {
          if (n.includes("(RP)")) {
            const cleanName = n.replace(" (RP)", "");
            attendanceStatus[cleanName] = "RP";
            return false;
          } else if (n.includes("(C)")) {
            const cleanName = n.replace(" (C)", "");
            attendanceStatus[cleanName] = "C";
            return true;
          }
          return true;
        })
        .map((n) => {
          if (n.includes("(C)")) {
            return n.replace("(C)", "");
          }
          attendanceStatus[n] = "present";
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
  // Clear previous list
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
  attendanceStatus[name] = checkbox.checked ? state : "present";
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
  const time = document.getElementById("time").value.trim();
  const Mean = "📒 COMMUNICATION SESSION REPORT";
  const Batch = " BCR71";
  const date = formatDate(new Date());
  const GroupName = Group;
  const Time = time;

  let Coordinators =
    Group === "Group 1"
      ? Group_1.filter((n) => n.includes("(C)"))
          .map((n) => n.replace(" (C)", ""))
          .join(" & ")
      : Group === "Group 2"
      ? Group_2.filter((n) => n.includes("(C)"))
          .map((n) => n.replace(" (C)", ""))
          .join(" & ")
      : null;
  if (Coordinators === null) {
    let combined = Combined.filter((n) => n.includes("(C)")).map((n) =>
      n.replace(" (C)", "")
    );
    Coordinators = "";
    combined.forEach((n, i) => {
      if (i === combined.length - 2) {
        Coordinators += " - Grp_1 \n👫 Coordinators : " + n + " & ";
      } else if (i === 0) {
        Coordinators += n + " & ";
      } else if (i === combined.length - 1) {
        Coordinators += n + " - Grp_2 ";
      } else {
        Coordinators += n;
      }
    });
  }
  const Trainer = " Afzal Nazar";
  const Duck = "🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷🔷";
  const tldv = document.getElementById("tldv").value.trim();
  const meetList = document.getElementById("meetlist").value.trim();
  const tldvLink = tldv ? `Tldv: ${tldv}` : "Tldv: Not provided";
  const meetListLink = meetList
    ? `Meet list: ${meetList}`
    : "Meet list: Not provided";
  const reportBy = document.getElementById("reportBy").value.trim();
  const reportByText = document.getElementById("over").value.trim();
  let OtherBatch = document.getElementById("Batch").value.trim().split(",");

  // Prepare the details section

  const Detalis = `${Duck}\n${Mean} \n🎓 Batch :${Batch} ${GroupName} \n📅 Date :${date}\n⏰ Time :${Time} \n👨🏻‍🏫 Trainer :${Trainer}\n👫 Coordinators : ${Coordinators}\n${Duck}\n\n`;
  const Report = `♻ Session Overview:\n           ${reportByText}`;

  let count = Object.keys(attendanceStatus).filter(
    (n) => attendanceStatus[n] === "present"
  ).length;

  let presentees =
    `\n\n🟩 Presentees (${count}) :\n\n` +
    Object.keys(attendanceStatus)
      .filter((n) => attendanceStatus[n] === "present")
      .sort((a, b) => a.localeCompare(b))
      .map((n) => `✅ ${n} `)
      .join("\n");
  presentees = count === 0 ? "" : presentees;

  count = Object.keys(attendanceStatus).filter(
    (n) => attendanceStatus[n] === "other"
  ).length;

  let alternative =
    `\n\n🟨 Alternative Session (${count}):\n\n` +
    Object.keys(attendanceStatus)
      .filter((n) => attendanceStatus[n] === "other")
      .sort((a, b) => a.localeCompare(b))
      .map((n) => `☑️ ${n} `)
      .join("\n");
  alternative = count === 0 ? "" : alternative;

  count = 0
  count = OtherBatch.length;
  let OtherBatchs =
    `\n\n🤩 Other Batchs (${count}):\n\n` +
    OtherBatch.sort((a, b) => a.localeCompare(b))
      .map((n) => `✨ ${n} `)
      .join("\n");
     
      
  OtherBatchs = OtherBatch[0] === '' ? "" : OtherBatchs;

  count = Object.keys(attendanceStatus).filter(
    (n) => attendanceStatus[n] === "absent"
  ).length;

  let absentees =
    `\n\n❌ Absentees (${count}) :\n\n` +
    Object.keys(attendanceStatus)
      .filter((n) => attendanceStatus[n] === "absent")
      .sort((a, b) => a.localeCompare(b))
      .map((n) => `❌ ${n} `)
      .join("\n");
  absentees = count === 0 ? "" : absentees;

  count = Object.keys(attendanceStatus).filter(
    (n) => attendanceStatus[n] === "RP"
  ).length;

  let RP =
    `\n\n🔃 Refresh Period (${count}) :\n\n` +
    Object.keys(attendanceStatus)
      .filter((n) => attendanceStatus[n] === "RP")
      .sort((a, b) => a.localeCompare(b))
      .map((n) => `🔃 ${n} `)
      .join("\n");
  RP = count === 0 ? "" : RP;

  const link = `\n\n🔗 Link: \n\n      ${tldvLink}\n      ${meetListLink}\n\n ✍ Report By : ${reportBy}`;

  // FINAL OUTPUT
  const finalText =
    Detalis +
    Report +
    presentees +
    alternative +
    OtherBatchs +
    absentees +
    RP +
    link;

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

  if (viewMode.textContent === "")
    return Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Please generate the report first!",
    });
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
  const header = document.querySelector("header");

  if (outputView.textContent === "")
    return Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Please generate the report first!",
    });
  // Set toolbar position
  toolbar.style.top = `${header.offsetHeight}px`;

  // Remove leftover animation classes
  outputView.classList.remove("slide-in", "slide-out");
  outputEdit.classList.remove("slide-in", "slide-out");

  if (!editingMode) {
    // --- ENTER EDIT MODE ---
    editingMode = true;
    document.getElementById("list").style.display = "none";
    toolbar.classList.add("fullscreen");

    // Animate view out
    outputView.classList.add("slide-out");
    setTimeout(() => {
      outputView.style.display = "none";

      // Animate editor in
      outputEdit.style.display = "block";
      outputEdit.classList.add("edit-fullscreen", "slide-in");

      // Keep content synced
      outputEdit.value = outputView.textContent;

      editBtn.textContent = "💾 Save";
      outputEdit.focus();
    }, 400);
  } else {
    // --- SAVE AND EXIT EDIT MODE ---
    editingMode = false;

    // Save edited content
    outputView.textContent = outputEdit.value;

    // Animate editor out
    outputEdit.classList.remove("slide-in");
    outputEdit.classList.add("slide-out");
    setTimeout(() => {
      outputEdit.style.display = "none";

      // Animate view in
      outputView.style.display = "block";
      outputView.classList.add("slide-in");

      toolbar.classList.remove("fullscreen");
      editBtn.textContent = "✏️ Edit";

      document.getElementById("list").style.display = "block";
    }, 400);
  }
}
