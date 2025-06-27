'use client';
import { useAuth } from '@/contexts/AuthContext';

const AVIS = [
  {
    nom: 'Lionel G',
    titre: 'Restauration de meuble ancien',
    date: '25 juin 2025',
    note: 5,
    texte: "J'ai toujours été attaché aux objets anciens, mais je ne savais pas à qui m'adresser pour les restaurer. Le site est simple et m'a permis de contacter un ébéniste près de chez moi, sans stress."
  },
  {
    nom: 'Antoine.B',
    titre: 'Statuette d\'art',
    date: '25 juin 2025',
    note: 5,
    texte: "Je possédais une statuette Art déco en céramique ébréchée sur le socle. Grâce à l'intervention de l'artisane, elle a retrouvé tout son éclat d'origine. Travail minutieux, respectueux des matières et très documenté."
  },
  {
    nom: 'Thomas R',
    titre: 'Vase contemporain du 19e siècle',
    date: '12 juin 2025',
    note: 5,
    texte: "J'avais fait tomber un vase contemporain que j'adorais. Je pensais le jeter… et finalement, j'ai découvert cette plateforme. L'artisan céramiste a réussi à le restaurer parfaitement, et m'a même proposé une touche artistique. Je préfère presque le résultat au vase d'origine."
  },
  {
    nom: 'Collectionneur privé',
    titre: 'Assiette ancienne du 20e siècle',
    date: '12 juin 2025',
    note: 5,
    texte: "J'ai chiné une série d'assiettes anciennes, mais certaines étaient fendues. L'artisan rencontré via la plateforme a su les réparer sans trahir leur authenticité. Il m'a aussi expliqué comment mieux les entretenir. Hyper pédagogique !"
  },
  {
    nom: 'Mehdi Z',
    titre: 'Ancienne coupelle',
    date: '2 juin 2025',
    note: 5,
    texte: "Une coupelle ancienne que je sers depuis des années dans mon resto s'est cassée. Plutôt que de la jeter, je l'ai confiée à une céramiste de la plateforme. Elle l'a réparée avec soin et m'a même proposé de lui donner une touche contemporaine. Mes clients me parlent du résultat !"
  },
  {
    nom: 'Léo T',
    titre: 'Réparation d\'un mug',
    date: '30 mai 2025',
    note: 5,
    texte: "Je me suis inscrit pour tester la plateforme après avoir cassé un mug d'un artisan local que j'adore. C'est super simple : j'ai posté des photos, et en quelques jours j'avais un devis. La céramiste m'a même proposé une finition personnalisée."
  },
];

export default function AvisPage() {
  const { user } = useAuth();
  const projetsEnCours = 3;
  const demandesEnAttente = 5;
  const nbAvis = 24;

  return (
    <div className="min-h-screen bg-[#f5f3ef] py-4 md:py-8 px-2 md:px-0">
      <div className="max-w-5xl mx-auto">
        {/* HEADER + STATS */}
        <div className="bg-[#f5f3ef] rounded-t-xl md:rounded-xl md:shadow mb-6 md:mb-10 px-4 md:px-8 pt-6 md:pt-8 pb-4 md:pb-6">
          <h1 className="text-2xl md:text-4xl font-bold text-[#232d3f] mb-1 md:mb-2">Bonjour à toi, {user ? user.firstName : 'Maria'}</h1>
          <div className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">Maître Restaurateur en Céramique</div>
          {/* Stats */}
          <div className="hidden md:grid grid-cols-4 gap-6 mb-2">
            <StatCard label="Projets en cours" value={projetsEnCours} icon={<span className="text-orange-500 text-2xl ml-2">🔧</span>} />
            <StatCard label="Demandes en attente" value={demandesEnAttente} icon={<span className="text-orange-500 text-2xl ml-2">⏰</span>} />
            <StatCard label="Ce mois-ci" value="4,500 €" icon={<span className="text-orange-500 text-2xl ml-2">€</span>} />
            <StatCard label="Avis" value="4.9" icon={<span className="text-orange-500 text-2xl ml-2">★</span>} extraIcon={<span className="ml-2 text-orange-500 text-2xl">♡</span>} />
          </div>
          {/* Carrousel stats mobile */}
          <div className="flex md:hidden gap-4 overflow-x-auto pb-2 hide-scrollbar mb-2">
            <StatCardMobile label="Projets en cours" value={projetsEnCours} icon={<span className="text-orange-500 text-2xl ml-2">🔧</span>} />
            <StatCardMobile label="Demandes en attente" value={demandesEnAttente} icon={<span className="text-orange-500 text-2xl ml-2">⏰</span>} />
            <StatCardMobile label="Ce mois-ci" value="4,500 €" icon={<span className="text-orange-500 text-2xl ml-2">€</span>} />
            <StatCardMobile label="Avis" value="4.9" icon={<span className="text-orange-500 text-2xl ml-2">★</span>} extraIcon={<span className="ml-2 text-orange-500 text-2xl">♡</span>} />
          </div>
        </div>
        {/* HEADER AVIS + TRI */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-8 px-4 md:px-0">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <span className="text-orange-500 text-2xl">★</span>
            <span className="text-2xl md:text-3xl font-bold text-[#232d3f]">4.9</span>
            <span className="text-gray-400 text-lg md:text-xl">({nbAvis} Avis)</span>
          </div>
          <button className="border border-orange-500 text-orange-500 font-semibold py-2 px-6 rounded bg-white hover:bg-orange-50 transition flex items-center gap-2 self-start md:self-auto text-base md:text-lg">
            <span className="text-orange-500 text-xl">▼</span> Trier par
          </button>
        </div>
        {/* LISTE DES AVIS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-2 md:px-0">
          {AVIS.map((avis, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-4 md:p-6">
              <div className="font-semibold text-[#232d3f] text-lg mb-1">{avis.nom}</div>
              <div className="text-gray-500 text-base mb-1">{avis.titre}</div>
              <div className="flex items-center gap-2 mb-2">
                {Array.from({ length: avis.note }).map((_, i) => (
                  <span key={i} className="text-orange-500 text-lg">★</span>
                ))}
                <span className="text-gray-500 text-base ml-2">{avis.date}</span>
              </div>
              <div className="text-gray-700 mt-2 text-base">« {avis.texte} »</div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

function StatCard({ label, value, icon, extraIcon }: { label: string; value: string | number; icon: React.ReactNode; extraIcon?: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white shadow p-4 flex flex-col items-center justify-center min-w-[160px]">
      <div className="text-gray-500 text-base mb-1">{label}</div>
      <div className="flex items-center">
        <span className="text-2xl font-bold text-[#232d3f]">{value}</span>
        {icon}
        {extraIcon}
      </div>
    </div>
  );
}

function StatCardMobile({ label, value, icon, extraIcon }: { label: string; value: string | number; icon: React.ReactNode; extraIcon?: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-white shadow p-4 flex flex-col items-center justify-center min-w-[220px]">
      <div className="text-gray-500 text-base mb-1">{label}</div>
      <div className="flex items-center">
        <span className="text-2xl font-bold text-[#232d3f]">{value}</span>
        {icon}
        {extraIcon}
      </div>
    </div>
  );
} 