export default function BlogPage() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <article className="mb-8 p-6 rounded-lg shadow bg-white">
        <h2 className="text-2xl font-semibold mb-2">Exemple d'article de blog</h2>
        <p className="text-gray-500 text-sm mb-4">Publié le 10 juin 2024 par Matteo</p>
        <p>
          Ceci est un exemple d'article de blog. Tu peux modifier ce texte pour tester le design de ta page,
          ajouter des images, des titres, des listes, etc. <br />
          <br />
          <strong>Astuce :</strong> Utilise Tailwind CSS pour styliser rapidement tes composants !
        </p>
      </article>
    </main>
  );
} 