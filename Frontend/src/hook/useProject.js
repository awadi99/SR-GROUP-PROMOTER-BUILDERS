import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

/**
 * Custom hook to handle project data lifecycle.
 */
export const useProject = () => {
    const queryClient = useQueryClient();
    const hasToken = !!localStorage.getItem("jwt"); // Guard helper

    const {
        data: myProjects,
        isPending,
        isFetching,
        isError: isProjectsError,
        refetch
    } = useQuery({
        queryKey: ['myProjects'],
        queryFn: async () => {
            const { data } = await apiClient.get('/project/my-projects');
            return data?.data || [];
        },
        // GUARD: Only fetch if user is logged in
        enabled: hasToken,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: false, // Prevents 401 spam on error
    });

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


    const {
        data: stats,
        isLoading: isStatsLoading,
        isError: isStatsError
    } = useQuery({
        queryKey: ['dashboardStats'],
        queryFn: async () => {
            const { data } = await apiClient.get('/project/stats');
            return data.data;
        },
        enabled: hasToken,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });

    return {
        myProjects,
        stats,
        isStatsLoading,
        isStatsError,
        isPending: isPending && hasToken, // Only pending if we are actually trying to fetch
        isFetching,
        isProjectsError,
        refetchProjects: refetch,
        createProject: mutation.mutate,
        isCreating: mutation.isPending,
        createError: mutation.error,
        isCreateSuccess: mutation.isSuccess,
    };
};

/**
 * Hook to fetch a single project by ID
 */
export const useProjectById = (id) => {
    const hasToken = !!localStorage.getItem("jwt");

    return useQuery({
        queryKey: ['project', id],
        queryFn: async () => {
            const { data } = await apiClient.get(`/project/get-project/${id}`);
            return data.data;
        },
        // GUARD: Check ID AND Auth status
        enabled: !!id && hasToken,
        staleTime: 1000 * 60 * 10,
        retry: false,
    });
};

export const useUpdateProject = (id) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (formData) => {
            const { data } = await apiClient.put(`/project/update/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return data;
        },
        onSuccess: (updatedProject) => {
            queryClient.invalidateQueries({ queryKey: ['myProjects'] });
            queryClient.invalidateQueries({ queryKey: ['project', id] });
        },
    });

    return {
        updateProject: mutation.mutate,
        isUpdating: mutation.isPending,
        updateError: mutation.error,
        isUpdateSuccess: mutation.isSuccess,
    };
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (id) => {
            const { data } = await apiClient.delete(`/project/delete/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myProjects'] });
        },
    });

    return {
        deleteProject: mutation.mutate,
        isDeleting: mutation.isPending,
        deleteError: mutation.error,
        isDeleteSuccess: mutation.isSuccess,
    };
};

// --- PUBLIC HOOKS (No Guard Needed) ---

export const usePublicProject = (id) => {
    return useQuery({
        queryKey: ['public-project', id],
        queryFn: async () => {
            try {
                const response = await apiClient.get(`/project/public/${id}`);


                if (!response.data || !response.data.success) {
                    throw new Error("API returned an unsuccessful response");
                }

                // Return the 'data' object (the project)
                return response.data.data;
            } catch (error) {
                console.error("Error fetching single project:", error);
                throw error; // Let React Query handle the error state
            }
        },
        enabled: !!id,
        retry: 1, // Optional: gives it one more chance if it fails
    });
};

export const usePublicProjects = () => {
    return useQuery({
        queryKey: ['public-projects'],
        queryFn: async () => {
            try {
                const response = await apiClient.get('/project/all-public');

                return response.data?.data || [];
            } catch (error) {
                console.error("Error fetching all projects:", error);
                return []; // Return empty array on error to prevent crashes
            }
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
};

export const useProjectGraph = () => {
    return useQuery({
        queryKey: ['projectGraph'],
        queryFn: async () => {
            const { data } = await apiClient.get('/project/graph');

            // Debug: Check what the API is actually sending
            console.log("Graph API Response:", data);

            // Adjust based on your backend response structure
            return data?.data || [];
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 1,
    });
};

