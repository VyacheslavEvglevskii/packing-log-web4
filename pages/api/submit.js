export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const googleScriptUrl =
        "https://script.google.com/macros/s/AKfycbwmudQ2mYROwNMP6anH18K2gOtWcrYxWhvQGLOsR3x3evru8CeH_qiHGVvxLIe8O8Nh/exec";

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
      return res.status(500).json({ success: false, error: "Ошибка сервера" });
    }
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Метод ${req.method} не поддерживается`);
}
