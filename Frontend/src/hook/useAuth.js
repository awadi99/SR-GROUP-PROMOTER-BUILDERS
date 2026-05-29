import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/apiClient';

export const useAuth = () => {
    const queryClient = useQueryClient();

    // Check if token exists once to determine if we should attempt a fetch
    const hasToken = !!localStorage.getItem("jwt");

    // 1. User Query - Optimized with 'enabled' to prevent unauthorized loops
    const { 
        data: user, 
        isLoading, 
        isFetching, 
        isError 
    } = useQuery({
        queryKey: ['authUser'],
        queryFn: async () => {
            const { data } = await apiClient.get('/auth/me');
            return data;
        },
        // IMPORTANT: Only fetch if a token is present in localStorage
        enabled: hasToken, 
        staleTime: 1000 * 60 * 15, // 15 mins
        retry: false, // Prevents persistent error loops
        refetchOnWindowFocus: false,
    });

    // Helper for UI components
    const isAuthenticated = !!user;

    // 2. Logout - Mutation Pattern
    const logout = useMutation({
        mutationFn: () => apiClient.post('/auth/logout'),
        onSettled: () => {
            // Force reset state
            queryClient.setQueryData(['authUser'], null);
            queryClient.removeQueries({ queryKey: ['authUser'] });
            
            // Clear storage
            localStorage.removeItem("jwt");
            sessionStorage.clear();
            
            // Hard redirect to clear any lingering UI state
            window.location.replace('/login');
        }
    });

    // 3. Login - Optimized with Cache updates
    const loginUser = useMutation({
        mutationFn: (credentials) => apiClient.post('/auth/login', credentials).then(res => res.data),
        onSuccess: (data) => {
            // Manually set cache to avoid an extra network request immediately after login
            queryClient.setQueryData(['authUser'], data);
        }
    });

    // 4. Registration
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
        isAuthenticated,
        // isLoading is only true if we have a token AND we are actively fetching
        isLoading: isLoading && hasToken, 
        isFetching,
        isError, 
        loginUser, 
        registerUser, 
        logout, 
        verifyErp, 
        resetPassword, 
    };
};