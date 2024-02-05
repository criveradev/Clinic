<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Creación DB

    % php artisan migrate

# Instalación JWT
    
    % https://jwt-auth.readthedocs.io/en/develop/laravel-installation/

# Correr servidor BackEnd

    % php artisan serve

# Revisar las rutas

    % php artisan route:list --path=api

# Roles y permisos
     % https://spatie.be/docs/laravel-permission/v6/installation-laravel
     % php artisan migrate:refresh --seed --seeder=PermissionsDemoSeeder 

# Politicas de acceso

    % php artisan make:policy UserPolicy --model=user

# Crear controlador para endpoint de roles

    % php artisan make:controller /Admin/Rol/RolesController --api

# Crear controlador para endpoint de staff

    % php artisan make:controller /Admin/Staff/StaffController --api