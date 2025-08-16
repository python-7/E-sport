// composables/useAuth.ts
import { ref } from 'vue';

// Define a simple user object
interface User {
  id: string;
  name: string;
  role: 'user' | 'admin';
}

// Create a global state to hold the user and their role
const user = ref<User | null>(null);

export function useAuth() {
  const login = (userData: User) => {
    user.value = userData;
  };

  const logout = () => {
    user.value = null;
  };

  const isLoggedIn = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.role === 'admin');
  
  return {
    user,
    login,
    logout,
    isLoggedIn,
    isAdmin,
  };
}