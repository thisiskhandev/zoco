<p align="center">
	<img src="https://angular.io/assets/images/logos/angular/angular.svg" width="250" height="250">
</p>

<p>ZOCO DEV Server: <img src="https://moebiusviajes.visualstudio.com/ZOCO/_apis/build/status/ZOCO-DEV?branchName=dev" alt="ZOCO DEV - Build Status"></p>
<p>ZOCO TEST Server: <img src="https://moebiusviajes.visualstudio.com/ZOCO/_apis/build/status/ZOCO-TEST?branchName=test" alt="ZOCO TEST - Build Status"></p>
<p>ZOCO PROD Server: <img src="https://moebiusviajes.visualstudio.com/ZOCO/_apis/build/status/ZOCO-DEV?branchName=master" alt="ZOCO PROD - Build Status"></p>

#ZOCO

----------

## Introducción

Esta es una aplicación diseñada para poder cargar manualmente la información de servicios mediante formularios construidos con tecnologías Angular.io, Html 5, Typescript y CCS 3


## Empezando

1.	Dependencias de Software
2.	Proceso de Instalación 
3.  Troobleshooting

----------

### 1. Dependencias de Software

- Node version v8.9.x
- GIT version 2.16.1 o superior
- IDE (recomendado Visual Studio Code 1.19.3 o superior)
- IDE para git (recomendado TortoiseGit 2.5.0.0 o superior )

### 2.	Proceso de Instalación 

2.1	Descargar Node.js la version v8.9.x desde la pagina web [Node.js](https://nodejs.org/en/download/)
2.2  Actualizar npm con el siguiente comando: npm i npm
2.3  Clonar el codigo con GIT [ZOCO](https://moebiusviajes.visualstudio.com/_git/ZOCO)
2.4  Abrir una consola de comandos, y ubicarse en la carpeta donde se descargo ZOCO
2.5  Descargar e instalar paquetes de angular ejecutando comando: npm install
2.6  Si no genera ningun error en la instalacion, levantar servidor integrado de angular ejecutando uno de estos comandos: 
		- para ambiente local: npm run-script local
		- para ambiente apuntando a servidor dev: npm run-script dev
		- para ambiente apuntando a servidor dev: npm run-script dev
		- para ambiente apuntando a servidor productivo: npm start

### 3. Troobleshooting

- En caso que ocurra un error en el paso 2.5, como este:

	> "23612 error sha512-/6rB8YXFbAtsUVRphIRQqB0+9c7VaPHCjVtvto+JqwVxgz8Zz+I+f68/JgQ+Pb4VlZb2svA9OtdXnHHsZz7ltg== integrity checksum failed when using sha512: wanted sha512-/6rB8YXFbAtsUVRphIRQqB0+9c7VaPHCjVtvto+JqwVxgz8Zz+I+f68/JgQ+Pb4VlZb2svA9OtdXnHHsZz7ltg== but got sha512-DBvqhvauWBoBnnO9Oj6ZrYc5AV+o6iCbnQd+RRDpEm/6kQNrd6YcnhZZBSsakdu9blj4BD9KS0UCh0zrRXF85A==. (2318 bytes)"

	Es debido a que el paquete se descargo incompleto provocado por una micro interrupcion de internet. Cerciorarse que el internet se encuentre estable, este conectado via ethernet o wifi (según sea el caso) y ejecute nuevamente el comando: npm install

- Error sass\vendor

En caso que ocurra el siguiente error:

	> ERROR in ./src/app/pages/header/header.component.scss
	Module build failed: Error: ENOENT: no such file or directory, scandir '<ruta-a-proyecto-ZOCO-en-tu-local>\ZOCO\node_modules\node-sass\vendor'

	Procede a ejecutar los siguientes scripts en el siguiente orden:

	>npm update
	>npm install
	>node node_modules/node-sass/scripts/install.js
	>npm rebuild node-sass

	Importante tener un conexion estable, para evitar corrupcion de data la momento de la descarga de nuevos paquetes
	
- Error 'Can't find Python executable "python"':

En caso que ocurra el siguiente error:

 > gyp ERR! stack Error: Can't find Python executable "python", you can set the PYTHON env variable.

 cuando se ejecute el comando 'npm update', ejecute:

 > npm install --global --production windows-build-tools

### Crear Documentacion

1) Instalar
	npm i -g @compodoc/compodoc

2) Ejecutar el comando dentro de la carpeta de su aplicación Angular
	compodoc -p src/tsconfig.json

# Obtienes la documentación generada en la carpeta ./documentation/ en la raíz de la carpeta del proyecto.

3) Ejecutar el comando anterior con el indicador -s, como se inidica abajo, la herramienta le mostrará la documentación, de forma predeterminada en http://localhost: 8080
	compodoc -s src/tsconfig.json
