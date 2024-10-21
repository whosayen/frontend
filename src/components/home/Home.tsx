'use client';

import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FilterList as FilterListIcon } from '@mui/icons-material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import FilterDrawer from './FilterDrawer';
import TeacherCard from './TeacherCard';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Filters, Teacher } from "@/lib/types/clientTypes";
import { FullUserSearchDto } from '@/lib/types/dtoTypes';
import api from '@/lib/apiConfig';

const Home: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 2;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile screens
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // Detect tablet screens

    // Use effect to handle query parameters client-side
    useEffect(() => {
        if (searchParams) {
            const initialFilters = getInitialFilters(searchParams);
            setFilters(initialFilters);
        }
    }, [searchParams]);

    const getInitialFilters = (params: URLSearchParams): Filters => ({
        languageLevel: params.get('languageLevel') || undefined,
        knownLanguage: params.get('knownLanguage') || undefined,
        languageToTeach: params.get('languageToTeach') || undefined,
        minRate: params.get('minRate') || undefined,
        maxRate: params.get('maxRate') || undefined,
        keyword: params.get('keyword') || undefined,
        sortBy: (params.get('sortBy') as keyof Teacher) || 'id',
    });

    const [filters, setFilters] = useState<Filters>({
        languageLevel: undefined,
        knownLanguage: undefined,
        languageToTeach: undefined,
        minRate: undefined,
        maxRate: undefined,
        keyword: undefined,
        sortBy: undefined,
    });

    const fetchTeachers = async (page = 1) => {
        try {
            const params: Record<string, string | number | undefined> = {
                languageLevel: filters.languageLevel,
                knownLanguage: filters.knownLanguage,
                languageToTeach: filters.languageToTeach,
                page: page - 1,
                size: itemsPerPage,
                sortBy: filters.sortBy,
                minRate: filters.minRate,
                maxRate: filters.maxRate,
                keyword: filters.keyword,
            };

            Object.keys(params).forEach((key) => {
                if (params[key] === undefined) {
                    delete params[key];
                }
            });

            const response = await api.get<{ content: FullUserSearchDto[], totalPages: number, number: number }>(
                '/tutor/search',
                {
                    params, // Pass the params object directly
                }
            );

            const { data } = response;

            console.log(data)

            const transformedData: Teacher[] = data.content.map((item) => ({
                tutorId: item.tutorSearchDto.tutorId,
                userId: item.userSearchDto.id,
                name: `${item.userSettingsSearchDto.firstName} ${item.userSettingsSearchDto.lastName}`,
                languages: item.tutorSearchDto.languageLevelDtos?.map((lang) => ({
                    languageDto: {
                        languageName: lang.languageDto.languageName || 'Unknown Language',
                        code: lang.languageDto?.code || '',
                    },
                    level: lang.level,
                })) || [],
                primaryLanguage: item.tutorSearchDto.languageToTeach?.languageName || 'Unknown Language',
                hourlyRate: item.tutorSearchDto.hourlyRate,
                shortDescription: item.tutorSearchDto.shortDescription,
                fullDescription: item.tutorSearchDto.description,
                schedule: item.tutorSearchDto.schedule,
                videoId: item.tutorSearchDto.videoUrl,
                image: item.userSettingsSearchDto.image || undefined,
                location: item.userSettingsSearchDto.countryDto.name,
                rating: item.tutorSearchDto.avgRate !== null ? item.tutorSearchDto.avgRate.toString() : 'No rating',
            }));

            setTeachers(transformedData);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number + 1);

        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    useEffect(() => {
        if (filters) {
            fetchTeachers(currentPage);
        }
    }, [filters, currentPage]);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleApplyFilters = (newFilters: Filters) => {
        setFilters(newFilters);
        setCurrentPage(1);

        const queryParams: Record<string, string | undefined> = {
            languageLevel: newFilters.languageLevel,
            knownLanguage: newFilters.knownLanguage,
            languageToTeach: newFilters.languageToTeach,
            page: '0',
            size: '10',
            sortBy: newFilters.sortBy,
            minRate: newFilters.minRate?.toString(),
            maxRate: newFilters.maxRate?.toString(),
            keyword: newFilters.keyword,
        };

        const queryString = Object.keys(queryParams)
            .filter(key => queryParams[key] !== undefined)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key]!)}`)
            .join('&');

        router.push(`/tutor?${queryString}`);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <Box p={isMobile ? 1 : 2}>
            <Box
                display="flex"
                flexDirection={isMobile ? 'column' : 'row'}
                justifyContent="space-between"
                alignItems={isMobile ? 'flex-start' : 'center'}
                mb={isMobile ? 1 : 2}
            >
                <Typography variant={isMobile ? "h6" : "h5"} align={isMobile ? 'center' : 'left'} mb={isMobile ? 2 : 0}>
                    Online language course: choose a language tutor
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDrawerOpen}
                    startIcon={<FilterListIcon />}
                    sx={{ width: isMobile ? '100%' : 'auto' }}
                >
                    Filter
                </Button>
            </Box>

            {teachers.length > 0 ? (
                <Box display="flex" flexDirection="column" gap={2}>
                    {teachers.map((teacher, index) => (
                        <TeacherCard key={index} teacher={teacher} />
                    ))}
                </Box>
            ) : (
                <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                    <SentimentDissatisfiedIcon style={{ fontSize: 60, color: '#bdbdbd' }} />
                    <Typography variant="h6" color="textSecondary" align="center" mt={2}>
                        Not Found
                    </Typography>
                </Box>
            )}

            <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Typography sx={{ mx: 2 }}>
                    Page {currentPage} of {totalPages}
                </Typography>
                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </Box>

            <FilterDrawer
                open={drawerOpen}
                onClose={handleDrawerClose}
                onApplyFilters={handleApplyFilters}
                initialFilters={filters}
            />
        </Box>
    );
};

export default Home;
