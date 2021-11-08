NOW=$(date +"%m-%d-%Y %r")
echo "$NOW. **************Ini*******************" &>/root/vsts/update-zoco-prod.log
echo "Iniciando desplieque de ZOCO-prod" &>>/root/vsts/update-zoco-prod.log
echo "Cambiando a directorio /var/www/html/build/zoco-prod" &>>/root/vsts/update-zoco-prod.log
echo "$NOW. **************Ini*******************" 
echo "Iniciando desplieque de ZOCO-prod" 
echo "Cambiando a directorio /var/www/html/build/zoco-prod" 
cd /var/www/html/build/zoco-prod
echo "Ejecutando git pull" &>>/root/vsts/update-zoco-prod.log
echo "Ejecutando git pull"
git pull &>>/root/vsts/update-zoco-prod.log
echo "Hash de revision actual" &>>/root/vsts/update-zoco-prod.log
echo "Hash de revision actual"
git rev-parse HEAD &>>/root/vsts/update-zoco-prod.log
echo "Ejecutando npm install" &>>/root/vsts/update-zoco-prod.log
echo "Ejecutando npm install"
npm install --loglevel=error &>>/root/vsts/update-zoco-prod.log
echo "Ejecutando ng build" &>>/root/vsts/update-zoco-prod.log
echo "Ejecutando ng build"
ng build --env=prod --aot=false --locale=en-US --output-path /var/www/html/build/zoco-prod/dist --base-href --no-progress &>>/root/vsts/update-zoco-prod.log
ng build --env=prod --aot --locale=en-US --output-path /var/www/html/build/zoco-prod/dist --base-href --no-progress &>>/root/vsts/update-zoco-prod.log --build-optimizer --vendor-chunk=true
NOW=$(date +"%m-%d-%Y %r")
echo "$NOW. **************Fin*******************" &>>/root/vsts/update-zoco-prod.log
echo "$NOW. **************Fin*******************"
