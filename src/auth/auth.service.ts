import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../users/dto/register.dto';
import { User } from '../users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isArtisan: user.isArtisan,
      },
    };
  }

  async register(registerDto: RegisterDto): Promise<{ user: User; isArtisan: boolean }> {
    try {
      this.logger.debug(`Tentative d'inscription pour l'email: ${registerDto.email}`);
      
      const { email, password, firstName, lastName, phone, isArtisan, metier, localisation } = registerDto;

      // Vérifier si l'email existe déjà
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        this.logger.warn(`Email déjà utilisé: ${email}`);
        throw new ConflictException('Cet email est déjà utilisé');
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer le nouvel utilisateur
      const user = new this.userModel({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        isArtisan,
        metier: isArtisan ? metier : undefined,
        localisation,
        competences: [],
        note: 0,
        projetsRealises: 0
      });

      this.logger.debug('Sauvegarde du nouvel utilisateur...');
      const savedUser = await user.save();
      this.logger.debug(`Utilisateur créé avec succès: ${savedUser._id}`);
      
      // Vérifier que l'utilisateur existe bien dans la base
      const verifyUser = await this.userModel.findById(savedUser._id);
      this.logger.debug(`Vérification de l'utilisateur dans la base: ${verifyUser ? 'OK' : 'Non trouvé'}`);

      return { user: savedUser, isArtisan };
    } catch (error) {
      this.logger.error(`Erreur lors de l'inscription: ${error.message}`, error.stack);
      throw error;
    }
  }
} 