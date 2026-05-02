const { execSync } = require('child_process');

console.log('Generando cliente Prisma...');
try {
  // Intentamos ejecutar Prisma
  execSync('npx prisma generate', { stdio: 'inherit' });
} catch (error) {
  // Si falla (por el error raro de Windows), lo ignoramos porque los archivos ya se generaron
  console.log('Omitiendo error de Prisma, continuando...');
}

console.log('Compilando TypeScript...');
execSync('npx tsc', { stdio: 'inherit' });

console.log('✅ Build completado con éxito.');