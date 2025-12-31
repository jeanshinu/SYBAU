const TIME_KEY = "saved_date_time";

document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll('input[type="checkbox"][data-key]');

    boxes.forEach(box => {
        const saved = localStorage.getItem(box.dataset.key);
        box.checked = saved === "true";

        box.addEventListener("change", () => {
            localStorage.setItem(box.dataset.key, box.checked);
        });
    });

    const savedTime = localStorage.getItem(TIME_KEY);
    if (savedTime) {
        document.getElementById("tz").innerHTML = savedTime;
    } else {
        const defaultTime = "30/12/2025 12:36:08 PM";
        localStorage.setItem(TIME_KEY, defaultTime);
        document.getElementById("tz").textContent = defaultTime;
    }
});

function myFunction() {
    if (!confirm("Are you sure you want to Reset?")) return;

    const boxes = document.querySelectorAll('input[type="checkbox"][data-key]');
    boxes.forEach(box => {
        box.checked = false;
        localStorage.removeItem(box.dataset.key);
    });

    saveCurrentTime();
}

function saveCurrentTime() {
    const tz = "Asia/Bangkok";
    const now = new Date();
    const local = new Date(now.toLocaleString("en-US", { timeZone: tz }));

    const dd = String(local.getDate()).padStart(2, '0');
    const mm = String(local.getMonth() + 1).padStart(2, '0');
    const yyyy = local.getFullYear();

    let hh = local.getHours();
    const min = String(local.getMinutes()).padStart(2, '0');
    const ss = String(local.getSeconds()).padStart(2, '0');

    const ampm = hh >= 12 ? 'PM' : 'AM';
    hh = hh % 12 || 12;
    hh = String(hh).padStart(2, '0');

    const dateStr = `${dd}/${mm}/${yyyy}`;
    const timeStr = `${hh}:${min}:${ss} ${ampm}`;

    const finalTime = `<span class="date">${dateStr}</span>
                       <span class="time">${timeStr}</span>`;

    localStorage.setItem(TIME_KEY, finalTime);
    document.getElementById("tz").innerHTML = finalTime;
}
