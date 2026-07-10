const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with status ${res.status}`);
  }
  return res.json();
}

export function fetchProjects(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`/api/projects${query ? `?${query}` : ''}`);
}

export function fetchProject(slug) {
  return request(`/api/projects/${slug}`);
}

export function fetchProfile() {
  return request('/api/profile');
}
