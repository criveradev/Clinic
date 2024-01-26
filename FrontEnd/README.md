# Instalaciones

    % npm install
    % ng serve

# Variables de entorno

    % ng generate environments

# Variables de entorno de desarrollo, localhost.

    % environment.development.ts

# Variables de entorno de producción, dominios.

    % environment.ts

# Creamos la carpeta config y su archivo config.ts

    % config
    % config.ts

# Creamos un nuevo modulo

    % ng g m medical --routing
    % ng g m medical/roles --routing

# Con su respectivo compnente

    % ng g c medical --skip-tests
    % ng g c medical/roles --skip-tests
    % ng g c medical/roles/add-role-user --skip-tests
    % ng g c medical/roles/edit-role-user --skip-tests
    % ng g c medical/roles/list-role-user --skip-tests