const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const apiPath = (path) => `${API_URL}${path}`;

async function request(path, options = {}) {
  let res;

  try {
    res = await fetch(apiPath(path), {
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
      ...options,
    });
  } catch (error) {
    throw new Error(
      `Unable to reach the API at ${apiPath(path)}. Start the backend with \`npm run dev:server\` or run \`npm run dev\` from the repo root. Original error: ${error.message}`
    );
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `Request to ${path} failed with status ${res.status}`);
  }
  return res.json();
}

const adminHeaders = (password) => ({ 'x-admin-password': password });

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
