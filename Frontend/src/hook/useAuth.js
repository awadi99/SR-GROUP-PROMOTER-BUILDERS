import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

export const useAuth = () => {
    const queryClient = useQueryClient();

    // 1. User Query - Cached & Optimized
    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            try {
                const { data } = await apiClient.get('/auth/me');
                return data;
            } catch (err) {
                if (err.response?.status === 401) return null;
                throw err;
            }
        },
        staleTime: 1000 * 60 * 15,
        retry: false,
        refetchOnWindowFocus: false,
    });


    // 2. Logout - Mutation Pattern (Cleaner)
    const logout = useMutation({
        mutationFn: () => apiClient.post('/auth/logout'),
        onSettled: () => {
            queryClient.setQueryData(['authUser'], null);
            queryClient.clear();
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace('/'); // Clean redirection
        }
    });

    // 3. Login - Optimized with Cache Invalidation
    const loginUser = useMutation({
        mutationFn: (credentials) => apiClient.post('/auth/login', credentials).then(res => res.data),
        onSuccess: (data) => {
            queryClient.setQueryData(['authUser'], data);
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
        }
    });

    // 4. Registration
    // const registerUser = useMutation({
    //     mutationFn: (userData) => apiClient.post('/auth/register', userData).then(res => res.data)
    // });
    const registerUser = useMutation({
        mutationFn: async (userData) => {
            const { data } = await apiClient.post('/auth/register', userData);
            return data;
        }
    });



    // 6. Reset Password
    const resetPassword = useMutation({
        mutationFn: (userData) => apiClient.post('/auth/reset-password', userData).then(res => res.data)
    });

    // 7. Verify ERP/Code
    const verifyErp = useMutation({
        mutationFn: (payload) => apiClient.post('/auth/verify-admincode', payload).then(res => res.data)
    });

    return { 
        user, 
        isLoading, 
        isError, 
        loginUser, 
        registerUser, 
        logout, 
        verifyErp, 
        resetPassword, 
    };
};