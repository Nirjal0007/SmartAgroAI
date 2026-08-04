import axios from 'axios';

// Backend base URL — override via .env (VITE_API_BASE_URL) for production.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

/** Turn any axios error into a short, user-friendly message. */
function friendlyMessage(error) {
  if (error.code === 'ECONNABORTED') {
    return 'The request timed out. Please try again.';
  }
  if (!error.response) {
    return 'Cannot reach the SmartAgroAI server. Is the backend running?';
  }
  return error.response.data?.detail || 'Something went wrong. Please try again.';
}

/** POST /predict — upload a leaf image and get a disease prediction back. */
export async function predictDisease(file, { signal } = {}) {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const { data } = await api.post('/predict', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      signal,
    });
    return data;
  } catch (error) {
    throw new Error(friendlyMessage(error));
  }
}

/** GET /history — fetch all stored predictions. */
export async function fetchHistory() {
  try {
    const { data } = await api.get('/history');
    return data;
  } catch (error) {
    throw new Error(friendlyMessage(error));
  }
}

/** DELETE /history/{id} — remove a single prediction. */
export async function deleteHistoryEntry(id) {
  try {
    const { data } = await api.delete(`/history/${id}`);
    return data;
  } catch (error) {
    throw new Error(friendlyMessage(error));
  }
}

/** DELETE /history — clear all prediction history. */
export async function clearHistory() {
  try {
    const { data } = await api.delete('/history');
    return data;
  } catch (error) {
    throw new Error(friendlyMessage(error));
  }
}

/** Resolve a backend-relative image path (e.g. /uploads/x.jpg) to a full URL. */
export function resolveImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_BASE_URL}${path}`;
}

export async function checkHealth() {
  try {
    const { data } = await api.get('/health');
    return data;
  } catch {
    return { status: 'offline', model_loaded: false };
  }
}

export default api;
