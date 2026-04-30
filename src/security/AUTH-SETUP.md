# Autenticación con JWT - Guía de Uso

## Descripción General

Se ha implementado un sistema de autenticación basado en **JWT (JSON Web Tokens)** utilizando Passport.js. El sistema está completamente configurado y listo para integrar el login en cualquier momento.

## Configuración

### Variables de Entorno (.env)

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=3600                    # Access token expiration en segundos (1 hora)
REFRESH_TOKEN_EXPIRATION=604800        # Refresh token expiration en segundos (7 días)
```

> **⚠️ IMPORTANTE**: En producción, cambiar `JWT_SECRET` por una clave segura y única.

## Archivos Implementados

### 1. AuthService (`src/security/auth.service.ts`)
Servicio central para la gestión de tokens.

**Métodos disponibles:**
- `generateTokens(userId, email)` - Genera access y refresh tokens
- `generateAccessToken(userId, email)` - Genera solo access token
- `verifyToken(token)` - Verifica y decodifica un token
- `decodeToken(token)` - Decodifica sin verificación

**Ejemplo de uso:**
```typescript
const tokens = await this.authService.generateTokens('user-123', 'user@example.com');
// Respuesta: { accessToken: '...', refreshToken: '...', expiresIn: 3600 }
```

### 2. JwtStrategy (`src/security/strategies/jwt.strategy.ts`)
Estrategia Passport que valida los JWT extraídos del header de autorización.

- Extrae el token del header: `Authorization: Bearer <token>`
- Verifica la firma del token
- Valida que no haya expirado
- Inyecta el usuario en `request.user`

### 3. JwtAuthGuard (`src/security/guards/jwt-auth.guard.ts`)
Guard que protege rutas requiriendo autenticación.

**Uso en controladores:**
```typescript
import { JwtAuthGuard } from './security/guards/jwt-auth.guard';

@Controller('api/protected')
export class MyController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile() {
    // Este endpoint solo es accesible con token válido
  }
}
```

### 4. CurrentUser Decorator (`src/security/decorators/current-user.decorator.ts`)
Decorador para inyectar el usuario actual en los métodos del controlador.

**Uso:**
```typescript
import { CurrentUser, CurrentUserData } from './security/decorators/current-user.decorator';

@Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@CurrentUser() user: CurrentUser) {
  console.log(user.userId, user.email);
}
```

### 5. SecurityModule (`src/security/security.module.ts`)
Módulo que proporciona toda la infraestructura de autenticación.

- Ya está importado en `AppModule`
- Exporta `AuthService` y `JwtAuthGuard` para uso en otros módulos

## Pipeline de Autenticación - Diagrama de Flujo

```
Cliente                        Servidor
   |                              |
   |--- POST /login  ----------->|
   |   (email, password)         |
   |                             | Validar credenciales
   |                             | (pendiente de implementar)
   |                             | AuthService.generateTokens()
   |<--- 200 OK ----------------| 
   |  { accessToken, refreshToken }
   |
   |--- GET /protected -------->|
   |   Header: Bearer <token>   |
   |                             | JwtAuthGuard valida token
   |                             | JwtStrategy verifica firma
   |<--- 200 OK ----------------| 
   |   (datos del usuario)       |
```

## Pasos para Implementar el Login

### 1. Crear un DTO de login
```typescript
// src/user_managment/dto/login.dto.ts
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
```

### 2. Agregar método de login al controlador
```typescript
import { AuthService } from '../security/auth.service';

@Post('login')
async login(@Body() loginDto: LoginDto) {
  // 1. Validar email y password contra la BD
  // const user = await this.userService.findByEmail(loginDto.email);
  // if (!user || !await this.validatePassword(loginDto.password, user.password)) {
  //   throw new UnauthorizedException('Credenciales inválidas');
  // }
  
  // 2. Generar tokens
  const tokens = await this.authService.generateTokens(user.id, user.email);
  
  // 3. (Opcional) Guardar refresh token en BD para invalidación
  
  return tokens;
}
```

### 3. Proteger rutas con el guard
```typescript
@Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@CurrentUser() user: CurrentUser) {
  return { userId: user.userId, email: user.email };
}
```

## Flujo de Tokens

### Access Token
- **Duración**: 1 hora (configurable en `JWT_EXPIRATION`)
- **Uso**: Autorizar solicitudes a la API
- **Ubicación**: Header `Authorization: Bearer <token>`

### Refresh Token
- **Duración**: 7 días (configurable en `REFRESH_TOKEN_EXPIRATION`)
- **Uso**: Obtener un nuevo access token sin volver a hacer login
- **Implementación**: Crear endpoint `/refresh` que acepte refresh token

### Ejemplo de Refresh Token (futuro)
```typescript
@Post('refresh')
async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
  const decoded = await this.authService.verifyToken(refreshToken);
  const newAccessToken = await this.authService.generateAccessToken(
    decoded.sub,
    decoded.email
  );
  return { accessToken: newAccessToken };
}
```

## Testeo Manual con cURL

```bash
# 1. Obtener tokens (una vez implementado el login)
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

# Respuesta:
# {
#   "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "expiresIn": 3600
# }

# 2. Acceder a ruta protegida
curl -X GET http://localhost:3000/api/protected/profile \
  -H "Authorization: Bearer <accessToken>"
```

## Seguridad

- ✅ Tokens firmados criptográficamente
- ✅ Verificación de firma obligatoria
- ✅ Verificación de expiración
- ✅ Secreto configurable desde `.env`
- ⚠️ **TODO**: Implementar invalidación de tokens (logout)
- ⚠️ **TODO**: Hashear y verificar passwords
- ⚠️ **TODO**: Rate limiting en endpoint de login

## Próximos Pasos Recomendados

1. Implementar endpoint de login con validación de credenciales
2. Implementar endpoint de refresh token
3. Implementar logout (blacklist o lista de tokens revocados)
4. Hashear passwords con bcrypt
5. Agregar rate limiting en endpoints de autenticación
6. Implementar 2FA (Two-Factor Authentication)
