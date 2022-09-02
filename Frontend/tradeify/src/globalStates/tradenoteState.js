import create from 'zustand'

const useTradenoteStore = create((set) => ({
   tradenotes: [],
   setTradenotes: (tradenotes) => set((state) => ({ tradenotes: tradenotes })),
   removeAllTradenotess: () => set({ tradenotes: [] }),
}))

export default useTradenoteStore;