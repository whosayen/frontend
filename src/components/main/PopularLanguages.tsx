'use client';

import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRouter } from 'next/navigation';
import Flag from 'react-world-flags';
import { getAllLanguages } from "@/lib/language";
import { LanguageDto } from "@/lib/types/dtoTypes";

const popularLanguagesWithFlags: { languageName: string; code: string }[] = [
    { languageName: "English", code: "GB" },
    { languageName: "French", code: "FR" },
    { languageName: "German", code: "DE" },
    { languageName: "Spanish", code: "ES" },
    { languageName: "Italian", code: "IT" },
    { languageName: "Chinese", code: "CN" },
    { languageName: "Japanese", code: "JP" },
    { languageName: "Russian", code: "RU" },
    { languageName: "Portuguese", code: "PT" },
    { languageName: "Korean", code: "KR" },
    { languageName: "Arabic", code: "SA" },
    { languageName: "Dutch", code: "NL" },
    { languageName: "Turkish", code: "TR" },
    { languageName: "Swedish", code: "SE" },
    { languageName: "Greek", code: "GR" },
    { languageName: "Polish", code: "PL" },
    { languageName: "Danish", code: "DK" },
    { languageName: "Finnish", code: "FI" },
    { languageName: "Norwegian", code: "NO" },
    { languageName: "Hungarian", code: "HU" },
    { languageName: "Hebrew", code: "IL" }
];

const PopularLanguagesSection: React.FC = () => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [languages, setLanguages] = useState<LanguageDto[]>([]);

    useEffect(() => {
        // Fetch languages from the API on component mount
        const fetchLanguages = async () => {
            try {
                const fetchedLanguages = await getAllLanguages();
                const filteredLanguages = fetchedLanguages.filter((lang) =>
                    popularLanguagesWithFlags.some(
                        (popularLang) => popularLang.languageName === lang.languageName && popularLang.code === lang.code.toUpperCase()
                    )
                );
                setLanguages(filteredLanguages);
            } catch (error) {
                console.error("Error fetching languages: ", error);
            }
        };

        fetchLanguages();

        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = 0;
        }
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    const handleLanguageClick = (language: string) => {
        router.push(`/tutor?language=${language}`);
    };

    return (
        <Box className="text-center">
            <Typography variant="h3" color="primary" className="mb-16">
                Popular languages
            </Typography>

            <Box sx={{ mt: 4 }} className="relative flex items-center justify-center">
                <IconButton onClick={scrollLeft} className="absolute left-0 z-20">
                    <ChevronLeftIcon />
                </IconButton>
                <Box
                    className="flex overflow-x-auto space-x-4 px-4 scroll-smooth items-center justify-start"
                    ref={scrollContainerRef}
                    sx={{
                        scrollBehavior: 'smooth',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        '&::-webkit-scrollbar': { display: 'none' },
                    }}
                >
                    {languages.map((language) => (
                        <Paper
                            key={language.code}
                            className="p-4 min-w-[150px] text-center shadow-md flex-shrink-0 rounded-lg flex flex-col items-center cursor-pointer"
                            onClick={() => handleLanguageClick(language.languageName)}
                            sx={{ mx: 1 }}
                        >
                            <Box className="flex justify-center mb-2">
                                <Flag code={language.code.toUpperCase()} width={64} className="rounded-lg" />
                            </Box>
                            <Typography variant="subtitle2" className="mt-2">
                                {language.languageName}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
                <IconButton onClick={scrollRight} className="absolute right-0 z-20">
                    <ChevronRightIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default PopularLanguagesSection;
