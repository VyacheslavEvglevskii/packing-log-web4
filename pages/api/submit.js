export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const googleScriptUrl =
        "https://script.google.com/macros/s/AKfycbxjw4Ty-2uHmmW_dvxFbxBhEyWyT5TknHi8-qk9l66e2gOmvgzaNyqGJ5eBvk4xW7Q/exec";

      const result = await fetch(googleScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      const text = await result.text();

      return res.status(200).json({ success: true, response: text });
    } catch (error) {
      console.error("Ошибка прокси:", error);
      return res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Метод ${req.method} не поддерживается`);
}