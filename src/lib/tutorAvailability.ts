import {createContext, Dispatch, useContext} from 'react';
import {Hour} from "@/lib/Hour";

export namespace TutorAvailability {
    export interface TimeSlot {
        id: number;
        from: string;
        to: string;
        error?: string;
    }

    export interface Day {
        active: boolean;
        slots: TimeSlot[];
    }

    export interface State {
        [key: string]: Day;
    }

    export interface AvailabilityState {
        availability: State;
        isValid: boolean;
    }

    export type Action =
        | { type: 'ADD_SLOT'; day: string }
        | { type: 'DELETE_SLOT'; day: string; slotId: number }
        | { type: 'UPDATE_SLOT'; day: string; slotId: number; field: 'from' | 'to'; value: string }
        | { type: 'TOGGLE_DAY'; day: string };

    export const DispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

    export function useDispatch() {
        const context = useContext(DispatchContext);
        if (context === undefined) {
            throw new Error('useDispatch must be used within a DispatchProvider');
        }
        return context;
    }

    export const DispatchProvider = DispatchContext.Provider;
    export const initialState: State = {
        Monday: {active: false, slots: []},
        Tuesday: {active: false, slots: []},
        Wednesday: {active: false, slots: []},
        Thursday: {active: false, slots: []},
        Friday: {active: false, slots: []},
        Saturday: {active: false, slots: []},
        Sunday: {active: false, slots: []},
    };

    export const initialAvailabilityState: AvailabilityState = {
        availability: initialState,
        isValid: false
    }



    const defaultStartHour:string = '09:00';
    const defaultEndHour:string = '17:00';

    const createNewSlot = ():TimeSlot => {
        return {
            id: Date.now(),
            from: defaultStartHour,
            to: defaultEndHour
        }
    }
    export function reducer(draft: State, action: Action): void {
        switch (action.type) {
            case 'ADD_SLOT':
                const newSlot = createNewSlot();

                draft[action.day].slots.push(newSlot);
                draft[action.day].active = true;

                break;
            case 'DELETE_SLOT':
                const indexToDelete = draft[action.day].slots.findIndex(slot => slot.id === action.slotId);
                if (indexToDelete !== -1) {
                    draft[action.day].slots.splice(indexToDelete, 1);
                }
                draft[action.day].active = draft[action.day].slots.length > 0;
                break;

            case 'UPDATE_SLOT':
                const slotIndex = draft[action.day].slots.findIndex(slot => slot.id === action.slotId);
                if (slotIndex !== -1) {
                    if (action.field === 'from') {
                        draft[action.day].slots[slotIndex].from = action.value;
                    } else if (action.field === 'to') {
                        draft[action.day].slots[slotIndex].to = action.value;
                    }
                }
                break;
            case 'TOGGLE_DAY':
                draft[action.day].active = !draft[action.day].active;
                draft[action.day].slots = draft[action.day].active ? [createNewSlot()] : [];
                break;
        }

        draft[action.day].slots.sort((a, b) => a.from.localeCompare(b.from));
        const validateResult = validateSlots(draft[action.day].slots);
        if(validateResult.isValid){
            draft[action.day].slots.forEach(slot => slot.error = undefined);
        }
        else{
            validateResult.errors.forEach(error => {
                const slotIndex = draft[action.day].slots.findIndex(slot => slot.id === error.id);
                if(slotIndex !== -1){
                    draft[action.day].slots[slotIndex].error = error.message;
                }
            });
        }


    }

    function validateSlots(slots: TimeSlot[]): { isValid: boolean; errors: { id: number; message: string }[] } {
        let errors = [];

        for (let i = 0; i < slots.length; i++) {
            const currentSlot = slots[i];
            if (currentSlot.from >= currentSlot.to) {
                errors.push({ id: currentSlot.id, message: "From time must be before To time." });
                continue;
            }

            const fromHour = Hour.getHourFrom24HourFormat(currentSlot.from);
            const toHour = Hour.getHourFrom24HourFormat(currentSlot.to)
            if (toHour - fromHour < 1) {
                errors.push({ id: currentSlot.id, message: "Slots must have at least one hour difference." });
                continue
            }

            if (i < slots.length - 1) {
                const nextSlot = slots[i + 1];
                if (currentSlot.to > nextSlot.from) {
                    errors.push({ id: currentSlot.id, message: "Slots must not overlap." });
                    errors.push({ id: nextSlot.id, message: "Slots must not overlap." });
                }
            }
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}




