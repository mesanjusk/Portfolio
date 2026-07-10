const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `Request to ${path} failed with status ${res.status}`);
  }
  return res.json();
}

const adminHeaders = (password) => ({ 'x-admin-password': password });

export function verifyAdminPassword(password) {
  return request('/api/admin/login', {
    method: 'POST',
    headers: adminHeaders(password),
  });
}

export function fetchProjects(params = {}) {
  const query = new URLSearchParams(params).toString();
  return request(`/api/projects${query ? `?${query}` : ''}`);
}

export function fetchProject(slug) {
  return request(`/api/projects/${slug}`);
}

export function createProject(project, password) {
  return request('/api/projects', {
    method: 'POST',
    headers: adminHeaders(password),
    body: JSON.stringify(project),
  });
}

export function updateProject(id, project, password) {
  return request(`/api/projects/${id}`, {
    method: 'PUT',
    headers: adminHeaders(password),
    body: JSON.stringify(project),
  });
}

export function deleteProject(id, password) {
  return request(`/api/projects/${id}`, {
    method: 'DELETE',
    headers: adminHeaders(password),
  });
}

export function fetchProfile() {
  return request('/api/profile');
}

export function updateProfile(profile, password) {
  return request('/api/profile', {
    method: 'PUT',
    headers: adminHeaders(password),
    body: JSON.stringify(profile),
  });
}
