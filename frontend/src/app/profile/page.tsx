'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  metier: string;
  competences: string[];
  isArtisan: boolean;
  // Nouveaux champs pour Artisan
  siret: string;
  adresse: string;
  codePostal: string;
  ville: string;
  description: string;
  tarifHoraire: string;
  // Nouveaux champs pour Particulier
  dateNaissance: string;
  genre: string;
  adresseParticulier: string;
  codePostalParticulier: string;
  villeParticulier: string;
}

const METIERS = [
  'Ébéniste',
  'Joaillier',
  'Métallurgie',
  'Serrurier',
  'Plombier',
  'Électricien',
  'Maçon',
  'Carreleur',
  'Peintre',
  'Menuisier',
  'Charpentier',
  'Couturier',
  'Tapissier',
  'Céramiste',
  'Souffleur de verre',
  'Forgeron',
  'Sculpteur',
  'Doreur',
  'Maroquinier',
  'Autre'
];

const GENRES = [
  'Homme',
  'Femme',
  'Non-binaire',
  'Préfère ne pas préciser'
];

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    metier: '',
    competences: [],
    isArtisan: false,
    // Champs Artisan
    siret: '',
    adresse: '',
    codePostal: '',
    ville: '',
    description: '',
    tarifHoraire: '',
    // Champs Particulier
    dateNaissance: '',
    genre: '',
    adresseParticulier: '',
    codePostalParticulier: '',
    villeParticulier: '',
  });
  const [newCompetence, setNewCompetence] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      console.log('User récupéré du backend :', user);
      setProfile({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        metier: user.metier || '',
        competences: user.competences || [],
        isArtisan: user.isArtisan ?? false,
        // Champs Artisan
        siret: user.siret || '',
        adresse: user.adresse || '',
        codePostal: user.codePostal || '',
        ville: user.ville || '',
        description: user.description || '',
        tarifHoraire: user.tarifHoraire || '',
        // Champs Particulier
        dateNaissance: user.dateNaissance || '',
        genre: user.genre || '',
        adresseParticulier: user.adresseParticulier || '',
        codePostalParticulier: user.codePostalParticulier || '',
        villeParticulier: user.villeParticulier || '',
      });
    } else {
      console.log('Aucun user trouvé');
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAddCompetence = () => {
    if (newCompetence.trim() && !profile.competences.includes(newCompetence.trim())) {
      setProfile(prev => ({
        ...prev,
        competences: [...prev.competences, newCompetence.trim()]
      }));
      setNewCompetence('');
    }
  };

  const handleRemoveCompetence = (competence: string) => {
    setProfile(prev => ({
      ...prev,
      competences: prev.competences.filter(c => c !== competence)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await updateUser(profile);
      setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour du profil.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Mode {profile.isArtisan ? 'Artisan' : 'Particulier'}
                </p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-[#ED6A2C] hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                {isEditing ? 'Annuler' : 'Modifier'}
              </button>
            </div>

            {message.text && (
              <div className={`mb-4 p-4 rounded-md ${
                message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section Informations personnelles */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      Prénom
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={profile.firstName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={profile.lastName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black disabled:bg-gray-100"
                    />
                  </div>

                  {/* Champs spécifiques au Particulier */}
                  {!profile.isArtisan && (
                    <>
                      <div>
                        <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700">
                          Date de naissance
                        </label>
                        <input
                          type="date"
                          name="dateNaissance"
                          id="dateNaissance"
                          value={profile.dateNaissance}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black disabled:bg-gray-100"
                        />
                      </div>

                      <div>
                        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                          Genre
                        </label>
                        <select
                          name="genre"
                          id="genre"
                          value={profile.genre}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black disabled:bg-gray-100"
                        >
                          <option value="">Sélectionnez un genre</option>
                          {GENRES.map((genre) => (
                            <option key={genre} value={genre}>
                              {genre}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Section Adresse */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Adresse</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor={profile.isArtisan ? "adresse" : "adresseParticulier"} className="block text-sm font-medium text-gray-700">
                      Adresse
                    </label>
                    <input
                      type="text"
                      name={profile.isArtisan ? "adresse" : "adresseParticulier"}
                      id={profile.isArtisan ? "adresse" : "adresseParticulier"}
                      value={profile.isArtisan ? profile.adresse : profile.adresseParticulier}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="123 Rue de la Paix"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label htmlFor={profile.isArtisan ? "codePostal" : "codePostalParticulier"} className="block text-sm font-medium text-gray-700">
                      Code postal
                    </label>
                    <input
                      type="text"
                      name={profile.isArtisan ? "codePostal" : "codePostalParticulier"}
                      id={profile.isArtisan ? "codePostal" : "codePostalParticulier"}
                      value={profile.isArtisan ? profile.codePostal : profile.codePostalParticulier}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="75001"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label htmlFor={profile.isArtisan ? "ville" : "villeParticulier"} className="block text-sm font-medium text-gray-700">
                      Ville
                    </label>
                    <input
                      type="text"
                      name={profile.isArtisan ? "ville" : "villeParticulier"}
                      id={profile.isArtisan ? "ville" : "villeParticulier"}
                      value={profile.isArtisan ? profile.ville : profile.villeParticulier}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Paris"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Section spécifique à l'Artisan */}
              {profile.isArtisan && (
                <>
                  <div className="border-b border-gray-200 pb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations professionnelles</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="siret" className="block text-sm font-medium text-gray-700">
                          Numéro SIRET
                        </label>
                        <input
                          type="text"
                          name="siret"
                          id="siret"
                          value={profile.siret}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="12345678901234"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black disabled:bg-gray-100"
                        />
                      </div>

                      <div>
                        <label htmlFor="tarifHoraire" className="block text-sm font-medium text-gray-700">
                          Tarif horaire (€)
                        </label>
                        <input
                          type="number"
                          name="tarifHoraire"
                          id="tarifHoraire"
                          value={profile.tarifHoraire}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="25"
                          min="0"
                          step="0.01"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black disabled:bg-gray-100"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="metier" className="block text-sm font-medium text-gray-700">
                          Corps de métier
                        </label>
                        <select
                          name="metier"
                          id="metier"
                          value={profile.metier}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black disabled:bg-gray-100"
                        >
                          <option value="">Sélectionnez un métier</option>
                          {METIERS.map((metier) => (
                            <option key={metier} value={metier}>
                              {metier}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description de votre activité
                        </label>
                        <textarea
                          name="description"
                          id="description"
                          rows={4}
                          value={profile.description}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="Décrivez votre activité, vos spécialités, votre expérience..."
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black disabled:bg-gray-100"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Compétences
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {profile.competences.map((competence, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800"
                            >
                              {competence}
                              {isEditing && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveCompetence(competence)}
                                  className="ml-2 text-[#ED6A2C] hover:text-orange-700"
                                >
                                  ×
                                </button>
                              )}
                            </span>
                          ))}
                        </div>
                        {isEditing && (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newCompetence}
                              onChange={(e) => setNewCompetence(e.target.value)}
                              placeholder="Ajouter une compétence"
                              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                            />
                            <button
                              type="button"
                              onClick={handleAddCompetence}
                              className="bg-[#ED6A2C] hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                              Ajouter
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Section changement de rôle */}
              {isEditing && (
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Changer de rôle</h3>
                      <p className="text-sm text-gray-600">
                        Basculer entre mode Artisan et Particulier
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => setProfile(prev => ({ ...prev, isArtisan: !prev.isArtisan }))}
                        className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${profile.isArtisan ? 'bg-orange-500' : 'bg-gray-300'}`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${profile.isArtisan ? 'translate-x-6' : 'translate-x-1'}`}
                        />
                      </button>
                      <span className="ml-4 text-sm font-medium text-gray-700">
                        {profile.isArtisan ? 'Artisan' : 'Particulier'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {isEditing && (
                <div className="flex justify-end pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#ED6A2C] hover:bg-orange-600 text-white px-6 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                  >
                    {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 