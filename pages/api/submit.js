export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const googleScriptUrl =
        "https://script.google.com/macros/s/AKfycbxjw4Ty-2uHmmW_dvxFbxBhEyWyT5TknHi8-qk9l66e2gOmvgzaNyqGJ5eBvk4xW7Q/exec";

      const params = new URLSearchParams();
      params.append("employeeName", req.body.employeeName || "");
      params.append("quantity", req.body.quantity || "");
      params.append("startTime", req.body.startTime || "");
      params.append("endTime", req.body.endTime || "");
      params.append("duration", req.body.duration || "");

      const result = await fetch(googleScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const text = await result.text();
      return res.status(200).json({ success: true, response: text });
    } catch (error) {
      return res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Метод ${req.method} не поддерживается`);
}
