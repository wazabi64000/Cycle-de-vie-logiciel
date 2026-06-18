/** Bus d'événements léger — communication inter-modules sans rechargement */
class EventBus {
  constructor() {
    this._listeners = new Map();
  }

  on(event, callback) {
    if (!this._listeners.has(event)) this._listeners.set(event, new Set());
    this._listeners.get(event).add(callback);
    return () => this._listeners.get(event)?.delete(callback);
  }

  emit(event, payload) {
    this._listeners.get(event)?.forEach((cb) => cb(payload));
  }
}

export const eventBus = new EventBus();

export const Events = {
  PROGRESS_UPDATED: 'progress:updated',
  CHECKLIST_CHANGED: 'checklist:changed',
  BADGE_UNLOCKED: 'badge:unlocked',
  LEVEL_UP: 'level:up',
  CERTIFICATE_EARNED: 'certificate:earned',
  RECOMMENDATIONS_UPDATED: 'recommendations:updated',
  LEARNING_SAVED: 'learning:saved',
  QUIZ_COMPLETED: 'quiz:completed',
  CHAPTER_CHANGED: 'chapter:changed',
};
