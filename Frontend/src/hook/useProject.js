import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

/**
 * Custom hook to handle project data lifecycle.
 * Handles fetching list of projects, fetching a single project, and creating new ones.
 */
export const useProject = () => {
    const queryClient = useQueryClient();

    // 1. Fetch Projects Query
    const { 
        data: myProjects, 
        isLoading: isFetchingProjects, 
        isError: isProjectsError,
        refetch
    } = useQuery({
        queryKey: ['myProjects'],
        queryFn: async () => {
            const { data } = await apiClient.get('/project/my-projects');
            return data?.data || [];
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    // 2. Create Project Mutation
    const mutation = useMutation({
        mutationFn: async (formData) => {
            const { data } = await apiClient.post('/project/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myProjects'] });
        }
    });

    return {
        myProjects,
        isFetchingProjects,
        isProjectsError,
        refetchProjects: refetch,
        createProject: mutation.mutate,
        isCreating: mutation.isPending, 
        createError: mutation.error,
        isCreateSuccess: mutation.isSuccess
    };
};

/**
 * Hook to fetch a single project by ID for the detail view
 */
export const useProjectById = (id) => {
    return useQuery({
        queryKey: ['project', id],
        queryFn: async () => {
            const { data } = await apiClient.get(`/project/get-project/${id}`);
            return data.data; 
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 10,
    });
};