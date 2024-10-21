import api from "./apiConfig";
import { LanguageDto, LanguageProficiencyLevel } from "./types/dtoTypes";

export const isLanguage = (obj: unknown): obj is LanguageDto => {
    return (obj as LanguageDto).languageName !== undefined;
}

export const isLanguageArray = (obj: unknown): obj is LanguageDto[] => {
    return (obj as LanguageDto[]).every((item: any) => isLanguage(item));
}

export const isValidLanguageLevel = (level: string): level is LanguageProficiencyLevel => {
    return ["A1", "A2", "B1", "B2", "C1", "C2", "NATIVE"].includes(level);
}

export const languageProficiencyLevels: LanguageProficiencyLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2", "NATIVE"];

export const getAllLanguages = async (): Promise<LanguageDto[]> => {
    try {
        const response = await api.get('/language/all', { skipAuth: true });

        if (response.status === 200) {
            const languageArr: unknown = response.data;
            if (Array.isArray(languageArr)) {
                return languageArr as LanguageDto[];
            }
            console.error("Invalid response format for languages");
            return [];
        }

        const errorArr = response.data.errors || [];
        console.error("HTTP error occurred: ", `status=${response.status} `, `message=${errorArr}`);
        return [];
    } catch (error) {
        console.error('Error fetching api languages (Runtime):', error);
        return [];
    }
};