/**
 * Adaptateur LocalStorage — remplaçable par ApiAdapter (PostgreSQL, Supabase…)
 */
export class LocalStorageAdapter {
  constructor(prefix = 'wazabycode') {
    this.prefix = prefix;
  }

  _key(name) {
    return `${this.prefix}_${name}`;
  }

  get(key) {
    try {
      const raw = localStorage.getItem(this._key(key));
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  set(key, value) {
    localStorage.setItem(this._key(key), JSON.stringify(value));
  }

  remove(key) {
    localStorage.removeItem(this._key(key));
  }
}

/** Future : class ApiAdapter { async get/set via REST } */
