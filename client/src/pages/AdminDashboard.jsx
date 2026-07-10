import { useEffect, useState } from 'react';
import {
  createProject,
  deleteProject,
  fetchProfile,
  fetchProjects,
  updateProfile,
  updateProject,
  verifyAdminPassword,
} from '../api/client.js';

const emptyProject = {
  title: '',
  slug: '',
  category: '',
  summary: '',
  description: '',
  coverImage: '',
  images: '',
  tools: '',
  year: new Date().getFullYear(),
  featured: false,
};

const emptyProfile = {
  name: '',
  tagline: '',
  bio: '',
  education: '',
  location: '',
  skills: '',
  avatarUrl: '',
  resumeUrl: '',
  social: { email: '', instagram: '', linkedin: '', behance: '' },
};

const toProjectForm = (project) => ({
  ...emptyProject,
  ...project,
  images: project.images?.join('\n') || '',
  tools: project.tools?.join(', ') || '',
});

const toProfileForm = (profile) => ({
  ...emptyProfile,
  ...profile,
  skills: profile.skills?.join(', ') || '',
  social: { ...emptyProfile.social, ...profile.social },
});

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.18em] text-[#6b4a2d]">{label}</span>
      {children}
    </label>
  );
}

const inputClass = 'mt-2 w-full rounded-2xl border-2 border-[#39251b] bg-white px-4 py-3 text-[#39251b] outline-none shadow-[4px_4px_0_#39251b]/80 focus:bg-[#fff7cf]';

