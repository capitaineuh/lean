import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from '../users/dto/register.dto';
import { User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
export declare class AuthService {
    private usersService;
    private jwtService;
    private userModel;
    private readonly logger;
    constructor(usersService: UsersService, jwtService: JwtService, userModel: Model<User>);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            isArtisan: any;
            role: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        user: User;
        isArtisan: boolean;
    }>;
}
