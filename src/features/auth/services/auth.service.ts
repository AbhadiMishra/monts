import { UserProfile } from '../types/auth.types';
import usersData from '../../../mock/data/users.json';
import { delay } from '../../../mock/delay';

const STORAGE_KEY = 'monts_auth_session';

export interface IAuthService {
  login(email: string, password: string, rememberMe?: boolean): Promise<UserProfile>;
  register(email: string, password: string, firstName: string, lastName: string): Promise<UserProfile>;
  forgotPassword(email: string): Promise<void>;
  logout(): Promise<void>;
  getCurrentUser(): UserProfile | null;
}

export class MockAuthService implements IAuthService {
  async login(email: string, password: string, rememberMe = true): Promise<UserProfile> {
    await delay(350);
    const users = usersData as (UserProfile & { password?: string })[];
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password. Please try again.');
    }

    const { password: _, ...profile } = user;
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } else {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }
    return profile;
  }

  async register(email: string, _password: string, firstName: string, lastName: string): Promise<UserProfile> {
    await delay(400);
    const existing = (usersData as UserProfile[]).find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      email,
      firstName,
      lastName,
      role: 'customer',
      avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName + ' ' + lastName)}&background=8b7355&color=fff`,
      ordersCount: 0,
      addresses: [],
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  }

  async forgotPassword(email: string): Promise<void> {
    await delay(300);
    const user = (usersData as UserProfile[]).find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error('No registered account found with this email address.');
    }
  }

  async logout(): Promise<void> {
    await delay(150);
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  getCurrentUser(): UserProfile | null {
    const local = localStorage.getItem(STORAGE_KEY);
    const session = sessionStorage.getItem(STORAGE_KEY);
    const raw = local || session;
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
}

export const authService = new MockAuthService();
