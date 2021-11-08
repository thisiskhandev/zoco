NOW=$(date +"%m-%d-%Y %r")
echo "$NOW. **************Ini*******************" &>/root/vsts/update-zoco-dev.log
echo "$NOW. **************Ini*******************"
echo "Iniciando desplieque de ZOCO-dev" &>>/root/vsts/update-zoco-dev.log
echo "Iniciando desplieque de ZOCO-dev"
echo "Cambiando a directorio /var/www/html/build/zoco-dev" &>>/root/vsts/update-zoco-dev.log
echo "Cambiando a directorio /var/www/html/build/zoco-dev"
cd /var/www/html/build/zoco-dev
echo "Ejecutando git pull" &>>/root/vsts/update-zoco-dev.log
echo "Ejecutando git pull"
git pull &>>/root/vsts/update-zoco-dev.log
echo "Hash de revision actual" &>>/root/vsts/update-zoco-dev.log
echo "Hash de revision actual"
git rev-parse HEAD &>>/root/vsts/update-zoco-dev.log
echo "Ejecutando npm install" &>>/root/vsts/update-zoco-dev.log
echo "Ejecutando npm install"
npm install --loglevel=error &>>/root/vsts/update-zoco-dev.log
echo "Ejecutando ng build" &>>/root/vsts/update-zoco-dev.log
echo "Ejecutando ng build"
ng build --env=dev  --aot --locale=en-US --output-path /var/www/html/build/zoco-dev/dist --base-href --no-progress &>>/root/vsts/update-zoco-dev.log  --build-optimizer --vendor-chunk=true
NOW=$(date +"%m-%d-%Y %r")
echo "$NOW. **************Fin*******************" &>>/root/vsts/update-zoco-dev.log
echo "$NOW. **************Fin*******************"