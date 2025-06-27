"use client";

import { useState } from "react";

// Pour l'exemple, on simule le rôle ici
const isArtisan = true; // Passe à false pour voir la version particulier

// Données brutes exemple
const artisanStats = [
  { label: "Projets en cours", value: 3, icon: "🔗" },
  { label: "Demandes en attente", value: 5, icon: "⏰" },
  { label: "Ce mois-ci", value: "4,500 €", icon: "💶" },
  { label: "Avis", value: "4.9", icon: "⭐" },
];

const conversationsArtisan = [
  {
    name: "Camille Lemoine",
    last: "Merci pour le devis détaillé. Quand pouvons-nous commencer ?",
    time: "Il y a 1 jour",
    unread: false,
  },
  {
    name: "Fondation La Vigie",
    last: "Pourriez-vous fournir une mise à jour sur la restauration du vase ?",
    time: "Il y a 2 heures",
    unread: true,
  },
  {
    name: "Musée de la Mémoire",
    last: "Le plat sera prêt d'ici 3 jours.",
    time: "Il y a 1 jour",
    unread: false,
  },
  {
    name: "Sarah Zemsta",
    last: "Merci pour la réparation de mon buste",
    time: "Il y a 1 jour",
    unread: false,
  },
  {
    name: "Bénédicte Moreau",
    last: "Pouvez-vous m'envoyer des photos de l'avancer de la reparation du vase ?",
    time: "Il y a 2 jour",
    unread: false,
  },
];

const messagesArtisan = [
  {
    fromMe: false,
    text: "Pourriez-vous fournir une mise à jour sur la restauration du vase ?",
    time: "Il y a 2 heures",
  },
  {
    fromMe: true,
    text: "Je travaille maintenant sur l'ajustement des couleurs pour les parties manquantes.",
    time: "Il y a 1 heure",
  },
  {
    fromMe: false,
    text: "Pourriez-vous fournir une mise à jour sur la restauration du vase ?",
    time: "Il y a 2 heures",
  },
  {
    fromMe: true,
    text: "La restauration progresse bien. J'ai terminé les réparations des fissures.",
    time: "Il y a 1 heure",
  },
];

const conversationsParticulier = [
  {
    name: "Maria C",
    last: "Normalement, il n'y aura pas de retard :) ",
    time: "Il y a 2 heures",
    unread: true,
  },
  {
    name: "Sarah Johnson",
    last: "Voici mon devis",
    time: "Il y a 1 jour",
    unread: false,
  },
  {
    name: "Daniel R",
    last: "Ce fut un plaisir de travailler avec vous !",
    time: "Il y a 1 jour",
    unread: false,
  },
  {
    name: "Xavier P",
    last: "Merci pour votre confiance !",
    time: "Il y a 2 semaines",
    unread: false,
  },
  {
    name: "Léo Thomas",
    last: "Comme convenu voici le devis !",
    time: "Il y a 3 semaines",
    unread: false,
  },
  {
    name: "Thomas Quiers",
    last: "Comme convenu voici le devis !",
    time: "Il y a 3 semaines",
    unread: false,
  },
];

const messagesParticulier = [
  {
    fromMe: false,
    text: "La restauration progresse bien. J'ai terminé les réparations des fissures et je travaille maintenant sur l'ajustement des couleurs pour les parties manquantes.",
    time: "Il y a 2 heures",
  },
  {
    fromMe: true,
    text: "Bonjour Maria, pourriez-vous nous tenir informés de l'état d'avancement concernant le vase en porcelaine ? Merci par avance.",
    time: "Il y a 1 heure",
  },
  {
    fromMe: true,
    text: "Super ! Pouvez- vous me dire si le vase sera prêt à temps ?",
    time: "Il y a 35 minutes",
  },
  {
    fromMe: false,
    text: "Normalement, il n'y aura pas de retard :) ",
    time: "Il y a 50 minutes",
  },
];

export default function MessagesPage() {
  const [selectedConv, setSelectedConv] = useState(0);
  const conversations = isArtisan ? conversationsArtisan : conversationsParticulier;
  const messages = isArtisan ? messagesArtisan : messagesParticulier;

  return (
    <div className="min-h-screen bg-[#faf8f6] p-0 sm:p-6">
      {/* Header stats pour artisan */}
      {isArtisan && (
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-[#23272e] mb-1">Bonjour Maria ! <span className="inline-block">👋</span></h1>
            <div className="text-[#8b8b8b] text-base">Maître Restaurateur en Céramique</div>
          </div>
          <div className="flex flex-1 justify-end gap-4 flex-wrap">
            {artisanStats.map((stat, i) => (
              <div key={i} className="bg-white rounded-lg shadow px-6 py-3 flex flex-col items-center min-w-[120px]">
                <div className="text-xs text-[#8b8b8b] mb-1 flex items-center gap-1">{stat.label}</div>
                <div className="text-xl font-bold text-[#23272e] flex items-center gap-1">{stat.value} {stat.icon}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Conversations */}
        <div className="bg-white rounded-lg shadow p-4 w-full sm:w-[340px] flex-shrink-0">
          <h2 className="text-lg font-semibold mb-4 text-[#23272e]">Conversations</h2>
          <div>
            {conversations.map((conv, i) => (
              <div
                key={i}
                onClick={() => setSelectedConv(i)}
                className={`p-3 rounded-lg mb-2 cursor-pointer transition border ${selectedConv === i ? 'bg-[#f5f3f0] border-[#e0d8d0]' : 'bg-white border-transparent'} flex flex-col relative`}
              >
                <span className="font-semibold text-[#23272e] text-sm">{conv.name}</span>
                <span className="text-xs text-[#8b8b8b] truncate">{conv.last}</span>
                <span className="text-[10px] text-[#b0b0b0] mt-1">{conv.time}</span>
                {conv.unread && <span className="absolute top-3 right-3 w-2 h-2 bg-orange-500 rounded-full" />}
              </div>
            ))}
          </div>
        </div>

        {/* Discussion */}
        <div className="bg-white rounded-lg shadow p-4 flex-1 min-h-[400px] flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-[#23272e]">
            {isArtisan ? conversationsArtisan[selectedConv].name : conversationsParticulier[selectedConv].name}
          </h2>
          <div className="flex-1 flex flex-col gap-4 mb-4 overflow-y-auto max-h-[350px]">
            {(isArtisan ? messagesArtisan : messagesParticulier).map((msg, i) => (
              <div
                key={i}
                className={`max-w-[70%] rounded-lg px-4 py-3 text-sm shadow-sm ${msg.fromMe ? 'bg-orange-500 text-white self-end' : 'bg-[#f5f3f0] text-[#23272e] self-start'}`}
              >
                <div>{msg.text}</div>
                <div className="text-xs mt-1 opacity-70">{msg.time}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-auto">
            <input
              type="text"
              placeholder="Tapez votre message..."
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              disabled
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-medium opacity-60 cursor-not-allowed" disabled>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 