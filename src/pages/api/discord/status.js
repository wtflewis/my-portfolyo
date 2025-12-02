// Discord veya başka bir servisten status çek
// Şimdilik mock data döndürüyor, gerçek API'yi bağlayabilirsin

export default async function handler(req, res) {
  try {
    // Buraya Discord Lanyard API'sini bağlayabilirsin
    // https://api.lanyard.rest/v1/users/YOUR_DISCORD_ID
    
    // Örnek: Saate göre otomatik status
    const hour = new Date().getHours();
    let status = "online";
    
    if (hour >= 0 && hour < 8) {
      status = "offline"; // Gece uyuyor
    } else if (hour >= 8 && hour < 22) {
      status = "online"; // Gündüz aktif
    } else {
      status = "idle"; // Akşam boşta
    }

    // Gerçek Discord API kullanmak istersen:
    /*
    const DISCORD_ID = "YOUR_DISCORD_ID";
    const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
    const data = await response.json();
    
    res.status(200).json({
      status: data.data.discord_status,
      activities: data.data.activities,
    });
    */

    res.status(200).json({
      status: status,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Status API Error:", error);
    res.status(200).json({ status: "online" }); // Fallback
  }
}
