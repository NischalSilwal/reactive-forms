export type SignupFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

// API response types
export type SignupInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type ApiResponse = {
  data?: any;
  errors?: Array<{
    message: string;
    extensions?: any;
  }>;
};

// User types
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

// Auth context types (for future use)
export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: SignupInput) => Promise<void>;
  isLoading: boolean;
};