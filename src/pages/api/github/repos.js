export default async function handler(req, res) {
  try {
    // Buraya göstermek istediğin proje isimlerini yaz
    const featuredRepos = [
      "nextjs-tabu-dini", // Örnek: portfolio projen
      // "proje-adi-2", // İkinci projen
      // "proje-adi-3", // Üçüncü projen
    ];

    const username = "wtflewis"; // GitHub kullanıcı adın
    
    // Tüm repoları çek
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Authorization: process.env.GITHUB_TOKEN ? `Bearer ${process.env.GITHUB_TOKEN}` : "",
        },
      }
    );

    if (!response.ok) {
      throw new Error("GitHub API error");
    }

    const repos = await response.json();

    // Sadece featured repoları filtrele
    const formattedRepos = repos
      .filter((repo) => featuredRepos.includes(repo.name))
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "Proje açıklaması yok",
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        topics: repo.topics || [],
        updated: repo.updated_at,
      }))
      // Featured listesindeki sıraya göre sırala
      .sort((a, b) => featuredRepos.indexOf(a.name) - featuredRepos.indexOf(b.name));

    res.status(200).json(formattedRepos);
  } catch (error) {
    console.error("GitHub API Error:", error);
    res.status(500).json({ error: "Failed to fetch repos" });
  }
}
