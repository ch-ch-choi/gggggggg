import { create } from "zustand";

interface KnobOnOffStore{
    korKnobOnOff: boolean;
    setKorKnobOnOff: (onOff: boolean) => void;
    
    engKnobOnOff: boolean;
    setEngKnobOnOff: (onOff: boolean) => void;
}

const useKnobOnOffStore = create<KnobOnOffStore>((set) => ({
    korKnobOnOff: false,
    setKorKnobOnOff: (onOff) => set({ korKnobOnOff: onOff }),
    engKnobOnOff: false,
    setEngKnobOnOff: (onOff) => set({ engKnobOnOff: onOff }),
}));

export default useKnobOnOffStore;