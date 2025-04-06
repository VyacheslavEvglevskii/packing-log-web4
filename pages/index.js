import { useState } from "react";

export default function PackingLogWeb() {
  const [employeeName, setEmployeeName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    if (!employeeName || !quantity) {
      alert("Пожалуйста, заполните все поля");
      setLoading(false);
      return;
    }

    let duration = "";
    if (startTime && endTime) {
      const [startH, startM] = startTime.split(":").map(Number);
      const [endH, endM] = endTime.split(":").map(Number);
      const start = startH * 60 + startM;
      const end = endH * 60 + endM;
      const diff = end - start;
      const h = Math.floor(diff / 60);
      const m = diff % 60;
      duration = `${h} ч ${m} мин`;
    }

    const data = {
      employeeName,
      quantity: Number(quantity),
      startTime,
      endTime,
      duration,
    };

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setSuccess(true);
        setEmployeeName("");
        setQuantity("");
        setStartTime("");
        setEndTime("");
        setDuration("");
      } else {
        alert("Ошибка при отправке данных");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка при отправке запроса");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb", padding: 20 }}>
      <div style={{ background: "white", padding: 30, borderRadius: 16, boxShadow: "0 0 10px rgba(0,0,0,0.1)", width: "100%", maxWidth: 400 }}>
        <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>📦 Учёт переупаковки</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", marginBottom: 4 }}>Имя сотрудника</label>
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder="Введите имя"
              style={{ padding: 10, width: "100%", borderRadius: 6, border: "1px solid #ccc" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: 4 }}>Количество единиц</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Например: 25"
              style={{ padding: 10, width: "100%", borderRadius: 6, border: "1px solid #ccc" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: 4 }}>Время начала (HH:MM)</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{ padding: 10, width: "100%", borderRadius: 6, border: "1px solid #ccc" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: 4 }}>Время окончания (HH:MM)</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{ padding: 10, width: "100%", borderRadius: 6, border: "1px solid #ccc" }}
            />
          </div>
          {startTime && endTime && (
            <div style={{ fontSize: 14, marginBottom: 10 }}>
              ⏱ Продолжительность: {duration || "—"}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: 12,
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: 8,
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            {loading ? "Отправка..." : "Сохранить"}
          </button>
          {success && (
            <div style={{ color: "green", fontSize: 14 }}>Запись успешно отправлена ✅</div>
          )}
        </form>
      </div>
    </div>
  );
}