export default function AdminDashboard() {
  const [password, setPassword] = useState(localStorage.getItem('adminPassword') || '');
  const [isAuthed, setIsAuthed] = useState(Boolean(localStorage.getItem('adminPassword')));
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [profileForm, setProfileForm] = useState(emptyProfile);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const loadDashboard = () => {
    setError('');
    Promise.all([fetchProjects(), fetchProfile().catch(() => emptyProfile)])
      .then(([projectData, profileData]) => {
        setProjects(projectData);
        setProfileForm(toProfileForm(profileData));
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    if (isAuthed) loadDashboard();
  }, [isAuthed]);

  const login = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await verifyAdminPassword(password);
      localStorage.setItem('adminPassword', password);
      setIsAuthed(true);
      setStatus('Welcome back, admin.');
    } catch (err) {
      setError(err.message || 'Incorrect password. Use the admin password.');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminPassword');
    setIsAuthed(false);
    setPassword('');
  };

  const saveProject = async (event) => {
    event.preventDefault();
    setError('');
    try {
      if (editingProjectId) {
        await updateProject(editingProjectId, projectForm, password);
        setStatus('Project updated successfully.');
      } else {
        await createProject(projectForm, password);
        setStatus('New project added successfully.');
      }
      setProjectForm(emptyProject);
      setEditingProjectId(null);
      loadDashboard();
    } catch (err) {
      setError(err.message);
    }
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await updateProfile(profileForm, password);
      setStatus('Home, about, contact text and images updated.');
      loadDashboard();
    } catch (err) {
      setError(err.message);
    }
  };

  const removeProject = async (project) => {
    if (!window.confirm(`Delete ${project.title}?`)) return;
    try {
      await deleteProject(project._id, password);
      setStatus('Project deleted.');
      loadDashboard();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-[70vh] bg-[#fff7cf] px-6 py-16">
        <form onSubmit={login} className="mx-auto max-w-md rounded-[2rem] border-4 border-[#39251b] bg-white p-8 shadow-[12px_12px_0_#39251b]">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#ee5b3e]">Admin only</p>
          <h1 className="mt-3 font-serif text-4xl font-black text-[#39251b]">Portfolio Control Room</h1>
          <p className="mt-3 text-[#6b4a2d]">Login to add projects and edit every visible text or image from the frontend.</p>
          <Field label="Password">
            <input className={inputClass} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter admin password" />
          </Field>
          {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-red-600">{error}</p>}
          <button className="mt-6 w-full rounded-full border-2 border-[#39251b] bg-[#ee5b3e] px-7 py-3 font-black uppercase tracking-wide text-white shadow-[5px_5px_0_#39251b] transition-transform hover:-translate-y-1">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-[#fff7cf] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[2rem] border-4 border-[#39251b] bg-[#7ac7c4] p-6 shadow-[8px_8px_0_#39251b]">
          <div>
            <p className="font-black uppercase tracking-[0.25em] text-white">Admin Dashboard</p>
            <h1 className="font-serif text-4xl font-black text-[#39251b]">Edit your portfolio live</h1>
          </div>
          <button onClick={logout} className="rounded-full border-2 border-[#39251b] bg-white px-5 py-2 font-black text-[#39251b] shadow-[4px_4px_0_#39251b]">Logout</button>
        </div>

        {status && <p className="mb-4 rounded-2xl border-2 border-[#39251b] bg-white p-4 font-bold text-[#39251b]">{status}</p>}
        {error && <p className="mb-4 rounded-2xl border-2 border-red-700 bg-red-50 p-4 font-bold text-red-700">{error}</p>}

        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <form onSubmit={saveProfile} className="rounded-[2rem] border-4 border-[#39251b] bg-white p-6 shadow-[8px_8px_0_#39251b]">
            <h2 className="font-serif text-3xl font-black">Edit home/about/contact</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {['name', 'tagline', 'location', 'avatarUrl', 'resumeUrl'].map((name) => (
                <Field key={name} label={name}><input className={inputClass} value={profileForm[name] || ''} onChange={(e) => setProfileForm({ ...profileForm, [name]: e.target.value })} /></Field>
              ))}
              <Field label="skills"><input className={inputClass} value={profileForm.skills || ''} onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })} placeholder="comma separated" /></Field>
            </div>
            <div className="mt-4 grid gap-4">
              {['bio', 'education'].map((name) => (
                <Field key={name} label={name}><textarea className={inputClass} rows="4" value={profileForm[name] || ''} onChange={(e) => setProfileForm({ ...profileForm, [name]: e.target.value })} /></Field>
              ))}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {['email', 'instagram', 'linkedin', 'behance'].map((name) => (
                <Field key={name} label={name}><input className={inputClass} value={profileForm.social?.[name] || ''} onChange={(e) => setProfileForm({ ...profileForm, social: { ...profileForm.social, [name]: e.target.value } })} /></Field>
              ))}
            </div>
            <button className="mt-6 rounded-full border-2 border-[#39251b] bg-[#f9a51a] px-7 py-3 font-black uppercase shadow-[5px_5px_0_#39251b]">Save page content</button>
          </form>

          <div className="space-y-8">
            <form onSubmit={saveProject} className="rounded-[2rem] border-4 border-[#39251b] bg-white p-6 shadow-[8px_8px_0_#39251b]">
              <h2 className="font-serif text-3xl font-black">{editingProjectId ? 'Edit project' : 'Add project'}</h2>
              <div className="mt-6 grid gap-4">
                {['title', 'slug', 'category', 'coverImage'].map((name) => (
                  <Field key={name} label={name}><input className={inputClass} value={projectForm[name]} onChange={(e) => setProjectForm({ ...projectForm, [name]: e.target.value })} /></Field>
                ))}
                <Field label="summary"><textarea className={inputClass} rows="2" value={projectForm.summary} onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })} /></Field>
                <Field label="description"><textarea className={inputClass} rows="5" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} /></Field>
                <Field label="gallery image urls"><textarea className={inputClass} rows="3" value={projectForm.images} onChange={(e) => setProjectForm({ ...projectForm, images: e.target.value })} placeholder="one URL per line" /></Field>
                <Field label="tools"><input className={inputClass} value={projectForm.tools} onChange={(e) => setProjectForm({ ...projectForm, tools: e.target.value })} placeholder="comma separated" /></Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="year"><input className={inputClass} type="number" value={projectForm.year} onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })} /></Field>
                  <label className="mt-8 flex items-center gap-3 font-black"><input type="checkbox" checked={projectForm.featured} onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })} /> Featured</label>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-full border-2 border-[#39251b] bg-[#ee5b3e] px-7 py-3 font-black uppercase text-white shadow-[5px_5px_0_#39251b]">{editingProjectId ? 'Update project' : 'Add project'}</button>
                {editingProjectId && <button type="button" onClick={() => { setEditingProjectId(null); setProjectForm(emptyProject); }} className="rounded-full border-2 border-[#39251b] bg-white px-7 py-3 font-black uppercase shadow-[5px_5px_0_#39251b]">Cancel</button>}
              </div>
            </form>

            <div className="rounded-[2rem] border-4 border-[#39251b] bg-white p-6 shadow-[8px_8px_0_#39251b]">
              <h2 className="font-serif text-3xl font-black">Projects</h2>
              <div className="mt-4 space-y-3">
                {projects.map((project) => (
                  <div key={project._id} className="rounded-2xl border-2 border-[#39251b] bg-[#fff7cf] p-4">
                    <p className="font-black">{project.title}</p>
                    <p className="text-sm text-[#6b4a2d]">{project.category} · {project.year}</p>
                    <div className="mt-3 flex gap-3">
                      <button onClick={() => { setEditingProjectId(project._id); setProjectForm(toProjectForm(project)); }} className="font-black text-[#ee5b3e] underline">Edit</button>
                      <button onClick={() => removeProject(project)} className="font-black text-red-700 underline">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
