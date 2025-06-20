"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const user_schema_1 = require("../users/schemas/user.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AuthService = AuthService_1 = class AuthService {
    usersService;
    jwtService;
    userModel;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(usersService, jwtService, userModel) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        console.log('[BACK] Utilisateur trouvé dans validateUser:', user);
        if (user && await bcrypt.compare(password, user.password)) {
            const userObj = user.toObject ? user.toObject() : { ...user };
            delete userObj.password;
            return userObj;
        }
        return null;
    }
    async login(user) {
        console.log('[BACK] user._id:', user._id);
        const payload = { email: user.email, sub: user._id, role: user.role, username: user.firstName };
        console.log('[BACK] payload JWT:', payload);
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isArtisan: user.isArtisan,
                role: user.role,
            },
        };
    }
    async register(registerDto) {
        try {
            this.logger.debug(`Tentative d'inscription pour l'email: ${registerDto.email}`);
            const { email, password, firstName, lastName, phone, isArtisan, metier, localisation } = registerDto;
            const existingUser = await this.userModel.findOne({ email });
            if (existingUser) {
                this.logger.warn(`Email déjà utilisé: ${email}`);
                throw new common_1.ConflictException('Cet email est déjà utilisé');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
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
            const verifyUser = await this.userModel.findById(savedUser._id);
            this.logger.debug(`Vérification de l'utilisateur dans la base: ${verifyUser ? 'OK' : 'Non trouvé'}`);
            return { user: savedUser, isArtisan };
        }
        catch (error) {
            this.logger.error(`Erreur lors de l'inscription: ${error.message}`, error.stack);
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map