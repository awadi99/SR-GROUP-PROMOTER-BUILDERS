import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

export const useProject = () => {
    const queryClient = useQueryClient();

    // 1. Fetch Projects Query
    const { 
        data: myProjects, 
        isLoading: isFetchingProjects, 
        isError: isProjectsError 
    } = useQuery({
        queryKey: ['myProjects'],
        queryFn: async () => {
            // Corrected to match your backend mount path: /api/project
            const { data } = await apiClient.get('/project/my-projects');
            return data;
        },
        staleTime: 1000 * 60 * 5, 
        refetchOnWindowFocus: false,
    });

    // 2. Create Project Mutation
    const mutation = useMutation({
        mutationFn: async (formData) => {
            // Corrected to match your backend mount path: /api/project
            const { data } = await apiClient.post('/project/create', formData);
            return data;
        },
        onSuccess: () => {
            // Automatically refetch the projects list after a successful creation
            queryClient.invalidateQueries({ queryKey: ['myProjects'] });
        }
    });

    return {
        myProjects,
        isFetchingProjects,
        isProjectsError,
        createProject: mutation.mutate,
        isCreating: mutation.isPending, 
        createError: mutation.error,
        isCreateSuccess: mutation.isSuccess
    };
};