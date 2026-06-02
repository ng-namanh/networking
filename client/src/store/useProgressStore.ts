import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ConceptProgress = {
	isRead: boolean;
	readAt?: string;
	lastVisitedAt?: string;
	lastStep?: number;
};

interface ProgressStore {
	conceptProgress: Record<string, ConceptProgress>;
	bookmarkedConcepts: string[];
	lastVisitedConceptId?: string;
	hasHydrated: boolean;

	getProgress: (id: string) => ConceptProgress;
	isRead: (id: string) => boolean;
	getReadCount: () => number;

	markAsRead: (id: string) => void;
	markAsUnread: (id: string) => void;
	toggleRead: (id: string) => void;
	setLastVisited: (id: string) => void;
	setConceptStep: (id: string, step: number) => void;
	setHasHydrated: (hasHydrated: boolean) => void;
	toggleBookmark: (id: string) => void;
}

export const useProgressStore = create<ProgressStore>()(
	persist(
		(set, get) => ({
			conceptProgress: {},
			bookmarkedConcepts: [],
			lastVisitedConceptId: undefined,
			hasHydrated: false,

			getProgress: (id) => get().conceptProgress[id] ?? { isRead: false },

			isRead: (id) => get().conceptProgress[id]?.isRead ?? false,

			getReadCount: () =>
				Object.values(get().conceptProgress).filter((p) => p.isRead).length,

			markAsRead: (id) =>
				set((state) => {
					const now = new Date().toISOString();

					return {
						conceptProgress: {
							...state.conceptProgress,
							[id]: {
								...state.conceptProgress[id],
								isRead: true,
								readAt: now,
								lastVisitedAt: now,
								lastStep: state.conceptProgress[id]?.lastStep,
							},
						},
					};
				}),

			markAsUnread: (id) =>
				set((state) => ({
					conceptProgress: {
						...state.conceptProgress,
						[id]: {
							...state.conceptProgress[id],
							isRead: false,
							readAt: undefined,
						},
					},
				})),

			toggleRead: (id) => {
				const progress = get().conceptProgress[id];
				if (progress?.isRead) {
					get().markAsUnread(id);
				} else {
					get().markAsRead(id);
				}
			},

			setLastVisited: (id) =>
				set((state) => {
					const now = new Date().toISOString();

					return {
						lastVisitedConceptId: id,
						conceptProgress: {
							...state.conceptProgress,
							[id]: {
								...state.conceptProgress[id],
								isRead: state.conceptProgress[id]?.isRead ?? false,
								lastVisitedAt: now,
							},
						},
					};
				}),

			setConceptStep: (id, step) =>
				set((state) => {
					const safeStep = Number.isFinite(step)
						? Math.max(0, Math.floor(step))
						: 0;

					return {
						conceptProgress: {
							...state.conceptProgress,
							[id]: {
								...state.conceptProgress[id],
								isRead: state.conceptProgress[id]?.isRead ?? false,
								lastStep: safeStep,
								lastVisitedAt: state.conceptProgress[id]?.lastVisitedAt,
							},
						},
					};
				}),

			setHasHydrated: (hasHydrated) => set({ hasHydrated }),

			toggleBookmark: (id) =>
				set((state) => ({
					bookmarkedConcepts: state.bookmarkedConcepts.includes(id)
						? state.bookmarkedConcepts.filter((c) => c !== id)
						: [...state.bookmarkedConcepts, id],
				})),
		}),
		{
			name: "networking-progress-v1",
			storage: createJSONStorage(() => localStorage),
			version: 1,
			skipHydration: true,
			partialize: (state) => ({
				conceptProgress: state.conceptProgress,
				bookmarkedConcepts: state.bookmarkedConcepts,
				lastVisitedConceptId: state.lastVisitedConceptId,
			}),
			onRehydrateStorage: () => (state, error) => {
				if (error || !state) {
					useProgressStore.setState({ hasHydrated: true });
					return;
				}

				state.setHasHydrated(true);
			},
		},
	),
);

let progressHydrationStarted = false;

export function hydrateProgressStore() {
	if (progressHydrationStarted) return;
	progressHydrationStarted = true;
	void useProgressStore.persist.rehydrate();
}
