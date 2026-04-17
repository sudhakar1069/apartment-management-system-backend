import bcrypt from "bcrypt";
import { AccessToken, RefreshToken } from "../utils/token.js";

export class AuthService {
    constructor(private userRepository: any) { }
    async register(data: any) {
        const { name, email, password, role } = data;
        const existing = await this.userRepository.findByEmail(email);
        if (existing) {
            throw { status: 400, message: "Email already exists" };
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = await this.userRepository.create({
            name,
            email,
            password: hashed,
            role,
        });
        return (user)
    }
    async login(email: string, password: string) {
        const user: any = await this.userRepository.findByEmail(email);

        if (!user) {
            throw { status: 404, message: "Invalid credentials" };
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw { status: 401, message: "Invalid password" };
        }
        const accessToken = AccessToken(user);
        const refreshToken = RefreshToken(user);
        user.refreshToken = refreshToken;
        await this.userRepository.save(user);
        return {
            accessToken, refreshToken, user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }
        async logout(userId: string) {
            const user = await this.userRepository.findById(userId);
            if (!user) {
                throw { status: 404, message: "User not found" };
            }
            if (!user.refreshToken) {
                return { message: "User already logged out" };
            }
            user.refreshToken = null;
            await this.userRepository.save(user);

            return { message: "Logged out successfully" };
        }
}