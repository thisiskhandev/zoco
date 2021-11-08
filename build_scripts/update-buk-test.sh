NOW=$(date +"%m-%d-%Y %r")
echo "$NOW. **************Ini*******************" &>/root/vsts/update-zoco-test.log
echo "Iniciando desplieque de ZOCO-test" &>>/root/vsts/update-zoco-test.log
echo "Cambiando a directorio /var/www/html/build/zoco-test" &>>/root/vsts/update-zoco-test.log
echo "$NOW. **************Ini*******************" 
echo "Iniciando desplieque de ZOCO-test" 
echo "Cambiando a directorio /var/www/html/build/zoco-test" 
cd /var/www/html/build/zoco-test
echo "Ejecutando git pull" &>>/root/vsts/update-zoco-test.log
echo "Ejecutando git pull"
git pull &>>/root/vsts/update-zoco-test.log
echo "Hash de revision actual" &>>/root/vsts/update-zoco-test.log
echo "Hash de revision actual"
git rev-parse HEAD &>>/root/vsts/update-zoco-test.log
echo "Ejecutando npm install" &>>/root/vsts/update-zoco-test.log
echo "Ejecutando npm install"
npm install --loglevel=error &>>/root/vsts/update-zoco-test.log
echo "Ejecutando ng build" &>>/root/vsts/update-zoco-test.log
echo "Ejecutando ng build"
ng build --env=test --aot=false --locale=en-US --output-path /var/www/html/build/zoco-test/dist --base-href --no-progress &>>/root/vsts/update-zoco-test.log
ng build --env=test --aot --locale=en-US --output-path /var/www/html/build/zoco-test/dist --base-href --no-progress &>>/root/vsts/update-zoco-test.log --build-optimizer --vendor-chunk=true
NOW=$(date +"%m-%d-%Y %r")
echo "$NOW. **************Fin*******************" &>>/root/vsts/update-zoco-test.log
echo "$NOW. **************Fin*******************"
echo "OK"
